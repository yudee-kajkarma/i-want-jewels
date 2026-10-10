// Lumi's data layer (chatService, lumiHistoryService, shop, useLumiHistory,
// useLumiChat) run against fakes of the backend, browser storage, login, the
// shop's Redux store, the router and React.
// Run with: node --test tests/lumi.test.cjs
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

const SRC = path.join(__dirname, '..', 'src')
const NOW = Date.parse('2026-10-10T10:00:00.000Z')
const DAY = 24 * 60 * 60 * 1000
const settle = () => new Promise((resolve) => setImmediate(resolve))

// ---------------------------------------------------------------------------
// Fakes
// ---------------------------------------------------------------------------

/** Loads src/*.ts as CommonJS. Imports resolve to `stubs` (by path from src, or package name) or to real files. */
function loader(stubs) {
  const cache = new Map()
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports
    const module = { exports: {} }
    cache.set(file, module)
    const { outputText } = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      fileName: file,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    })
    const requireFrom = (spec) => {
      if (!spec.startsWith('.')) {
        if (spec in stubs) return stubs[spec]
        throw new Error(`Package not stubbed: ${spec}`)
      }
      const target = path.resolve(path.dirname(file), spec)
      const key = path.relative(SRC, target)
      if (key in stubs) return stubs[key]
      if (fs.existsSync(`${target}.ts`)) return load(`${target}.ts`)
      throw new Error(`Module not stubbed: ${key}`)
    }
    new Function('exports', 'require', 'module', outputText)(module.exports, requireFrom, module)
    return module.exports
  }
  return (file) => load(path.join(SRC, file))
}

function memoryStorage() {
  const data = new Map()
  const storage = {
    data,
    blocked: false,
    /** Largest value accepted (bytes of JSON), to act out a full storage. */
    quota: Infinity,
    getItem(key) {
      if (storage.blocked) throw new Error('SecurityError')
      return data.has(key) ? data.get(key) : null
    },
    setItem(key, value) {
      if (storage.blocked) throw new Error('SecurityError')
      if (String(value).length > storage.quota) throw Object.assign(new Error('Quota'), { name: 'QuotaExceededError' })
      data.set(key, String(value))
    },
    removeItem(key) {
      if (storage.blocked) throw new Error('SecurityError')
      data.delete(key)
    },
  }
  return storage
}

/** window, document and sessionStorage as globals, like in the browser. */
function browser() {
  const listeners = {}
  const on = (type, fn) => (listeners[type] ??= new Set()).add(fn)
  const off = (type, fn) => listeners[type]?.delete(fn)
  const window = {
    localStorage: memoryStorage(),
    addEventListener: on,
    removeEventListener: off,
    setTimeout: (...args) => setTimeout(...args),
    clearTimeout: (id) => clearTimeout(id),
    fire: (type, event = {}) => listeners[type]?.forEach((fn) => fn(event)),
    listeners,
  }
  const document = { visibilityState: 'visible', addEventListener: on, removeEventListener: off }
  globalThis.window = window
  globalThis.document = document
  globalThis.sessionStorage = memoryStorage()
  return window
}

const httpError = (status) => Object.assign(new Error(`HTTP ${status}`), { response: { status } })

/** The backend: POST /chat, feedback and the chat history API, kept in memory. */
function fakeBackend() {
  const calls = []
  const chats = new Map()
  const backend = {
    calls,
    chats,
    chatReply: () => ({ kind: 'unavailable' }),
    /** (method, url, body) → an error to throw instead of answering. */
    fail: () => undefined,
  }
  const ok = (data) => ({ data: { success: true, data } })
  const summary = (c) => ({ id: c.id, title: c.title, updatedAt: c.updatedAt, preview: 'from the server', messageCount: c.messages.length })
  async function handle(method, url, body, config) {
    calls.push({ method, url, body, config })
    await null
    const failure = backend.fail(method, url, body)
    if (failure) throw failure
    if (method === 'POST' && url === '/chat') return ok(backend.chatReply(body))
    if (method === 'POST' && url === '/chat/feedback') return ok({ recorded: true })
    if (url === '/chat/conversations') {
      if (method === 'GET') return ok({ conversations: [...chats.values()].map(summary) })
      const deleted = chats.size
      chats.clear()
      return ok({ deleted })
    }
    const id = decodeURIComponent(url.replace('/chat/conversations/', ''))
    if (method === 'GET') {
      if (!chats.has(id)) throw httpError(404)
      return ok({ conversation: chats.get(id) })
    }
    if (method === 'PUT') {
      const createdAt = chats.get(id)?.createdAt ?? body.createdAt
      chats.set(id, { id, title: body.title, createdAt, updatedAt: new Date().toISOString(), messages: body.messages })
      return ok({ conversation: summary(chats.get(id)) })
    }
    if (method === 'DELETE') {
      if (!chats.delete(id)) throw httpError(404)
      return { data: { success: true } }
    }
    throw new Error(`Unexpected ${method} ${url}`)
  }
  backend.client = {
    get: (url, config) => handle('GET', url, undefined, config),
    post: (url, body, config) => handle('POST', url, body, config),
    put: (url, body, config) => handle('PUT', url, body, config),
    delete: (url, config) => handle('DELETE', url, undefined, config),
  }
  backend.of = (method, url) => calls.filter((c) => c.method === method && (url === undefined || c.url === url))
  return backend
}

/**
 * Just enough React for a hook. State, refs and memos are kept by call order,
 * so `render(hook)` renders the same hook again with its state (a hook called
 * directly gets fresh slots, as a new component would). Effects whose deps
 * changed are queued and run by hand with runEffects().
 */
function fakeReact() {
  const slots = []
  let index = 0
  const queued = []
  const cleanups = new Map()
  const same = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((value, i) => Object.is(value, b[i]))
  const slot = (make) => {
    const i = index++
    if (!(i in slots)) slots[i] = make()
    return [slots[i], i]
  }
  const useMemo = (fn, deps) => {
    const [memo] = slot(() => ({}))
    if (!('value' in memo) || !same(memo.deps, deps)) Object.assign(memo, { value: fn(), deps })
    return memo.value
  }
  return {
    useState(init) {
      const [state] = slot(() => ({ value: typeof init === 'function' ? init() : init }))
      return [state.value, (next) => { state.value = typeof next === 'function' ? next(state.value) : next }]
    },
    useRef: (current) => slot(() => ({ current }))[0],
    useMemo,
    useCallback: (fn, deps) => useMemo(() => fn, deps),
    useEffect(fn, deps) {
      const [effect, i] = slot(() => ({}))
      if (effect.queued && same(effect.deps, deps)) return
      Object.assign(effect, { queued: true, deps })
      queued.push([i, fn])
    },
    useSyncExternalStore: (subscribe, getSnapshot) => getSnapshot(),
    render(hook) {
      index = 0
      return hook()
    },
    runEffects: () => queued.splice(0).forEach(([i, fn]) => {
      cleanups.get(i)?.()
      const cleanup = fn()
      cleanups.set(i, typeof cleanup === 'function' ? cleanup : undefined)
    }),
    unmount: () => {
      cleanups.forEach((cleanup) => cleanup?.())
      cleanups.clear()
    },
  }
}

/**
 * The shop's Redux store (bag and wishlist) with its server. The slices'
 * thunks are faked as plain actions that `dispatch` runs; like Redux
 * Toolkit's, the result has unwrap().
 */
function fakeShopStore() {
  const server = { cart: [], wishlist: [], /** thunks that fail */ fail: new Set() }
  const state = { cart: { cart: null, status: 'idle' }, wishlist: { wishlist: null, status: 'idle' } }
  const dispatched = []
  let next = 1
  const cart = () => ({ id: 'cart-1', items: server.cart.map((line) => ({ ...line })) })
  const wishlist = () => ({ id: 'wishlist-1', items: server.wishlist.map((item) => ({ ...item })) })
  const loadedCart = () => (state.cart = { cart: cart(), status: 'succeeded' }).cart
  const loadedWishlist = () => (state.wishlist = { wishlist: wishlist(), status: 'succeeded' }).wishlist
  async function run(action) {
    dispatched.push(action)
    await null
    if (server.fail.has(action.thunk)) throw new Error(`${action.thunk} failed`)
    const p = action.payload
    switch (action.thunk) {
      case 'fetchCart':
        return loadedCart()
      case 'addToCart': {
        const line = server.cart.find((l) => l.productId === p.productId && l.variantId === p.variantId && l.size === p.size)
        if (line) line.quantity += p.quantity
        else server.cart.push({ id: `line-${next++}`, productId: p.productId, variantId: p.variantId, title: 'In the bag', variantTitle: '', thumbnail: 'data:image/svg+xml,x', price: price(111), quantity: p.quantity, ...(p.size !== undefined ? { size: p.size } : {}) })
        return loadedCart()
      }
      case 'fetchWishlist':
        return loadedWishlist()
      case 'addToWishlist':
        server.wishlist.push({ id: `saved-${next++}`, productId: p, slug: 'x', title: 'Saved', category: 'Rings', thumbnail: '', price: price(10), rating: 0, reviewsCount: 0 })
        return loadedWishlist()
      case 'removeWishlistItem':
        server.wishlist = server.wishlist.filter((item) => item.id !== p)
        return loadedWishlist()
      default:
        throw new Error(`Unknown thunk ${action.thunk}`)
    }
  }
  const dispatch = (action) => {
    const result = run(action)
    const settled = result.then(() => undefined, () => undefined)
    settled.unwrap = () => result
    return settled
  }
  return {
    server,
    state,
    dispatched,
    thunks: (name) => dispatched.filter((action) => action.thunk === name),
    module: { useDispatch: () => dispatch, useSelector: (select) => select(state), useStore: () => ({ getState: () => state }) },
  }
}

const order = (n, overrides = {}) => ({
  id: `order${n}`,
  orderNumber: `IWJ${1000 + n}`,
  createdAt: new Date(NOW - n * DAY).toISOString(),
  orderStatus: 'SHIPPED',
  totalAmount: { eur: 100, dol: 110, pou: 90 },
  currency: 'EUR',
  totalItems: 1,
  items: [{ title: `Ring ${n}`, quantity: 1, thumbnail: `https://cdn.example.com/${n}.jpg` }],
  shippingCarrier: 'FEDEX',
  trackingNumber: `TRK${n}`,
  trackingUrl: 'https://track.example.com/1',
  deliveredAt: null,
  ...overrides,
})

/**
 * Everything the Lumi files import, faked. `signedIn` is the customer's email
 * (null for a guest), `path` the page's address and `products` the shop's
 * products by slug (as productService loads them).
 */
function setup({ signedIn = null, siteKey, path: pathname = '/', products = {}, productsFail = false } = {}) {
  const window = browser()
  const backend = fakeBackend()
  const auth = { ready: true, session: signedIn ? { email: signedIn, firstName: 'Ann', username: 'ann' } : null }
  if (siteKey) process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = siteKey
  else delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const shop = {
    orders: [order(1), order(2)],
    totalOrders: undefined,
    ordersFail: false,
    giftProducts: [],
    myGiftCards: [],
    tickets: [],
    contacts: [],
    sendFails: false,
    products: { ...products },
    productCalls: [],
    productsFail,
  }
  /** The address, and where the website was sent ("Buy now"). */
  const page = { path: pathname, navigations: [], drafts: [] }
  const redux = fakeShopStore()
  const react = fakeReact()
  const load = loader({
    react,
    'react-i18next': {
      // The key and its values, so tests see which text was used ("interpolation" is how, not what).
      useTranslation: () => ({
        t: (key, values) => {
          const { interpolation, ...shown } = values ?? {}
          return Object.keys(shown).length ? `${key} ${JSON.stringify(shown)}` : key
        },
      }),
    },
    'react-redux': redux.module,
    'next/navigation': { usePathname: () => page.path },
    'lib/router': { useNavigate: () => (to, options) => page.navigations.push({ to, options }) },
    'store/cartSlice': {
      addToCart: (payload) => ({ thunk: 'addToCart', payload }),
      fetchCart: () => ({ thunk: 'fetchCart' }),
    },
    'store/wishlistSlice': {
      addToWishlist: (payload) => ({ thunk: 'addToWishlist', payload }),
      removeWishlistItem: (payload) => ({ thunk: 'removeWishlistItem', payload }),
      fetchWishlist: () => ({ thunk: 'fetchWishlist' }),
    },
    'utils/checkoutStorage': { setSingleCheckoutDraft: (draft) => page.drafts.push(draft) },
    'lucide-react': new Proxy({}, { get: () => () => null }),
    'services/apiClient': { authApiClient: backend.client, default: backend.client },
    'utils/authStorage': { getStoredAuthSession: () => auth.session },
    'context/CurrencyContext': { useCurrency: () => ({ currency: 'eur' }) },
    'context/AuthContext': {
      useAuth: () => ({ isAuthReady: auth.ready, isAuthenticated: Boolean(auth.session), session: auth.session }),
    },
    'services/orderService': {
      getOrders: async () => {
        if (shop.ordersFail) throw httpError(500)
        return { orders: shop.orders, pagination: shop.totalOrders ? { totalRecords: shop.totalOrders } : null }
      },
      getOrderById: async (id) => {
        const found = shop.orders.find((o) => o.id === id)
        if (!found) throw httpError(404)
        return found
      },
    },
    'services/ticketService': {
      createTicket: async (payload) => {
        if (shop.sendFails) throw httpError(500)
        shop.tickets.push(payload)
        return { ticketId: 'TCK-42' }
      },
    },
    'services/contactService': {
      sendContactMessage: async (payload) => {
        if (shop.sendFails) throw httpError(500)
        shop.contacts.push(payload)
        return { success: true }
      },
    },
    'services/productService': {
      getProducts: async () => ({ products: shop.giftProducts }),
      getProductBySlug: async (slug, locale) => {
        shop.productCalls.push([slug, locale])
        await null
        if (shop.productsFail) throw httpError(503)
        if (!shop.products[slug]) throw httpError(404)
        return shop.products[slug]
      },
    },
    'services/giftCardService': { getMyGiftCards: async () => shop.myGiftCards },
    'utils/productUtils': { getVariantImage: (variant) => variant.thumbnail },
  })
  return { window, backend, auth, shop, page, redux, react, load }
}

const price = (eur) => ({ eur, dol: eur + 10, pou: eur - 10 })
const card = (slug, extra = {}) => ({ productId: `id-${slug}`, slug, title: `Piece ${slug}`, price: price(100), fixedPrice: false, url: `/products/${slug}`, inStock: true, ...extra })
const lumiVariant = (id, extra = {}) => ({ id, colour: 'rose', title: 'Rose Gold', price: price(100), inStock: true, sizes: [], ...extra })
const detail = (slug, extra = {}) => ({ ...card(slug), priceHigh: price(200), colours: [{ key: 'rose', name: 'Rose gold' }], sizes: [], variants: [lumiVariant(`v-${slug}`)], ...extra })
const message = (from, text, extra = {}) => ({ id: `m-${Math.random().toString(36).slice(2)}`, from, at: new Date(NOW).toISOString(), blocks: [{ type: 'text', text }], ...extra })
const conversation = (id, updatedAt, messages) => ({ id, title: id, createdAt: updatedAt, updatedAt, messages })

/** A variant as productService normalizes it. */
const shopVariant = (id, title, extra = {}) => ({ id, title, price: price(249), available: true, position: 0, thumbnail: `https://cdn.example.com/${id}.jpg`, images: [], ...extra })
/**
 * A product as productService loads it by slug: earrings sized by carat in
 * three colours (yellow with its own size prices, rose sold out, white one-size).
 */
const shopProduct = (slug, extra = {}) => ({
  id: `id-${slug}`,
  productType: 'PHYSICAL',
  slug,
  title: `Piece ${slug}`,
  category: 'Earring',
  availability: true,
  metal: '925 Sterling Silver',
  finish: 'Gold Plating',
  variants: [
    shopVariant('v-yellow', 'Yellow Gold', { stock: 0, sizeMeasurement: 'CT', sizes: [{ size: 0.25, stock: 3 }, { size: 0.5, stock: 0, price: price(349) }, { size: 1, stock: 2, price: price(549) }] }),
    shopVariant('v-rose', 'Rose Gold', { stock: 0, sizes: [{ size: 0.25, stock: 0 }] }),
    shopVariant('v-white', 'White Gold', { price: price(259), stock: 4 }),
  ],
  ...extra,
})

/** The English texts, as the website shows them (chat section). */
const EN = JSON.parse(fs.readFileSync(path.join(SRC, 'locales/en/common.json'), 'utf8')).chat
const english = (key, values = {}) => {
  const text = key.split('.').reduce((node, part) => node?.[part], EN)
  assert.equal(typeof text, 'string', `missing English text chat.${key}`)
  return text.replace(/{{(\w+)}}/g, (_, name) => values[name] ?? '')
}

// ---------------------------------------------------------------------------
// chatService: reading replies
// ---------------------------------------------------------------------------

test('a valid answer keeps every block; follow-ups are limited to known library questions', () => {
  const { load } = setup()
  const { readLumiReply } = load('services/chatService.ts')
  const raw = {
    kind: 'answer', id: 'reply-0001', tool: 'product_details', source: 'tool', language: 'de', remaining: 7,
    blocks: [
      { type: 'text', text: '  Cadenza Earrings  ' },
      { type: 'points', items: ['One', 2, '', 'Two'] },
      { type: 'products', products: [card('a'), card('b', { image: 'https://cdn.example.com/b.jpg' })] },
      { type: 'product', product: detail('c', { material: 'Silver', sizes: [{ size: 52, label: '52', price: price(100), inStock: true }] }) },
      { type: 'compare', products: [detail('d'), detail('e')] },
      { type: 'links', links: [{ title: 'Care guide', url: '/resources/care' }] },
      { type: 'notice', tone: 'warning', text: 'Note' },
    ],
    followUps: ['ring-size', 'not-a-question', 'ring-size', 'shower', 'returns', 'delivery-time'],
  }
  const reply = readLumiReply(raw, 'en')
  assert.equal(reply.kind, 'answer')
  assert.deepEqual(reply.blocks.map((b) => b.type), ['text', 'points', 'products', 'product', 'compare', 'links', 'notice'])
  assert.equal(reply.blocks[0].text, 'Cadenza Earrings')
  assert.deepEqual(reply.blocks[1].items, ['One', 'Two'])
  assert.equal(reply.blocks[2].products[1].image, 'https://cdn.example.com/b.jpg')
  assert.equal(reply.blocks[3].product.material, 'Silver')
  assert.deepEqual(reply.blocks[3].product.sizes, [{ size: 52, label: '52', price: price(100), inStock: true }])
  assert.deepEqual(reply.followUps, ['ring-size', 'shower', 'returns'])
  assert.deepEqual([reply.id, reply.tool, reply.source, reply.language, reply.remaining], ['reply-0001', 'product_details', 'tool', 'de', 7])
})

test('blocks that break the contract are dropped; links and pictures never leave the shop', () => {
  const { load } = setup()
  const { readLumiReply } = load('services/chatService.ts')
  const reply = readLumiReply({
    kind: 'answer',
    blocks: [
      { type: 'video', url: '/x' },
      { type: 'text', text: '   ' },
      { type: 'points', items: [] },
      { type: 'products', products: [card('ok', { image: 'javascript:alert(1)' }), card('no-price', { price: { eur: 1 } }), { ...card('no-stock'), inStock: undefined }] },
      { type: 'links', links: [
        { title: 'Inside', url: '/blogs/a' },
        { title: 'Other site', url: 'https://evil.example.com' },
        { title: 'Protocol-relative', url: '//evil.example.com' },
        { title: 'Backslash', url: '/\\evil.example.com' },
        { title: 'Script', url: 'javascript:alert(1)' },
        { title: '', url: '/empty-title' },
      ] },
      { type: 'compare', products: [detail('only'), detail('broken', { colours: undefined })] },
      { type: 'notice', tone: 'loud', text: 'Hello' },
      { type: 'product', product: detail('no-high', { priceHigh: undefined }) },
    ],
  }, 'en')
  assert.equal(reply.kind, 'answer')
  assert.deepEqual(reply.blocks.map((b) => b.type), ['products', 'links', 'product', 'notice'])
  assert.deepEqual(reply.blocks[0].products.map((p) => p.slug), ['ok'])
  assert.equal('image' in reply.blocks[0].products[0], false)
  assert.deepEqual(reply.blocks[1].links, [{ title: 'Inside', url: '/blogs/a' }])
  assert.equal(reply.blocks[2].product.slug, 'only') // one product left of a comparison is shown on its own
  assert.equal(reply.blocks[3].tone, 'info')
  // Missing reply details get safe defaults.
  assert.deepEqual([reply.id, reply.tool, reply.source, reply.language, reply.remaining], ['', 'ask_question', 'ai', 'en', 0])
})

test('unknown kinds, empty answers and unknown actions are "unavailable"', () => {
  const { load } = setup()
  const { readLumiReply } = load('services/chatService.ts')
  const kind = (raw) => readLumiReply(raw, 'en').kind
  assert.equal(kind(null), 'unavailable')
  assert.equal(kind('text'), 'unavailable')
  assert.equal(kind({ kind: 'poem', text: 'hi' }), 'unavailable')
  assert.equal(kind({ kind: 'answer', blocks: [{ type: 'mystery' }] }), 'unavailable')
  assert.equal(kind({ kind: 'answer' }), 'unavailable')
  assert.equal(kind({ kind: 'action', action: { type: 'refund_everything' } }), 'unavailable')
  assert.equal(kind({ kind: 'unavailable' }), 'unavailable')
  assert.deepEqual(readLumiReply({ kind: 'action', action: { type: 'order_status', orderNumber: ' IWJ1011 ' } }, 'en').action, { type: 'order_status', orderNumber: 'IWJ1011' })
  assert.deepEqual(readLumiReply({ kind: 'action', action: { type: 'my_orders' } }, 'en').action, { type: 'my_orders' })
  assert.deepEqual(readLumiReply({ kind: 'limit', tier: 'customer' }, 'en'), { kind: 'limit', tier: 'customer' })
  assert.deepEqual(readLumiReply({ kind: 'limit', tier: 'vip' }, 'en'), { kind: 'limit', tier: 'visitor' })
})

test('sendChatMessage sends the last 4 turns (300 characters each), the suggestion and the pass, and keeps a new pass', async () => {
  const { load, backend } = setup()
  const { sendChatMessage } = load('services/chatService.ts')
  sessionStorage.setItem('iwj-chat-pass', 'old-pass')
  backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'Hi!' }], followUps: [], chatPass: 'new-pass' })
  const turns = ['a', 'b', 'c', 'd', 'x'.repeat(400)].map((content, i) => ({ role: i % 2 ? 'assistant' : 'user', content, extra: 'dropped' }))
  const reply = await sendChatMessage({ message: 'Hello', locale: 'fr', history: turns, suggestion: 'ring-size', botToken: 'tok' })
  assert.equal(reply.kind, 'answer')
  const [call] = backend.of('POST', '/chat')
  assert.equal(call.body.message, 'Hello')
  assert.equal(call.body.locale, 'fr')
  assert.equal(call.body.suggestion, 'ring-size')
  assert.equal(call.body.chatPass, 'old-pass')
  assert.equal(call.body.botToken, 'tok')
  assert.deepEqual(call.body.history.map((t) => t.content.length), [1, 1, 1, 300])
  assert.deepEqual(Object.keys(call.body.history[0]), ['role', 'content'])
  assert.ok(call.config.timeout > 0)
  assert.equal(sessionStorage.getItem('iwj-chat-pass'), 'new-pass')
})

test('sendChatMessage: 403 is a bot check (and forgets the pass); other failures are "unavailable"', async () => {
  const { load, backend } = setup()
  const { sendChatMessage, needsBotCheck } = load('services/chatService.ts')
  const ask = () => sendChatMessage({ message: 'Hi', locale: 'en', history: [] })
  sessionStorage.setItem('iwj-chat-pass', 'pass')
  assert.equal(needsBotCheck(false), false)
  assert.equal(needsBotCheck(true), false)
  backend.fail = () => httpError(403)
  assert.deepEqual(await ask(), { kind: 'botCheck' })
  assert.equal(sessionStorage.getItem('iwj-chat-pass'), null)
  assert.equal(needsBotCheck(false), true)
  backend.fail = () => httpError(500)
  assert.deepEqual(await ask(), { kind: 'unavailable' })
  backend.fail = () => new Error('Network Error')
  assert.deepEqual(await ask(), { kind: 'unavailable' })
  backend.fail = () => undefined
  backend.chatReply = () => 'not json'
  assert.deepEqual(await ask(), { kind: 'unavailable' })
  // Storage blocked (private mode): still works, the bot check just runs every time.
  sessionStorage.blocked = true
  backend.chatReply = () => ({ kind: 'limit', tier: 'loggedIn', chatPass: 'p' })
  assert.deepEqual(await ask(), { kind: 'limit', tier: 'loggedIn' })
  assert.equal(needsBotCheck(false), true)
})

test('the conversation is sent as plain text: what was said and the products shown, not forms or notices', () => {
  const { load } = setup()
  const { toChatTurns } = load('services/chatService.ts')
  const turns = toChatTurns([
    message('you', 'Show me earrings'),
    { ...message('lumi', 'Here are 2:'), blocks: [{ type: 'text', text: 'Here are 2:' }, { type: 'products', products: [card('a'), card('b')] }] },
    { ...message('lumi', ''), blocks: [{ type: 'messageForm' }] },
    { ...message('lumi', ''), blocks: [{ type: 'notice', tone: 'warning', text: 'Unavailable' }, { type: 'links', links: [{ title: 'Contact', url: '/contact' }] }] },
    { ...message('lumi', ''), blocks: [{ type: 'points', items: ['One', 'Two'] }] },
  ])
  assert.deepEqual(turns, [
    { role: 'user', content: 'Show me earrings' },
    { role: 'assistant', content: 'Here are 2:\nPiece a, Piece b' },
    { role: 'assistant', content: 'One\nTwo' },
  ])
})

test('saved blocks the website made (orders, forms, balances) are read back; broken ones are dropped', () => {
  const { load } = setup()
  const { readBlock } = load('services/chatService.ts')
  const summary = { id: 'o1', orderNumber: 'IWJ1', createdAt: '2026-10-01', status: 'SHIPPED', itemCount: 1, total: price(10), image: 'https://x/1.jpg' }
  assert.deepEqual(readBlock({ type: 'orders', orders: [summary, { id: 'broken' }], more: { title: 'All', url: '/orders' } }), { type: 'orders', orders: [summary], more: { title: 'All', url: '/orders' } })
  assert.equal(readBlock({ type: 'orders', orders: [] }), undefined)
  // The guest order lookup is gone: its form in an old saved chat is dropped.
  assert.equal(readBlock({ type: 'lookupForm', orderNumber: 'IWJ1', done: true }), undefined)
  assert.deepEqual(readBlock({ type: 'messageForm' }), { type: 'messageForm' })
  assert.deepEqual(readBlock({ type: 'giftBalances', cards: [{ code: '…1234', balance: '€50.00' }, { code: 5 }] }), { type: 'giftBalances', cards: [{ code: '…1234', balance: '€50.00' }] })
  assert.equal(readBlock({ type: 'order', order: { orderNumber: 'IWJ1' } }), undefined)
  assert.equal(readBlock({ type: 'unknown' }), undefined)
  assert.equal(readBlock(null), undefined)
})

test('contract v2: cards need their product id, sizes carry the bag\'s value, and every colour comes with its own id, sizes and stock', () => {
  const { load } = setup()
  const { readLumiReply } = load('services/chatService.ts')
  const sizes = [
    { size: 0.25, label: '0.25 ct', price: price(249), inStock: true },
    { size: 0.5, label: '0.5 ct', price: price(349), inStock: false },
    { size: 0.25, label: 'twice', price: price(1), inStock: true },
    { label: 'no value', price: price(1), inStock: true },
  ]
  const variants = [
    lumiVariant('v-yellow', { colour: 'yellow', title: 'Yellow Gold', image: 'https://cdn.example.com/y.jpg', sizes }),
    lumiVariant('v-yellow', { title: 'Same id twice' }),
    lumiVariant('v-white', { colour: 'purple', title: 'White Gold', image: '//evil.example.com/x.jpg', inStock: false }),
    lumiVariant('', { title: 'No id' }),
    lumiVariant('v-no-sizes', { sizes: undefined }),
  ]
  const reply = readLumiReply({
    kind: 'answer', id: 'reply-0002', tool: 'pairs_with', source: 'tool',
    blocks: [
      { type: 'products', products: [card('a'), card('no-id', { productId: undefined }), card('blank-id', { productId: ' ' })] },
      { type: 'product', product: detail('c', { sizes, variants }) },
      { type: 'product', product: detail('no-colours-to-buy', { variants: [] }) },
      { type: 'compare', products: [detail('d'), detail('e', { variants: undefined })] },
    ],
    followUps: [],
  }, 'en')
  assert.equal(reply.tool, 'pairs_with')
  assert.deepEqual(reply.blocks.map((b) => b.type), ['products', 'product', 'product'])
  assert.deepEqual(reply.blocks[0].products.map((p) => [p.productId, p.slug]), [['id-a', 'a']])
  const product = reply.blocks[1].product
  assert.deepEqual(product.sizes.map((s) => [s.size, s.label]), [[0.25, '0.25 ct'], [0.5, '0.5 ct']])
  assert.deepEqual(product.variants, [
    { id: 'v-yellow', colour: 'yellow', title: 'Yellow Gold', image: 'https://cdn.example.com/y.jpg', price: price(100), inStock: true, sizes: product.sizes },
    { id: 'v-white', title: 'White Gold', price: price(100), inStock: false, sizes: [] },
  ])
  assert.equal(reply.blocks[2].product.slug, 'd') // the comparison lost one product: shown on its own
})

test('actions: the shop actions are read, with a product slug only when it is a real one', () => {
  const { load } = setup()
  const { readLumiReply } = load('services/chatService.ts')
  const action = (raw) => readLumiReply({ kind: 'action', tool: 'add_to_bag', action: raw }, 'en').action
  for (const type of ['add_to_bag', 'add_to_wishlist', 'show_bag', 'show_wishlist', 'gift_finder']) assert.deepEqual(action({ type }), { type })
  assert.deepEqual(action({ type: 'add_to_bag', productSlug: ' iwjnk0009 ' }), { type: 'add_to_bag', productSlug: 'iwjnk0009' })
  assert.deepEqual(action({ type: 'add_to_wishlist', productSlug: '../admin' }), { type: 'add_to_wishlist' })
  assert.deepEqual(action({ type: 'add_to_wishlist', productSlug: 'x'.repeat(121) }), { type: 'add_to_wishlist' })
  assert.equal(readLumiReply({ kind: 'action', tool: 'add_to_bag', action: { type: 'empty_bag' } }, 'en').kind, 'unavailable')
  for (const tool of ['pairs_with', 'add_to_bag', 'add_to_wishlist', 'show_bag', 'show_wishlist', 'gift_finder']) {
    assert.equal(readLumiReply({ kind: 'action', tool, action: { type: 'show_bag' } }, 'en').tool, tool)
  }
})

test('questions carry the product page as context (a real slug only) and, from the gift finder, the exact search', async () => {
  const { load, backend } = setup()
  const { sendChatMessage } = load('services/chatService.ts')
  backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'Hi' }], followUps: [] })
  const intent = { tool: 'find_products', categories: ['necklaces'], maxPrice: 100, sort: 'popular', count: 8 }
  await sendChatMessage({ message: 'A', locale: 'en', history: [], context: { productSlug: 'iwjnk0009' }, intent })
  await sendChatMessage({ message: 'B', locale: 'en', history: [], context: { productSlug: 'Not A Slug' } })
  await sendChatMessage({ message: 'C', locale: 'en', history: [] })
  const [a, b, c] = backend.of('POST', '/chat').map((call) => call.body)
  assert.deepEqual(a.context, { productSlug: 'iwjnk0009' })
  assert.deepEqual(a.intent, intent)
  assert.deepEqual(b.context, {})
  assert.deepEqual(c.context, {})
  assert.equal(c.intent, undefined)
})

test('feedback goes to POST /chat/feedback by reply id and never throws', async () => {
  const { load, backend } = setup()
  const { sendFeedback } = load('services/chatService.ts')
  assert.equal(await sendFeedback('reply-0001', true), true)
  assert.deepEqual(backend.of('POST', '/chat/feedback')[0].body, { replyId: 'reply-0001', helpful: true })
  assert.ok(backend.of('POST', '/chat/feedback')[0].config.timeout > 0)
  assert.equal(await sendFeedback('short', false), false)
  assert.equal(await sendFeedback('x'.repeat(65), false), false)
  assert.equal(backend.of('POST', '/chat/feedback').length, 1)
  backend.fail = () => httpError(404) // someone else's reply, or an old one
  assert.equal(await sendFeedback('reply-0001', false), false)
  backend.fail = () => httpError(500)
  assert.equal(await sendFeedback('reply-0001', false), false)
  backend.fail = () => new Error('Network Error')
  assert.equal(await sendFeedback('reply-0001', false), false)
})

test('saved chats keep the shop blocks and each message\'s Sent/Seen, reply id and feedback', () => {
  const { load } = setup()
  const { readBlock } = load('services/chatService.ts')
  const { readConversation } = load('services/lumiHistoryService.ts')
  assert.deepEqual(
    readBlock({ type: 'cartAdded', item: { title: 'Spilla', variantTitle: 'Yellow Gold', sizeLabel: '18', image: 'javascript:alert(1)', price: price(299), quantity: 2.7 } }),
    { type: 'cartAdded', item: { title: 'Spilla', variantTitle: 'Yellow Gold', sizeLabel: '18', price: price(299), quantity: 2 } },
  )
  assert.equal(readBlock({ type: 'cartAdded', item: { title: 'No price' } }), undefined)
  assert.equal(readBlock({ type: 'cartAdded', item: { title: 'One', price: price(5), quantity: -3 } }).item.quantity, 1)
  assert.deepEqual(readBlock({ type: 'bag', snapshot: [1, 2] }), { type: 'bag' })
  assert.deepEqual(readBlock({ type: 'wishlist' }), { type: 'wishlist' })
  assert.deepEqual(
    readBlock({ type: 'giftFinder', step: 2, answers: { recipient: 'mum', occasion: 'party', budget: 'any' }, done: true }),
    { type: 'giftFinder', step: 2, answers: { recipient: 'mum', budget: 'any' }, done: true },
  )
  assert.deepEqual(readBlock({ type: 'giftFinder', step: 9, answers: 'all' }), { type: 'giftFinder', step: 0, answers: {} })
  const chat = readConversation(conversation('chat-0001', new Date(NOW).toISOString(), [
    message('you', 'Hi', { status: 'seen' }),
    message('lumi', 'Hello', { replyId: 'reply-0001', feedback: 'up' }),
    message('you', 'Odd', { status: 'read', replyId: 'x', feedback: 'meh' }),
  ]))
  assert.equal(chat.messages[0].status, 'seen')
  assert.deepEqual([chat.messages[1].replyId, chat.messages[1].feedback], ['reply-0001', 'up'])
  assert.deepEqual(Object.keys(chat.messages[2]).sort(), ['at', 'blocks', 'from', 'id'])
})

// ---------------------------------------------------------------------------
// shop: product pages, product cards, checkout and the gift finder
// ---------------------------------------------------------------------------

test('the product page is read from the address, with or without a language', () => {
  const { load } = setup()
  const { productSlugFromPath } = load('components/lumi/shop.ts')
  assert.equal(productSlugFromPath('/products/iwjnk0009'), 'iwjnk0009')
  assert.equal(productSlugFromPath('/de/products/iwjnk0009'), 'iwjnk0009')
  assert.equal(productSlugFromPath('/nl/products/spilla-necklace/'), 'spilla-necklace')
  assert.equal(productSlugFromPath('/en/products/iwjnk0009'), 'iwjnk0009') // the old English prefix
  const elsewhere = [
    '/', '', '/products', '/products/', '/de', '/de/products', '/admin/products/iwjnk0009', '/de/admin/products/iwjnk0009',
    '/products/a/b', '/products/Not_A_Slug', '/products/%2e%2e', '/blogs/products/x', '/xx/products/x', '/products/-dash',
  ]
  for (const pathname of elsewhere) assert.equal(productSlugFromPath(pathname), null, pathname)
})

test('a shop product becomes Lumi\'s card: colour keys, size labels, prices and stock all from the shop\'s data', () => {
  const { load } = setup()
  const { toLumiProduct, pageContextOf, colourKeyOf, sizeLabelOf } = load('components/lumi/shop.ts')
  const words = { colour: (key) => `colour:${key}`, material: (metal, finish) => `${metal} with ${finish}` }
  const product = toLumiProduct(shopProduct('cadenza-earrings'), words, 'cadenza-earrings')
  assert.deepEqual(
    { ...product, variants: undefined, sizes: undefined },
    {
      productId: 'id-cadenza-earrings',
      slug: 'cadenza-earrings',
      title: 'Piece cadenza-earrings',
      image: 'https://cdn.example.com/v-yellow.jpg',
      price: price(249),
      fixedPrice: false,
      url: '/products/cadenza-earrings',
      inStock: true,
      priceHigh: price(549),
      colours: [{ key: 'yellow', name: 'colour:yellow' }, { key: 'rose', name: 'colour:rose' }, { key: 'white', name: 'colour:white' }],
      material: '925 Sterling Silver with Gold Plating',
      variants: undefined,
      sizes: undefined,
    },
  )
  // Each colour with its own sizes: the size's own price, else the colour's; sold-out sizes kept, marked.
  assert.deepEqual(product.variants, [
    {
      id: 'v-yellow', colour: 'yellow', title: 'Yellow Gold', image: 'https://cdn.example.com/v-yellow.jpg', price: price(249), inStock: true,
      sizes: [
        { size: 0.25, label: '0.25 ct', price: price(249), inStock: true },
        { size: 0.5, label: '0.5 ct', price: price(349), inStock: false },
        { size: 1, label: '1 ct', price: price(549), inStock: true },
      ],
    },
    { id: 'v-rose', colour: 'rose', title: 'Rose Gold', image: 'https://cdn.example.com/v-rose.jpg', price: price(249), inStock: false, sizes: [{ size: 0.25, label: '0.25 ct', price: price(249), inStock: false }] },
    { id: 'v-white', colour: 'white', title: 'White Gold', image: 'https://cdn.example.com/v-white.jpg', price: price(259), inStock: true, sizes: [] },
  ])
  // The sizes across colours: the cheapest price, in stock in any colour.
  assert.deepEqual(product.sizes.map((s) => [s.size, s.price.eur, s.inStock]), [[0.25, 249, true], [0.5, 349, false], [1, 549, true]])

  // A necklace like the shop's Spilla: one size (18) in one colour is still kept, because the bag needs it.
  const necklace = toLumiProduct(shopProduct('iwjnk0009', {
    category: 'Necklace',
    finish: '',
    variants: [
      shopVariant('y', 'Yellow Gold', { price: price(299), stock: 0, sizes: [{ size: 18, stock: 5 }], coverImage: 'https://cdn.example.com/cover.png' }),
      shopVariant('w', 'White Gold', { price: price(299), stock: 50 }),
    ],
  }), words, 'iwjnk0009')
  assert.deepEqual(necklace.variants.map((v) => [v.id, v.sizes.map((s) => s.label), v.inStock]), [['y', ['18'], true], ['w', [], true]])
  assert.deepEqual([necklace.sizes, necklace.fixedPrice, necklace.material, necklace.image], [[], true, '925 Sterling Silver', 'https://cdn.example.com/cover.png'])

  // Hidden products and unavailable colours can't be bought; unknown stock counts as in stock (as on the product page).
  const hidden = toLumiProduct(shopProduct('hidden', { availability: false }), words, 'hidden')
  assert.deepEqual([hidden.inStock, ...hidden.variants.map((v) => v.inStock)], [false, false, false, false])
  const mixed = toLumiProduct(shopProduct('mixed', {
    variants: [shopVariant('a', 'Rose Gold', { available: false, stock: 9 }), shopVariant('b', 'Platinum'), shopVariant('', 'No id'), shopVariant('b', 'Twice')],
  }), words, 'mixed')
  assert.deepEqual(mixed.variants.map((v) => [v.id, v.colour, v.inStock]), [['a', 'rose', false], ['b', undefined, true]])
  assert.deepEqual(mixed.colours.map((c) => c.key), ['rose'])
  // Nothing to buy, or no id: no card.
  assert.equal(toLumiProduct(shopProduct('none', { variants: [] }), words, 'none'), null)
  assert.equal(toLumiProduct(shopProduct('no-id', { id: '' }), words, 'no-id'), null)
  // The slug it was loaded by, when the shop's own is missing.
  assert.equal(toLumiProduct(shopProduct('', { title: 'Old' }), words, 'old-piece').url, '/products/old-piece')

  assert.equal(colourKeyOf(' Rose Gold / 52'), 'rose')
  assert.equal(colourKeyOf('Gold'), undefined)
  assert.deepEqual([sizeLabelOf('Earring', 0.25), sizeLabelOf('earrings', 6), sizeLabelOf('Rings', 52), sizeLabelOf('Necklace', 1)], ['0.25 ct', '6', '52', '1'])
  assert.deepEqual(pageContextOf(shopProduct('iwjnk0009', { title: ' Spilla Necklace ' }), 'iwjnk0009'), { slug: 'iwjnk0009', title: 'Spilla Necklace', image: 'https://cdn.example.com/v-yellow.jpg' })
  assert.deepEqual(pageContextOf(shopProduct('', { title: '', variants: [] }), 'by-path'), { slug: 'by-path' })
})

test('"Buy now" builds the same single-item checkout as the product page', () => {
  const { load } = setup()
  const { checkoutDraft, bagQuantity, bagItemKey } = load('components/lumi/shop.ts')
  const selection = { productId: 'p1', slug: 'ring', variantId: 'v1', size: 52, quantity: 2, title: 'Ring', variantTitle: 'Rose Gold', sizeLabel: '52', price: price(199) }
  assert.deepEqual(checkoutDraft(selection, { returnPath: '/de/products/ring', thumbnail: 'https://cdn.example.com/1.jpg', sizeMeasurement: 'EU' }), {
    item: { id: 'p1-v1-52', productId: 'p1', variantId: 'v1', title: 'Ring', variantTitle: 'Rose Gold', thumbnail: 'https://cdn.example.com/1.jpg', price: price(199), quantity: 2, size: 52, sizeMeasurement: 'EU' },
    returnPath: '/de/products/ring',
  })
  const oneSize = checkoutDraft({ ...selection, size: undefined, quantity: 0, variantTitle: undefined }, { returnPath: '/', thumbnail: '' })
  assert.deepEqual(oneSize.item, { id: 'p1-v1', productId: 'p1', variantId: 'v1', title: 'Ring', variantTitle: '', thumbnail: '', price: price(199), quantity: 1 })
  assert.deepEqual([bagQuantity(undefined), bagQuantity(3), bagQuantity(1.5), bagQuantity(-1), bagQuantity('2')], [1, 3, 1, 1, 1])
  assert.notEqual(bagItemKey(selection), bagItemKey({ ...selection, size: 54 }))
  assert.equal(bagItemKey(selection), bagItemKey({ ...selection, quantity: 5 }))
})

test('gift finder: answers are checked, then become an exact search and the visitor\'s own words', () => {
  const { load } = setup()
  const { mergeGiftAnswers, giftStep, isCompleteGift, giftIntent, giftSummary, budgetCurrency, budgetValues } = load('components/lumi/shop.ts')
  const euros = (amount) => `€${amount}`
  let answers = mergeGiftAnswers({}, { recipient: 'partner', occasion: 'party' })
  assert.deepEqual(answers, { recipient: 'partner' })
  assert.equal(giftStep(answers), 1)
  answers = mergeGiftAnswers(answers, { occasion: 'birthday', budget: 'under100' })
  assert.equal(giftStep(answers), 3)
  assert.equal(isCompleteGift(answers), false)
  answers = mergeGiftAnswers(answers, { type: 'necklaces', recipient: 'boss' })
  assert.deepEqual(answers, { recipient: 'partner', occasion: 'birthday', budget: 'under100', type: 'necklaces' })
  assert.equal(giftStep(answers), 4)
  assert.equal(isCompleteGift(answers), true)
  assert.deepEqual(giftIntent(answers), { tool: 'find_products', categories: ['necklaces'], maxPrice: 100, sort: 'popular', count: 8 })
  assert.equal(giftSummary(answers, english, euros), 'A necklace under €100 for my partner\'s birthday')
  // Budgets are written in the visitor's currency where the shop's prices allow it (pounds are priced
  // like euros); dollars follow a rate the website doesn't know, so they stay in euros.
  assert.equal(giftSummary(answers, english, (amount) => `£${amount}`), 'A necklace under £100 for my partner\'s birthday')
  assert.deepEqual([budgetCurrency('eur'), budgetCurrency('pou'), budgetCurrency('dol')], ['eur', 'pou', 'eur'])
  assert.deepEqual(budgetValues('from100to200', euros), { amount: '€200', from: '€100', to: '€200' })
  assert.deepEqual(budgetValues('over200', euros), { amount: '€200', from: '€200' })
  assert.deepEqual(budgetValues('any', euros), {})
  assert.equal(english('lumi.gift.options.budget.from100to200', budgetValues('from100to200', euros)), '€100–€200')

  const anything = { recipient: 'myself', occasion: 'justBecause', budget: 'any', type: 'any' }
  assert.deepEqual(giftIntent(anything), { tool: 'find_products', sort: 'popular', count: 8 })
  assert.equal(giftSummary(anything, english, euros), 'A gift for myself, just because')
  assert.deepEqual(giftIntent({ ...anything, budget: 'from100to200', type: 'rings' }), { tool: 'find_products', categories: ['rings'], minPrice: 100, maxPrice: 200, sort: 'popular', count: 8 })
  assert.deepEqual(giftIntent({ ...anything, budget: 'over200', type: 'earrings' }), { tool: 'find_products', categories: ['earrings'], minPrice: 200, sort: 'popular', count: 8 })
  assert.equal(giftSummary({ recipient: 'friend', occasion: 'wedding', budget: 'over200', type: 'earrings' }, english, euros), 'Earrings over €200 for a friend\'s wedding')
  assert.equal(giftSummary({ ...anything, budget: 'from100to200', type: 'rings' }, english, euros), 'A ring between €100 and €200 for myself, just because')

  // Every combination has its English words.
  for (const recipient of ['partner', 'mum', 'friend', 'myself']) {
    for (const occasion of ['birthday', 'anniversary', 'wedding', 'justBecause']) {
      for (const budget of ['under100', 'from100to200', 'over200', 'any']) {
        for (const type of ['earrings', 'necklaces', 'rings', 'bracelets', 'any']) {
          const summary = giftSummary({ recipient, occasion, budget, type }, english, euros)
          assert.match(summary, /^[A-Z][^{}]+$/, summary)
          assert.ok(!summary.includes('  '), summary)
        }
      }
    }
  }
})

// ---------------------------------------------------------------------------
// lumiHistoryService: ids, text, limits, storage
// ---------------------------------------------------------------------------

test('ids are unique and accepted by the backend, also without crypto.randomUUID (plain http)', () => {
  const { load } = setup()
  const { newLumiId } = load('services/lumiHistoryService.ts')
  const backendId = /^[A-Za-z0-9_-]{8,64}$/
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  const original = Object.getOwnPropertyDescriptor(globalThis, 'crypto')
  try {
    const real = globalThis.crypto
    for (const random of [real, { getRandomValues: (b) => real.getRandomValues(b) }, undefined]) {
      Object.defineProperty(globalThis, 'crypto', { value: random, configurable: true, writable: true })
      const ids = new Set(Array.from({ length: 500 }, newLumiId))
      assert.equal(ids.size, 500)
      for (const id of ids) assert.ok(backendId.test(id) && uuid.test(id), id)
    }
  } finally {
    Object.defineProperty(globalThis, 'crypto', original)
  }
})

test('titles and previews are one plain line; emoji are never cut in half', () => {
  const { load } = setup()
  const { clip, fit, titleOf, previewOf } = load('services/lumiHistoryService.ts')
  assert.equal(clip('  a\n\n b  ', 10), 'a b')
  assert.equal(clip('abcdefghij', 5), 'abcd…')
  assert.equal(fit('ab😀', 3), 'ab') // the emoji's two halves stay together
  assert.equal(clip('😀😀😀😀', 4), '😀…')
  const long = `${'Which earrings suit a round face? '.repeat(4)}`
  assert.equal(titleOf(message('you', long)).length, 60)
  assert.ok(titleOf(message('you', long)).endsWith('…'))
  assert.equal(titleOf(message('lumi', 'Hello')), '')
  const preview = previewOf([
    message('you', 'Show me rings'),
    { ...message('lumi', ''), blocks: [{ type: 'text', text: 'Here are rings:' }, { type: 'points', items: ['Gold', 'Silver'] }, { type: 'products', products: [card('a')] }] },
  ])
  assert.equal(preview, 'Here are rings: Gold Silver')
  assert.equal(previewOf([message('you', 'x'), { ...message('lumi', ''), blocks: [{ type: 'products', products: [card('a'), card('b')] }] }]), 'Piece a, Piece b')
  assert.equal(previewOf([message('you', 'Talk to a person'), { ...message('lumi', ''), blocks: [{ type: 'messageForm' }] }]), 'Talk to a person')
  assert.ok(previewOf([message('lumi', 'y'.repeat(200))]).length <= 90)
  assert.equal(previewOf([]), '')
})

test('the device keeps 30 chats, 60 messages each, none older than 30 days, newest first', () => {
  const { load } = setup()
  const { pruneChats } = load('services/lumiHistoryService.ts')
  const at = (days) => new Date(NOW - days * DAY).toISOString()
  const many = Array.from({ length: 40 }, (_, i) => conversation(`c${i}`, at(i / 2), [message('you', `q${i}`)]))
  const old = conversation('old', at(31), [message('you', 'old')])
  const long = conversation('long', at(0.1), Array.from({ length: 70 }, (_, i) => message('you', `m${i}`)))
  const empty = conversation('empty', at(0), [])
  const stale = conversation('c1', at(29), [message('you', 'stale copy')])
  const kept = pruneChats([old, ...many, long, empty, stale], NOW)
  assert.equal(kept.length, 30)
  assert.equal(kept[0].id, 'c0')
  assert.ok(!kept.some((c) => c.id === 'old' || c.id === 'empty'))
  assert.equal(kept.filter((c) => c.id === 'c1').length, 1)
  assert.equal(kept.find((c) => c.id === 'c1').messages[0].blocks[0].text, 'q1')
  const trimmed = kept.find((c) => c.id === 'long')
  assert.equal(trimmed.messages.length, 60)
  assert.equal(trimmed.messages[0].blocks[0].text, 'm10')
  for (let i = 1; i < kept.length; i++) assert.ok(Date.parse(kept[i - 1].updatedAt) >= Date.parse(kept[i].updatedAt))
})

test('device storage: blocked, damaged, full', () => {
  const { load, window } = setup()
  const { readDeviceChats, writeDeviceChats, clearDeviceChats, DEVICE_KEY } = load('services/lumiHistoryService.ts')
  const storage = window.localStorage
  assert.deepEqual(readDeviceChats(NOW), [])
  storage.setItem(DEVICE_KEY, '{not json')
  assert.deepEqual(readDeviceChats(NOW), [])
  storage.setItem(DEVICE_KEY, JSON.stringify([conversation('good', new Date(NOW).toISOString(), [message('you', 'hi')]), { id: 'bad' }, conversation('no-messages', new Date(NOW).toISOString(), [{ id: 'x' }])]))
  assert.deepEqual(readDeviceChats(NOW).map((c) => c.id), ['good'])
  // Full: the oldest chats are left out until the rest fit.
  const chats = Array.from({ length: 8 }, (_, i) => conversation(`c${i}`, new Date(NOW - i * 1000).toISOString(), [message('you', 'x'.repeat(100))]))
  storage.quota = JSON.stringify(chats.slice(0, 3)).length
  assert.equal(writeDeviceChats(chats), true)
  assert.deepEqual(JSON.parse(storage.getItem(DEVICE_KEY)).map((c) => c.id), ['c0', 'c1'])
  storage.quota = Infinity
  // Blocked (private mode): nothing throws.
  storage.blocked = true
  assert.equal(readDeviceChats(NOW), null)
  assert.equal(writeDeviceChats(chats), false)
  clearDeviceChats()
})

test('a save sends the latest messages that fit the backend limit', () => {
  const { load } = setup()
  const { saveBody } = load('services/lumiHistoryService.ts')
  const chat = conversation('c', new Date(NOW).toISOString(), Array.from({ length: 75 }, (_, i) => message('you', `${i}`.padEnd(3000, '.'))))
  const body = saveBody(chat)
  assert.deepEqual(Object.keys(body), ['title', 'messages', 'createdAt'])
  assert.ok(body.messages.length < 75 && body.messages.length > 1)
  assert.ok(new TextEncoder().encode(JSON.stringify(body)).length <= 240 * 1024)
  assert.equal(body.messages.at(-1).id, chat.messages.at(-1).id)
  assert.equal(saveBody({ ...chat, messages: chat.messages.slice(0, 2) }).messages.length, 2)
})

test('the account API: list, one chat, missing chat, unexpected answers', async () => {
  const { load, backend } = setup({ signedIn: 'ann@example.com' })
  const { fetchConversations, fetchConversation, deleteConversation } = load('services/lumiHistoryService.ts')
  backend.chats.set('chat-0001', conversation('chat-0001', new Date(NOW - 1000).toISOString(), [message('you', 'Hi')]))
  backend.chats.set('chat-0002', conversation('chat-0002', new Date(NOW).toISOString(), [message('you', 'Hello')]))
  assert.deepEqual((await fetchConversations()).map((c) => c.id), ['chat-0002', 'chat-0001'])
  assert.equal((await fetchConversation('chat-0001')).messages[0].blocks[0].text, 'Hi')
  assert.equal(await fetchConversation('gone-0000'), null)
  await deleteConversation('gone-0000') // already gone: fine
  backend.fail = () => httpError(500)
  await assert.rejects(fetchConversations())
  await assert.rejects(fetchConversation('chat-0001'))
  backend.fail = () => undefined
  backend.client.get = async () => ({ data: { success: true, data: { nothing: true } } })
  await assert.rejects(fetchConversations())
})

// ---------------------------------------------------------------------------
// useLumiHistory: the store for guests (device)
// ---------------------------------------------------------------------------

test('guest: a new chat starts empty, is created by its first message and saved on the device', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'], now: NOW })
  const { load, window } = setup()
  const { LumiChatHistory } = load('components/lumi/useLumiHistory.ts')
  const { DEVICE_KEY } = load('services/lumiHistoryService.ts')
  const history = new LumiChatHistory('guest')
  history.start()
  assert.equal(history.getSnapshot().ready, false)
  history.load()
  let snap = history.getSnapshot()
  assert.deepEqual([snap.ready, snap.store, snap.current, snap.conversations.length], [true, 'device', null, 0])

  const question = message('you', `  How do I find my ring size? ${'More words '.repeat(10)}`)
  history.append(question)
  history.append(message('lumi', 'Use our ring size guide.'))
  snap = history.getSnapshot()
  assert.equal(snap.current.messages.length, 2)
  assert.ok(snap.current.title.startsWith('How do I find my ring size?') && snap.current.title.length <= 60)
  assert.match(snap.current.id, /^[A-Za-z0-9_-]{8,64}$/)
  assert.deepEqual(snap.conversations.map((c) => [c.id, c.preview, c.messageCount]), [[snap.current.id, 'Use our ring size guide.', 2]])
  const stored = JSON.parse(window.localStorage.getItem(DEVICE_KEY))
  assert.equal(stored[0].messages.length, 2)

  // update() changes one message and is saved too.
  history.update(question.id, (m) => ({ ...m, blocks: [{ type: 'text', text: 'Edited' }] }))
  assert.equal(JSON.parse(window.localStorage.getItem(DEVICE_KEY))[0].messages[0].blocks[0].text, 'Edited')

  // A second chat: the list is newest first; open() brings the first back.
  const first = snap.current.id
  t.mock.timers.tick(1000)
  history.startNew()
  assert.equal(history.getSnapshot().current, null)
  history.append(message('you', 'Second chat'))
  const second = history.getSnapshot().current.id
  assert.deepEqual(history.getSnapshot().conversations.map((c) => c.id), [second, first])
  return history.open(first).then(async () => {
    assert.equal(history.getSnapshot().current.id, first)
    await history.remove(first)
    assert.equal(history.getSnapshot().current, null)
    assert.deepEqual(JSON.parse(window.localStorage.getItem(DEVICE_KEY)).map((c) => c.id), [second])
    await history.clearAll()
    assert.equal(window.localStorage.getItem(DEVICE_KEY), null)
    assert.deepEqual(history.getSnapshot().conversations, [])
    history.stop()
  })
})

test('guest: chats past the limits are deleted from the device when the chat first opens', (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: NOW })
  const { load, window } = setup()
  const { LumiChatHistory } = load('components/lumi/useLumiHistory.ts')
  const { DEVICE_KEY } = load('services/lumiHistoryService.ts')
  const fresh = conversation('fresh-001', new Date(NOW - DAY).toISOString(), [message('you', 'Recent')])
  const expired = conversation('old-0001', new Date(NOW - 31 * DAY).toISOString(), [message('you', 'Old')])
  window.localStorage.setItem(DEVICE_KEY, JSON.stringify([fresh, expired]))
  const history = new LumiChatHistory('guest')
  history.start()
  history.load()
  assert.deepEqual(history.getSnapshot().conversations.map((c) => c.id), ['fresh-001'])
  assert.deepEqual(JSON.parse(window.localStorage.getItem(DEVICE_KEY)).map((c) => c.id), ['fresh-001'])
})

test('guest: without storage the chat and its list still work in memory', () => {
  const { load, window } = setup()
  window.localStorage.blocked = true
  const { LumiChatHistory } = load('components/lumi/useLumiHistory.ts')
  const history = new LumiChatHistory('guest')
  history.start()
  history.load()
  history.append(message('you', 'One'))
  history.startNew()
  history.append(message('you', 'Two'))
  history.load() // opening the chat again must not wipe what only lives in memory
  assert.deepEqual(history.getSnapshot().conversations.map((c) => c.title).sort(), ['One', 'Two'])
  assert.equal(history.getSnapshot().ready, true)
})

test('guest: chats saved by another tab show up; a late answer lands in its own chat', () => {
  const { load, window } = setup()
  const { LumiChatHistory } = load('components/lumi/useLumiHistory.ts')
  const { DEVICE_KEY } = load('services/lumiHistoryService.ts')
  const history = new LumiChatHistory('guest')
  history.start()
  history.load()
  const chatId = history.addTo(null, message('you', 'Question'))
  history.startNew() // the visitor moves on before the answer arrives
  assert.equal(history.addTo(chatId, message('lumi', 'Answer')), chatId)
  assert.equal(history.getSnapshot().current, null)
  const saved = JSON.parse(window.localStorage.getItem(DEVICE_KEY))
  assert.deepEqual(saved[0].messages.map((m) => m.blocks[0].text), ['Question', 'Answer'])
  // A chat that was deleted takes no answers.
  assert.equal(history.addTo('deleted-0001', message('lumi', 'Late')), null)
  // Another tab saves a chat: the list follows.
  const other = conversation('tab-two-01', new Date().toISOString(), [message('you', 'From tab two')])
  window.localStorage.setItem(DEVICE_KEY, JSON.stringify([other, ...saved]))
  window.fire('storage', { key: DEVICE_KEY })
  assert.deepEqual(history.getSnapshot().conversations.map((c) => c.id).sort(), [chatId, 'tab-two-01'].sort())
  // Duplicate message ids get a new one (they are the screen's keys).
  const twice = message('lumi', 'Same id')
  history.addTo(chatId, twice)
  history.addTo(chatId, twice)
  const ids = JSON.parse(window.localStorage.getItem(DEVICE_KEY)).find((c) => c.id === chatId).messages.map((m) => m.id)
  assert.equal(new Set(ids).size, ids.length)
})

test('"Sent" turns to "Seen" as soon as Lumi adds anything after it, saved in the same write', () => {
  const { load, window } = setup()
  const { LumiChatHistory } = load('components/lumi/useLumiHistory.ts')
  const { DEVICE_KEY } = load('services/lumiHistoryService.ts')
  const history = new LumiChatHistory('guest')
  history.start()
  history.load()
  const chatId = history.addTo(null, message('you', 'One', { status: 'sent' }))
  history.addTo(chatId, message('you', 'Two', { status: 'sent' }))
  assert.deepEqual(history.currentNow().messages.map((m) => m.status), ['sent', 'sent'])
  const storage = window.localStorage
  const setItem = storage.setItem
  let writes = 0
  storage.setItem = (...args) => {
    writes += 1
    return setItem.apply(storage, args)
  }
  history.addTo(chatId, message('lumi', 'Answer'))
  assert.equal(writes, 1)
  assert.deepEqual(history.currentNow().messages.map((m) => m.status), ['seen', 'seen', undefined])
  assert.deepEqual(JSON.parse(storage.getItem(DEVICE_KEY))[0].messages.map((m) => m.status), ['seen', 'seen', undefined])
  // The next question is "Sent" again until Lumi's next message; earlier ones stay "Seen".
  history.addTo(chatId, message('you', 'Three', { status: 'sent' }))
  assert.deepEqual(history.currentNow().messages.map((m) => m.status), ['seen', 'seen', undefined, 'sent'])
  // An answer arriving in that chat after the visitor moved to another marks only its own chat.
  history.startNew()
  const second = history.addTo(null, message('you', 'Elsewhere', { status: 'sent' }))
  assert.notEqual(second, chatId)
  history.addTo(chatId, message('lumi', 'Late answer'))
  assert.deepEqual(history.currentNow().messages.map((m) => m.status), ['sent'])
  return history.open(chatId).then(() => {
    assert.deepEqual(history.currentNow().messages.map((m) => m.status), ['seen', 'seen', undefined, 'seen', undefined])
  })
})

// ---------------------------------------------------------------------------
// useLumiHistory: the store for customers (account)
// ---------------------------------------------------------------------------

function accountHistory(t, options = {}) {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'], now: NOW })
  const env = setup({ signedIn: 'ann@example.com', ...options })
  const { LumiChatHistory } = env.load('components/lumi/useLumiHistory.ts')
  const history = new LumiChatHistory('account:ann@example.com')
  history.start()
  return { ...env, history }
}

test('account: one save for a question and its answer, a moment later; the whole chat is sent', async (t) => {
  const { history, backend } = accountHistory(t)
  history.load()
  await settle()
  assert.equal(history.getSnapshot().ready, true)
  assert.equal(history.getSnapshot().store, 'account')
  history.append(message('you', 'Hello'))
  history.append(message('lumi', 'Hi there'))
  assert.equal(backend.of('PUT').length, 0)
  t.mock.timers.tick(800)
  await settle()
  const puts = backend.of('PUT')
  assert.equal(puts.length, 1)
  const id = history.getSnapshot().current.id
  assert.equal(puts[0].url, `/chat/conversations/${id}`)
  assert.deepEqual(Object.keys(puts[0].body), ['title', 'messages', 'createdAt'])
  assert.equal(puts[0].body.messages.length, 2)
  assert.equal(puts[0].body.title, 'Hello')
  assert.equal(backend.chats.get(id).messages.length, 2)
})

test('account: when the backend is down the chat keeps working and the save is retried quietly', async (t) => {
  const { history, backend } = accountHistory(t)
  backend.fail = (method) => (method === 'PUT' ? new Error('Network Error') : undefined)
  history.append(message('you', 'Hello'))
  t.mock.timers.tick(800)
  await settle()
  assert.equal(backend.of('PUT').length, 1)
  // A new message tries again soon; after that the pauses grow (2 s, 5 s, 15 s …).
  history.append(message('lumi', 'Hi'))
  assert.equal(history.getSnapshot().current.messages.length, 2)
  t.mock.timers.tick(800)
  await settle()
  assert.equal(backend.of('PUT').length, 2)
  t.mock.timers.tick(4_999)
  await settle()
  assert.equal(backend.of('PUT').length, 2) // no tight loop
  t.mock.timers.tick(1)
  await settle()
  assert.equal(backend.of('PUT').length, 3)
  backend.fail = () => undefined
  t.mock.timers.tick(15_000)
  await settle()
  assert.equal(backend.of('PUT').length, 4)
  const id = history.getSnapshot().current.id
  assert.equal(backend.chats.get(id).messages.length, 2)
  const sent = backend.of('PUT').length
  t.mock.timers.tick(120_000)
  await settle()
  assert.equal(backend.of('PUT').length, sent) // nothing more to send
})

test('account: a refused save is not retried; saves are never sent for someone else', async (t) => {
  const { history, backend, auth } = accountHistory(t)
  backend.fail = (method) => (method === 'PUT' ? httpError(400) : undefined)
  history.append(message('you', 'Hello'))
  await history.flush()
  t.mock.timers.tick(120_000)
  await settle()
  assert.equal(backend.of('PUT').length, 1)
  backend.fail = () => undefined
  auth.session = { email: 'someone-else@example.com', username: 'x' }
  history.append(message('lumi', 'Hi'))
  await history.flush()
  assert.equal(backend.of('PUT').length, 1)
  auth.session = null // signed out
  await history.flush()
  assert.equal(backend.of('PUT').length, 1)
})

test('account: closing the chat sends at once; the page being hidden sends with keepalive', async (t) => {
  const { history, backend, window } = accountHistory(t)
  history.append(message('you', 'Hello'))
  await history.flush() // what useLumiHistory does when the panel closes
  assert.equal(backend.of('PUT').length, 1)
  history.append(message('lumi', 'Hi'))
  window.fire('pagehide')
  await settle()
  const last = backend.of('PUT').at(-1)
  assert.equal(backend.of('PUT').length, 2)
  assert.equal(last.config.adapter, 'fetch')
  assert.equal(last.config.fetchOptions.keepalive, true)
  history.stop()
  assert.equal(window.listeners.pagehide.size, 0)
})

test('account: the list comes from the backend, with unsaved chats here laid over it', async (t) => {
  const { history, backend } = accountHistory(t)
  backend.chats.set('server-001', conversation('server-001', new Date(NOW - DAY).toISOString(), [message('you', 'From my phone')]))
  backend.fail = (method) => (method === 'PUT' ? new Error('offline') : undefined)
  history.append(message('you', 'Typed here'))
  const local = history.getSnapshot().current.id
  history.load()
  await settle()
  const list = history.getSnapshot().conversations
  assert.deepEqual(list.map((c) => c.id), [local, 'server-001'])
  assert.equal(list[1].preview, 'from the server')
  // A failing list keeps what is shown and is read again next time.
  backend.fail = () => httpError(503)
  t.mock.timers.tick(60_000)
  history.load()
  await settle()
  assert.deepEqual(history.getSnapshot().conversations.map((c) => c.id), [local, 'server-001'])
})

test('account: opening a saved chat, a deleted one, and while offline', async (t) => {
  const { history, backend } = accountHistory(t)
  backend.chats.set('server-001', conversation('server-001', new Date(NOW).toISOString(), [message('you', 'Saved question')]))
  backend.chats.set('server-002', conversation('server-002', new Date(NOW - 1000).toISOString(), [message('you', 'Other')]))
  history.load()
  await settle()
  await history.open('server-001')
  assert.equal(history.getSnapshot().current.messages[0].blocks[0].text, 'Saved question')
  backend.chats.delete('server-002') // deleted on another device
  await history.open('server-002')
  assert.equal(history.getSnapshot().current.id, 'server-001')
  assert.deepEqual(history.getSnapshot().conversations.map((c) => c.id), ['server-001'])
  // Continuing a saved chat saves it whole.
  history.append(message('you', 'Follow-up'))
  await history.flush()
  assert.equal(backend.chats.get('server-001').messages.length, 2)
  // Offline: nothing changes, nothing throws.
  backend.chats.set('server-003', conversation('server-003', new Date(NOW).toISOString(), [message('you', 'Third')]))
  backend.fail = () => new Error('offline')
  await history.open('server-003')
  assert.equal(history.getSnapshot().current.id, 'server-001')
})

test('account: after the list is read again, an answer on its way still lands; changed chats are read again', async (t) => {
  const { history, backend } = accountHistory(t)
  history.load()
  await settle()
  const chatId = history.addTo(null, message('you', 'Slow question'))
  await history.flush()
  history.startNew()
  t.mock.timers.tick(60_000)
  history.load() // the list is read again while the answer is still on its way
  await settle()
  assert.equal(history.addTo(chatId, message('lumi', 'Slow answer')), chatId)
  await history.flush()
  assert.equal(backend.chats.get(chatId).messages.length, 2)
  // Changed on another device: opening it reads it again.
  backend.chats.get(chatId).messages.push(message('you', 'From my phone'))
  backend.chats.get(chatId).updatedAt = new Date(Date.now() + 1000).toISOString()
  t.mock.timers.tick(60_000)
  history.load()
  await settle()
  await history.open(chatId)
  assert.equal(history.getSnapshot().current.messages.length, 3)
  // Offline: the copy we have is shown.
  history.startNew()
  t.mock.timers.tick(60_000)
  history.load()
  await settle()
  backend.fail = () => new Error('offline')
  await history.open(chatId)
  assert.equal(history.getSnapshot().current.id, chatId)
  assert.equal(history.getSnapshot().current.messages.length, 3)
})

test('account: delete one, delete all, and a delete that has to wait', async (t) => {
  const { history, backend } = accountHistory(t)
  backend.chats.set('server-001', conversation('server-001', new Date(NOW).toISOString(), [message('you', 'One')]))
  backend.chats.set('server-002', conversation('server-002', new Date(NOW).toISOString(), [message('you', 'Two')]))
  history.load()
  await settle()
  await history.remove('server-001')
  assert.equal(backend.chats.has('server-001'), false)
  backend.fail = (method) => (method === 'DELETE' ? new Error('offline') : undefined)
  await history.clearAll()
  assert.deepEqual(history.getSnapshot().conversations, [])
  history.append(message('you', 'New after clearing'))
  backend.fail = () => undefined
  t.mock.timers.tick(2_000)
  await settle()
  // "Delete all" went first, then the new chat was saved: it survives.
  assert.deepEqual([...backend.chats.values()].map((c) => c.title), ['New after clearing'])
})

// ---------------------------------------------------------------------------
// useLumiChat: the controller
// ---------------------------------------------------------------------------

/** useLumiChat in the open panel. `render()` renders it again with its state (for values read while drawing). */
function chatHook(options = {}) {
  const env = setup(options)
  const { useLumiChat } = env.load('components/lumi/useLumiChat.ts')
  const closed = []
  const props = { open: options.open ?? true, locale: options.locale ?? 'en', onClose: () => closed.push(true) }
  const render = () => env.react.render(() => useLumiChat(props))
  const chat = render()
  env.react.runEffects()
  const messages = () => chat.history.currentNow()?.messages ?? []
  const lastBlocks = () => messages().at(-1).blocks
  return { ...env, chat, render, props, closed, messages, lastBlocks }
}

test('ask: the question, then Lumi\'s blocks and follow-ups; earlier messages go along as history', async () => {
  const { chat, backend, messages, lastBlocks } = chatHook({ signedIn: 'ann@example.com' })
  backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'Better not.' }, { type: 'points', items: ['Soap dulls it.'] }], followUps: ['clean-gold-plated'] })
  await chat.ask('  Can I shower with my jewellery?  ')
  assert.deepEqual(messages().map((m) => m.from), ['you', 'lumi'])
  assert.deepEqual(messages()[0].blocks, [{ type: 'text', text: 'Can I shower with my jewellery?' }])
  assert.deepEqual(lastBlocks().map((b) => b.type), ['text', 'points'])
  assert.deepEqual(messages()[1].followUps, ['clean-gold-plated'])
  assert.deepEqual(backend.of('POST', '/chat')[0].body.history, [])
  await chat.ask('And in the sea?')
  assert.deepEqual(backend.of('POST', '/chat')[1].body.history, [
    { role: 'user', content: 'Can I shower with my jewellery?' },
    { role: 'assistant', content: 'Better not.\nSoap dulls it.' },
  ])
  await chat.ask('   ')
  assert.equal(backend.of('POST', '/chat').length, 2)
  await chat.ask('x'.repeat(400))
  assert.equal(backend.of('POST', '/chat')[2].body.message.length, 300)
})

test('nothing is sent while Lumi is busy', async () => {
  const { chat, backend } = chatHook({ signedIn: 'ann@example.com' })
  backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'Hi' }], followUps: [] })
  await Promise.all([chat.ask('One'), chat.ask('Two'), chat.quick('person'), chat.sendToTeam('m', { name: '', email: '', message: 'Hello there' })])
  assert.equal(backend.of('POST', '/chat').length, 1)
  assert.equal(chat.history.currentNow().messages.length, 2)
})

test('limits, outages and a failed bot check are explained, with the way forward', async () => {
  const guest = chatHook()
  guest.backend.chatReply = () => ({ kind: 'limit', tier: 'visitor' })
  await guest.chat.ask('Hi')
  assert.deepEqual(guest.lastBlocks(), [
    { type: 'notice', tone: 'info', text: 'limitVisitor' },
    { type: 'links', links: [{ title: 'logIn', url: '/login' }, { title: 'quick.person.link', url: '/contact' }] },
  ])
  guest.backend.chatReply = () => ({ kind: 'nonsense' })
  await guest.chat.ask('Hi again')
  assert.deepEqual(guest.lastBlocks(), [
    { type: 'notice', tone: 'warning', text: 'unavailable' },
    { type: 'links', links: [{ title: 'quick.person.link', url: '/contact' }] },
  ])
  guest.backend.fail = () => httpError(403)
  await guest.chat.ask('And again')
  assert.equal(guest.lastBlocks()[0].text, 'botCheck')

  const customer = chatHook({ signedIn: 'ann@example.com' })
  customer.backend.chatReply = () => ({ kind: 'limit', tier: 'customer' })
  await customer.chat.ask('Hi')
  assert.deepEqual(customer.lastBlocks(), [
    { type: 'notice', tone: 'info', text: 'limitAccount' },
    { type: 'links', links: [{ title: 'quick.person.link', url: '/contact' }] },
  ])
})

test('library questions: the visitor\'s words in their language, sent with the question\'s id', async () => {
  const { chat, backend, messages } = chatHook({ signedIn: 'ann@example.com' })
  backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'Measure a ring you own.' }], followUps: [] })
  await chat.askSuggestion('ring-size')
  assert.equal(messages()[0].blocks[0].text, 'lumi.suggestions.ring-size')
  assert.equal(messages()[0].suggestion, 'ring-size')
  assert.equal(backend.of('POST', '/chat')[0].body.suggestion, 'ring-size')
  await chat.askSuggestion('no-such-question')
  assert.equal(backend.of('POST', '/chat').length, 1)
  // "Talk to a person" still opens the form when the backend can't answer.
  backend.chatReply = () => ({ kind: 'unavailable' })
  await chat.askSuggestion('talk-person')
  assert.deepEqual(chat.history.currentNow().messages.at(-1).blocks.map((b) => b.type), ['text', 'messageForm'])
})

test('quick actions for guests: orders need a log-in (no lookup by number); the message form works', async () => {
  const { chat, backend, messages, lastBlocks } = chatHook()
  const loginForOrders = [{ type: 'text', text: 'lumi.ordersLogin' }, { type: 'links', links: [{ title: 'logIn', url: '/login' }] }]
  await chat.quick('track')
  assert.equal(messages()[0].blocks[0].text, 'lumi.actions.track')
  assert.deepEqual(lastBlocks(), loginForOrders)
  await chat.quick('person')
  assert.deepEqual(lastBlocks(), [{ type: 'text', text: 'tools.personIntro' }, { type: 'messageForm' }])
  // Even if an order action reaches a guest, no order is shown: they are asked to log in.
  backend.chatReply = () => ({ kind: 'action', action: { type: 'order_status', orderNumber: 'IWJ1001' } })
  await chat.ask('where is IWJ1001')
  assert.deepEqual(lastBlocks(), loginForOrders)
  assert.equal(backend.of('POST', '/chat').length, 1)
})

test('orders for customers: the latest 5 with a link to all, one order, someone else\'s number, a failure', async () => {
  const { chat, backend, shop, lastBlocks } = chatHook({ signedIn: 'ann@example.com' })
  shop.orders = Array.from({ length: 7 }, (_, i) => order(i + 1))
  await chat.quick('track')
  const [intro, list] = lastBlocks()
  assert.equal(intro.text, 'tools.yourOrders')
  assert.deepEqual(list.orders.map((o) => o.orderNumber), ['IWJ1001', 'IWJ1002', 'IWJ1003', 'IWJ1004', 'IWJ1005'])
  assert.deepEqual(list.more, { title: 'tools.allOrders', url: '/orders' })
  assert.deepEqual(list.orders[0], { id: 'order1', orderNumber: 'IWJ1001', createdAt: shop.orders[0].createdAt, status: 'SHIPPED', total: price(100), currency: 'EUR', itemCount: 1, image: 'https://cdn.example.com/1.jpg' })
  await chat.showOrder('order3')
  const [view] = lastBlocks()
  assert.equal(view.type, 'order')
  assert.equal(view.order.url, '/orders/order3')
  assert.equal(view.order.trackingNumber, 'TRK3')
  backend.chatReply = () => ({ kind: 'action', action: { type: 'order_status', orderNumber: 'iwj 1004' } })
  await chat.ask('status of iwj 1004')
  assert.equal(lastBlocks()[0].order.orderNumber, 'IWJ1004')
  backend.chatReply = () => ({ kind: 'action', action: { type: 'order_status', orderNumber: 'IWJ9999' } })
  await chat.ask('status of IWJ9999')
  assert.equal(lastBlocks()[0].text, 'tools.orderNotYours')
  assert.equal(lastBlocks()[1].type, 'orders')
  shop.orders = shop.orders.slice(0, 2)
  await chat.quick('track')
  assert.equal(lastBlocks()[1].more, undefined)
  shop.orders = []
  await chat.quick('track')
  assert.deepEqual(lastBlocks(), [{ type: 'text', text: 'tools.noOrders' }, { type: 'links', links: [{ title: 'tools.shopNow', url: '/products' }] }])
  shop.ordersFail = true
  await chat.quick('track')
  assert.equal(lastBlocks()[0].text, 'tools.ordersFailed')
})

test('gift cards: the cards we sell (cheapest first) and the customer\'s own balances', async () => {
  const { chat, shop, lastBlocks } = chatHook({ signedIn: 'ann@example.com', locale: 'de' })
  const giftCard = (slug, eur, extra = {}) => ({ id: `id-${slug}`, slug, title: `Gift ${slug}`, availability: true, minPrice: price(eur), variants: [{ title: `€${eur} card`, thumbnail: `https://cdn.example.com/${slug}.jpg` }], ...extra })
  shop.giftProducts = [giftCard('g100', 100), giftCard('g25', 25), giftCard('hidden', 10, { availability: false }), giftCard('none', 5, { variants: [] })]
  shop.myGiftCards = [
    { code: 'IWJ-GIFT-AAAA-1234', balance: 42.5, currency: 'EUR', status: 'ACTIVE' },
    { code: 'IWJ-GIFT-BBBB-5678', balance: 0, currency: 'EUR', status: 'ACTIVE' },
    { code: 'IWJ-GIFT-CCCC-9999', balance: 10, currency: 'EUR', status: 'CANCELLED' },
  ]
  await chat.quick('gifts')
  const blocks = lastBlocks()
  assert.deepEqual(blocks.map((b) => b.type), ['text', 'products', 'text', 'giftBalances', 'links'])
  assert.deepEqual(blocks[1].products.map((p) => [p.productId, p.slug, p.title, p.fixedPrice, p.inStock, p.url]), [
    ['id-g25', 'g25', '€25 card', true, true, '/products/g25'],
    ['id-g100', 'g100', '€100 card', true, true, '/products/g100'],
  ])
  assert.deepEqual(blocks[3].cards, [{ code: '…1234', balance: new Intl.NumberFormat('de', { style: 'currency', currency: 'EUR' }).format(42.5) }])
  assert.deepEqual(blocks[4].links.map((l) => l.url), ['/gift-cards', '/account/gift-cards'])

  const guest = chatHook()
  guest.shop.giftProducts = [giftCard('g50', 50)]
  await guest.chat.quick('gifts')
  assert.deepEqual(guest.lastBlocks().map((b) => b.type), ['text', 'products', 'links'])
})

test('message to the team: a ticket for customers, the contact form for guests; failures say so', async () => {
  const customer = chatHook({ signedIn: 'ann@example.com' })
  await customer.chat.quick('person')
  const form = customer.messages().at(-1)
  assert.equal(form.blocks[0].text, 'tools.personIntroAccount')
  const text = 'My ring arrived scratched, what can I do about it? It was a gift for my sister.'
  assert.equal(await customer.chat.sendToTeam(form.id, { name: '', email: '', message: text }), true)
  assert.deepEqual(customer.shop.tickets, [{ subject: `Chat: ${text.slice(0, 60)}`, category: 'general', priority: 'medium', message: text }])
  assert.equal(customer.messages().find((m) => m.id === form.id).blocks[1].done, true)
  assert.deepEqual(customer.lastBlocks(), [
    { type: 'text', text: 'tools.ticketSent {"id":"TCK-42"}' },
    { type: 'links', links: [{ title: 'tools.myTickets', url: '/tickets' }] },
  ])

  const guest = chatHook()
  await guest.chat.quick('person')
  const guestForm = guest.messages().at(-1)
  guest.shop.sendFails = true
  assert.equal(await guest.chat.sendToTeam(guestForm.id, { name: 'Bo', email: 'bo@example.com', message: 'Hello team' }), false)
  assert.equal(guest.lastBlocks()[0].text, 'tools.sendFailed')
  assert.equal(guest.messages().find((m) => m.id === guestForm.id).blocks[1].done, undefined)
  guest.shop.sendFails = false
  assert.equal(await guest.chat.sendToTeam(guestForm.id, { name: 'Bo', email: 'bo@example.com', message: 'Hello team' }), true)
  assert.deepEqual(guest.shop.contacts, [{ name: 'Bo', email: 'bo@example.com', message: 'Hello team' }])
  assert.deepEqual(guest.lastBlocks(), [{ type: 'text', text: 'tools.sent' }])
})

test('an answer that arrives after the visitor started a new chat goes into the chat it was asked in', async () => {
  const { chat, backend } = chatHook({ signedIn: 'ann@example.com' })
  let release
  backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'Late answer' }], followUps: [] })
  const slow = backend.client.post
  backend.client.post = (...args) => new Promise((resolve) => { release = () => resolve(slow(...args)) })
  const asking = chat.ask('First question')
  await settle()
  const asked = chat.history.currentNow().id
  chat.history.startNew()
  release()
  await asking
  assert.equal(chat.history.currentNow(), null)
  await chat.history.open(asked)
  assert.deepEqual(chat.history.currentNow().messages.map((m) => m.blocks[0].text), ['First question', 'Late answer'])
})

test('bot check: visitors wait for Cloudflare\'s token, send it once and get a fresh one; no token, no question', async (t) => {
  const { chat, backend, lastBlocks } = chatHook({ siteKey: 'site-key' })
  const widgets = []
  window.turnstile = {
    render: (box, options) => {
      widgets.push({ box, options, resets: 0 })
      options.callback(`token-${widgets.length}`)
      return `widget-${widgets.length}`
    },
    reset: () => {
      widgets.at(-1).resets += 1
      widgets.at(-1).options.callback(`token-again-${widgets.at(-1).resets}`)
    },
    remove: () => {},
  }
  chat.botBoxRef.current = { isConnected: true }
  backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'Hi' }], followUps: [] })
  await chat.ask('Hello')
  assert.equal(widgets.length, 1)
  assert.equal(widgets[0].options.appearance, 'interaction-only')
  assert.equal(widgets[0].options.sitekey, 'site-key')
  assert.equal(backend.of('POST', '/chat')[0].body.botToken, 'token-1')
  assert.equal(widgets[0].resets, 1) // a token works once
  await chat.ask('Hello again')
  assert.equal(backend.of('POST', '/chat')[1].body.botToken, 'token-again-1')

  // With a pass from the backend, no token is needed.
  sessionStorage.setItem('iwj-chat-pass', 'pass')
  await chat.ask('Third')
  assert.equal(backend.of('POST', '/chat')[2].body.botToken, undefined)
  sessionStorage.removeItem('iwj-chat-pass')

  // The token expires and Cloudflare never sends another: after ~6 seconds
  // the visitor is told, and nothing is sent.
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'], now: NOW })
  widgets.at(-1).options['expired-callback']()
  window.turnstile.reset = () => {}
  window.turnstile.render = () => 'widget-silent'
  const asking = chat.ask('Fourth')
  for (let i = 0; i < 40; i++) {
    await settle()
    t.mock.timers.tick(200)
  }
  await asking
  assert.equal(backend.of('POST', '/chat').length, 3)
  assert.equal(lastBlocks()[0].text, 'botCheck')
  delete window.turnstile
})

test('bot check script: a failed load is tried again with a fresh tag', async () => {
  const env = setup({ siteKey: 'site-key' })
  const scripts = []
  document.querySelector = () => null
  document.createElement = () => {
    const listeners = {}
    const script = {
      src: '',
      removed: false,
      addEventListener: (type, fn) => { listeners[type] = fn },
      remove: () => { script.removed = true },
      fire: (type) => listeners[type]?.(),
    }
    scripts.push(script)
    return script
  }
  document.head = { appendChild: () => {} }
  const { useLumiChat } = env.load('components/lumi/useLumiChat.ts')
  const chat = useLumiChat({ open: true, locale: 'en', onClose: () => {} })
  chat.botBoxRef.current = { isConnected: true }
  env.react.runEffects() // opening the chat starts loading the check
  await settle()
  assert.equal(scripts.length, 1)
  assert.equal(scripts[0].src, 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit')
  scripts[0].fire('error')
  await settle()
  assert.equal(scripts[0].removed, true)
  env.backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'Hi' }], followUps: [] })
  const asking = chat.ask('Hello')
  await settle()
  assert.equal(scripts.length, 2)
  window.turnstile = { render: (box, options) => { options.callback('token-x'); return 'w1' }, reset: () => {}, remove: () => {} }
  scripts[1].fire('load')
  await asking
  assert.equal(env.backend.of('POST', '/chat')[0].body.botToken, 'token-x')
  env.react.unmount() // closing the chat removes the widget
  delete window.turnstile
})

test('useLumiHistory: guests get the device, customers their account; nothing is kept before the login is known', async () => {
  const guest = setup()
  const { useLumiHistory } = guest.load('components/lumi/useLumiHistory.ts')
  const { DEVICE_KEY } = guest.load('services/lumiHistoryService.ts')
  let history = useLumiHistory({ open: true })
  guest.react.runEffects()
  assert.equal(history.store, 'device')
  history.append(message('you', 'Saved on this device'))
  assert.equal(JSON.parse(guest.window.localStorage.getItem(DEVICE_KEY)).length, 1)
  guest.react.unmount()

  // Signing in: a new store for the account, starting with a new chat.
  guest.auth.session = { email: 'Ann@Example.com', username: 'ann' }
  history = useLumiHistory({ open: true })
  guest.react.runEffects()
  await settle()
  assert.equal(history.store, 'account')
  assert.equal(history.currentNow(), null)
  history.append(message('you', 'Saved to my account'))
  guest.react.unmount() // closing sends what is waiting
  await settle()
  assert.equal(guest.backend.of('PUT').length, 1) // the stored email's case doesn't matter
  assert.equal(JSON.parse(guest.window.localStorage.getItem(DEVICE_KEY)).length, 1) // the guest's chat stays on the device

  // Before the login state is known, chats live in memory only.
  const early = setup()
  early.auth.ready = false
  const hook = early.load('components/lumi/useLumiHistory.ts').useLumiHistory
  const unknown = hook({ open: true })
  early.react.runEffects()
  unknown.append(message('you', 'Too early'))
  assert.equal(unknown.ready, false)
  assert.equal(early.window.localStorage.getItem(DEVICE_KEY), null)
  early.react.unmount()
  await settle()
  assert.equal(early.backend.calls.length, 0)
})

// ---------------------------------------------------------------------------
// useLumiChat: the page being viewed, shopping, the gift finder, feedback
// ---------------------------------------------------------------------------

test('questions carry the product page being viewed; the visitor\'s message is "Sent" until Lumi answers, then "Seen"', async () => {
  const products = { iwjnk0009: shopProduct('iwjnk0009', { title: 'Spilla Necklace' }) }
  const { chat, backend, messages } = chatHook({ signedIn: 'ann@example.com', path: '/de/products/iwjnk0009', products })
  let whileAsking
  backend.chatReply = () => {
    whileAsking = messages().map((m) => m.status)
    return { kind: 'answer', id: 'reply-0001', blocks: [{ type: 'text', text: 'Yes, in rose gold too.' }], followUps: [] }
  }
  await chat.ask('Does it come in rose gold?')
  assert.deepEqual(whileAsking, ['sent'])
  assert.deepEqual(messages().map((m) => [m.from, m.status, m.replyId]), [['you', 'seen', undefined], ['lumi', undefined, 'reply-0001']])
  assert.deepEqual(backend.of('POST', '/chat')[0].body.context, { productSlug: 'iwjnk0009' })
  // An answer without a usable id offers no feedback.
  backend.chatReply = () => ({ kind: 'answer', id: 'short', blocks: [{ type: 'text', text: 'You\'re welcome.' }], followUps: [] })
  await chat.ask('Thanks')
  assert.equal('replyId' in messages().at(-1), false)
  // Unexpected trouble while answering still answers, so the question never stays "Sent".
  backend.chatReply = () => ({ kind: 'action', action: { type: 'talk_to_person' } })
  const addTo = chat.history.addTo
  chat.history.addTo = (chatId, added) => {
    if (added.blocks.some((block) => block.type === 'messageForm')) throw new Error('Broken form')
    return addTo(chatId, added)
  }
  const logged = console.error
  console.error = () => {}
  await chat.ask('Can I talk to someone?')
  console.error = logged
  chat.history.addTo = addTo
  assert.equal(messages().at(-2).status, 'seen')
  assert.deepEqual(messages().at(-1).blocks.map((b) => b.text ?? b.type), ['unavailable', 'links'])

  // Elsewhere, no product goes along.
  const other = chatHook({ signedIn: 'ann@example.com', path: '/de/blogs/care' })
  other.backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'Hi' }], followUps: [] })
  await other.chat.ask('Hello')
  assert.deepEqual(other.backend.of('POST', '/chat')[0].body.context, {})
  assert.equal(other.chat.context, null)
})

test('the product page\'s name and picture load once the chat is open there; asking about it uses its name', async () => {
  const env = chatHook({ path: '/products/iwjnk0009', products: { iwjnk0009: shopProduct('iwjnk0009', { title: 'Spilla Necklace' }) } })
  assert.deepEqual(env.chat.context, { slug: 'iwjnk0009' })
  await settle()
  const shown = env.render()
  assert.deepEqual(shown.context, { slug: 'iwjnk0009', title: 'Spilla Necklace', image: 'https://cdn.example.com/v-yellow.jpg' })
  assert.equal(env.render().context, shown.context) // the same object while nothing changes
  env.backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'The Serafina hoops.' }], followUps: [] })
  await shown.askAboutContext('pairs')
  await env.chat.askAboutContext('size') // drawn before the name had loaded: it is looked up first
  await shown.askAboutContext('price') // not one of the page's questions
  assert.deepEqual(env.backend.of('POST', '/chat').map((call) => [call.body.message, call.body.context]), [
    ['lumi.context.pairs {"title":"Spilla Necklace"}', { productSlug: 'iwjnk0009' }],
    ['lumi.context.size {"title":"Spilla Necklace"}', { productSlug: 'iwjnk0009' }],
  ])
  assert.deepEqual(env.shop.productCalls, [['iwjnk0009', 'en']]) // loaded once
})

test('the page context: nothing loads while the chat is closed; a piece the shop doesn\'t have has none; offline keeps the slug', async () => {
  const closed = chatHook({ path: '/products/iwjnk0009', open: false, products: { iwjnk0009: shopProduct('iwjnk0009') } })
  await settle()
  assert.deepEqual(closed.render().context, { slug: 'iwjnk0009' })
  assert.equal(closed.shop.productCalls.length, 0)

  const gone = chatHook({ path: '/fr/products/old-piece', locale: 'fr' })
  await settle()
  const goneNow = gone.render()
  assert.equal(goneNow.context, null)
  assert.deepEqual(gone.shop.productCalls, [['old-piece', 'fr']])
  await goneNow.askAboutContext('stock')
  assert.equal(gone.backend.of('POST', '/chat').length, 0)

  const offline = chatHook({ path: '/products/iwjnk0009', productsFail: true })
  await settle()
  assert.deepEqual(offline.render().context, { slug: 'iwjnk0009' })
  offline.backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'Yes' }], followUps: [] })
  await offline.chat.askAboutContext('stock')
  const [call] = offline.backend.of('POST', '/chat')
  assert.deepEqual([call.body.message, call.body.context], ['lumi.context.stockThis', { productSlug: 'iwjnk0009' }])
  assert.equal(offline.shop.productCalls.length, 2) // a failed load is tried again
})

test('"Add" on a card shows the product with its colours and sizes; unknown pieces, gift cards and failures are explained', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: NOW })
  const products = { 'cadenza-earrings': shopProduct('cadenza-earrings'), 'gift-50': shopProduct('gift-50', { productType: 'GIFT_CARD' }) }
  const { chat, shop, messages, lastBlocks } = chatHook({ locale: 'de', products })
  await Promise.all([chat.chooseOptions('cadenza-earrings'), chat.chooseOptions('cadenza-earrings')]) // a double tap shows it once
  assert.equal(messages().length, 1)
  assert.equal(messages()[0].from, 'lumi')
  const [block] = lastBlocks()
  assert.equal(block.type, 'product')
  assert.deepEqual([block.product.productId, block.product.slug, block.product.variants.map((v) => v.id)], ['id-cadenza-earrings', 'cadenza-earrings', ['v-yellow', 'v-rose', 'v-white']])
  assert.deepEqual(block.product.colours, [{ key: 'yellow', name: 'lumi.colours.yellow' }, { key: 'rose', name: 'lumi.colours.rose' }, { key: 'white', name: 'lumi.colours.white' }])
  assert.equal(block.product.material, 'lumi.shop.material {"metal":"925 Sterling Silver","finish":"Gold Plating"}')
  assert.deepEqual(shop.productCalls, [['cadenza-earrings', 'de']]) // in the visitor's language
  await chat.chooseOptions('no-such-piece')
  assert.deepEqual(lastBlocks(), [{ type: 'notice', tone: 'info', text: 'lumi.shop.unknownProduct' }])
  await chat.chooseOptions('gift-50')
  assert.deepEqual(lastBlocks(), [{ type: 'text', text: 'lumi.shop.giftCardPage' }, { type: 'links', links: [{ title: 'lumi.product.view', url: '/products/gift-50' }] }])
  await chat.chooseOptions('Not a slug')
  assert.deepEqual(lastBlocks(), [{ type: 'text', text: 'lumi.shop.whichProduct' }])
  // Kept for a minute (stock stays fresh), then loaded again.
  await chat.chooseOptions('cadenza-earrings')
  assert.equal(shop.productCalls.filter(([slug]) => slug === 'cadenza-earrings').length, 1)
  t.mock.timers.tick(60_000)
  await chat.chooseOptions('cadenza-earrings')
  assert.equal(shop.productCalls.filter(([slug]) => slug === 'cadenza-earrings').length, 2)
  shop.productsFail = true
  await chat.chooseOptions('another-piece')
  assert.deepEqual(lastBlocks(), [{ type: 'notice', tone: 'warning', text: 'lumi.shop.loadFailed' }, { type: 'links', links: [{ title: 'lumi.product.view', url: '/products/another-piece' }] }])
})

test('add to bag: the store\'s addToCart with the exact choice (guests too), then a confirmation; one request per item at a time', async () => {
  const { chat, redux, messages, lastBlocks } = chatHook({ products: { 'cadenza-earrings': shopProduct('cadenza-earrings') } })
  const choice = { productId: 'id-cadenza-earrings', slug: 'cadenza-earrings', variantId: 'v-yellow', size: 0.25, title: 'Cadenza Earrings', variantTitle: 'Yellow Gold', sizeLabel: '0.25 ct', image: 'https://cdn.example.com/y.jpg', price: price(249) }
  assert.deepEqual(await Promise.all([chat.addToBag(choice), chat.addToBag(choice)]), [true, true])
  assert.deepEqual(redux.thunks('addToCart').map((a) => a.payload), [{ productId: 'id-cadenza-earrings', quantity: 1, variantId: 'v-yellow', size: 0.25 }])
  assert.equal(messages().length, 1)
  // The bag's own price for the line (the server's), with what the card showed.
  assert.deepEqual(lastBlocks(), [{ type: 'cartAdded', item: { title: 'Cadenza Earrings', variantTitle: 'Yellow Gold', sizeLabel: '0.25 ct', image: 'https://cdn.example.com/y.jpg', price: price(111), quantity: 1 } }])
  // A one-size colour: no size is sent; the bag's placeholder picture is not shown.
  assert.equal(await chat.addToBag({ ...choice, variantId: 'v-white', variantTitle: 'White Gold', size: undefined, sizeLabel: undefined, image: undefined, quantity: 2 }), true)
  assert.deepEqual(redux.thunks('addToCart').at(-1).payload, { productId: 'id-cadenza-earrings', quantity: 2, variantId: 'v-white' })
  assert.deepEqual(lastBlocks()[0].item, { title: 'Cadenza Earrings', variantTitle: 'White Gold', price: price(111), quantity: 2 })
  // Once the product is loaded here, a sized colour without a size is caught before anything is sent.
  await chat.chooseOptions('cadenza-earrings')
  assert.equal(await chat.addToBag({ ...choice, size: undefined }), false)
  assert.deepEqual(lastBlocks(), [{ type: 'notice', tone: 'info', text: 'lumi.shop.chooseSize' }])
  // The shop refuses (sold out, offline) or nothing was chosen: said so, false.
  redux.server.fail.add('addToCart')
  assert.equal(await chat.addToBag(choice), false)
  assert.deepEqual(lastBlocks(), [{ type: 'notice', tone: 'warning', text: 'lumi.shop.addFailed' }])
  assert.equal(await chat.addToBag({ ...choice, productId: '' }), false)
  assert.equal(redux.thunks('addToCart').length, 3)
  assert.ok(messages().every((m) => m.from === 'lumi')) // no visitor message: the tap speaks for itself
})

test('a new guest\'s first add creates their bag first (one for two quick adds), so the piece is not lost', async () => {
  const guest = chatHook()
  const ring = { productId: 'p-ring', slug: 'ring', variantId: 'v-ring', size: 52, title: 'Ring', price: price(100) }
  const chain = { productId: 'p-chain', slug: 'chain', variantId: 'v-chain', title: 'Chain', price: price(80) }
  assert.deepEqual(await Promise.all([guest.chat.addToBag(ring), guest.chat.addToBag(chain)]), [true, true])
  assert.deepEqual(guest.redux.dispatched.map((a) => a.thunk), ['fetchCart', 'addToCart', 'addToCart'])
  // Once the browser keeps the bag's id (the shop stores it when it reads the bag), adds go straight in.
  guest.window.localStorage.setItem('iwj_guest_cart_id', 'cart-1')
  assert.equal(await guest.chat.addToBag({ ...ring, size: 54 }), true)
  assert.deepEqual(guest.redux.dispatched.map((a) => a.thunk), ['fetchCart', 'addToCart', 'addToCart', 'addToCart'])

  // The bag can't be created (offline): nothing is added, and the visitor is told.
  const offline = chatHook()
  offline.redux.server.fail.add('fetchCart')
  assert.equal(await offline.chat.addToBag(ring), false)
  assert.deepEqual(offline.redux.thunks('addToCart'), [])
  assert.deepEqual(offline.lastBlocks(), [{ type: 'notice', tone: 'warning', text: 'lumi.shop.addFailed' }])

  // Customers' bags belong to their account.
  const customer = chatHook({ signedIn: 'ann@example.com' })
  assert.equal(await customer.chat.addToBag(ring), true)
  assert.deepEqual(customer.redux.dispatched.map((a) => a.thunk), ['addToCart'])
})

test('buy now: closes the chat and opens the single-item checkout, exactly like the product page', async () => {
  const { chat, page, closed, lastBlocks } = chatHook({ path: '/de/products/cadenza-earrings', products: { 'cadenza-earrings': shopProduct('cadenza-earrings') } })
  await settle() // the page's product is loaded: its size measurement goes along
  const choice = { productId: 'id-cadenza-earrings', slug: 'cadenza-earrings', variantId: 'v-yellow', size: 0.5, title: 'Cadenza Earrings', variantTitle: 'Yellow Gold', sizeLabel: '0.5 ct', price: price(349) }
  chat.buyNow(choice)
  const draft = {
    item: { id: 'id-cadenza-earrings-v-yellow-0.5', productId: 'id-cadenza-earrings', variantId: 'v-yellow', title: 'Cadenza Earrings', variantTitle: 'Yellow Gold', thumbnail: 'https://cdn.example.com/v-yellow.jpg', price: price(349), quantity: 1, size: 0.5, sizeMeasurement: 'CT' },
    returnPath: '/de/products/cadenza-earrings',
  }
  assert.equal(closed.length, 1)
  assert.deepEqual(page.drafts, [draft])
  assert.deepEqual(page.navigations, [{ to: '/checkout?source=single', options: { state: { source: 'single', draft } } }])
  // A sized colour without its size: asked to choose, and the chat stays open.
  chat.buyNow({ ...choice, size: undefined })
  assert.deepEqual([closed.length, page.navigations.length], [1, 1])
  assert.deepEqual(lastBlocks(), [{ type: 'notice', tone: 'info', text: 'lumi.shop.chooseSize' }])
  // A product not loaded here goes as chosen (the checkout checks it again), with the card's picture.
  chat.buyNow({ ...choice, slug: 'elsewhere', productId: 'p2', variantId: 'v9', size: undefined, image: 'https://cdn.example.com/card.jpg', quantity: 3 })
  assert.deepEqual(page.drafts.at(-1).item, { id: 'p2-v9', productId: 'p2', variantId: 'v9', title: 'Cadenza Earrings', variantTitle: 'Yellow Gold', thumbnail: 'https://cdn.example.com/card.jpg', price: price(349), quantity: 3 })
  assert.equal(closed.length, 2)
  chat.buyNow({ ...choice, variantId: '' })
  assert.equal(closed.length, 2)
})

test('wishlist: guests are asked to log in; customers save and remove through the store, and the heart follows', async () => {
  const login = [{ type: 'notice', tone: 'info', text: 'lumi.shop.wishlistLogin' }, { type: 'links', links: [{ title: 'logIn', url: '/login' }] }]
  const guest = chatHook()
  await guest.chat.toggleWishlist({ productId: 'id-x', slug: 'x' })
  assert.deepEqual(guest.lastBlocks(), login)
  assert.equal(guest.redux.dispatched.length, 0)
  assert.equal(guest.chat.isWishlisted('id-x'), false)

  const { chat, redux, render, shop, lastBlocks } = chatHook({ signedIn: 'ann@example.com' })
  await chat.toggleWishlist({ productId: 'id-x', slug: 'x' })
  assert.deepEqual(redux.dispatched.map((a) => a.thunk), ['fetchWishlist', 'addToWishlist'])
  assert.deepEqual(lastBlocks(), [{ type: 'text', text: 'lumi.shop.wishlistSaved' }])
  assert.equal(render().isWishlisted('id-x'), true)
  assert.equal(render().isWishlisted(''), false)
  await chat.toggleWishlist({ productId: 'id-x', slug: 'x' })
  assert.deepEqual(redux.thunks('removeWishlistItem').map((a) => a.payload), ['saved-1'])
  assert.deepEqual(lastBlocks(), [{ type: 'text', text: 'lumi.shop.wishlistRemoved' }])
  assert.equal(render().isWishlisted('id-x'), false)
  // A double tap changes it once.
  await Promise.all([chat.toggleWishlist({ productId: 'id-x', slug: 'x' }), chat.toggleWishlist({ productId: 'id-x', slug: 'x' })])
  assert.equal(redux.thunks('addToWishlist').length, 2)
  // A card without the id is found by its slug.
  shop.products.y = shopProduct('y')
  await chat.toggleWishlist({ productId: '', slug: 'y' })
  assert.equal(redux.thunks('addToWishlist').at(-1).payload, 'id-y')
  // The shop refuses: said so.
  redux.server.fail.add('removeWishlistItem')
  await chat.toggleWishlist({ productId: 'id-y', slug: 'y' })
  assert.deepEqual(lastBlocks(), [{ type: 'notice', tone: 'warning', text: 'lumi.shop.wishlistFailed' }])
  assert.equal(render().isWishlisted('id-y'), true)
})

test('quick actions: the bag (loaded first when needed), the wishlist and the gift finder', async () => {
  const guest = chatHook()
  await guest.chat.quick('bag')
  assert.equal(guest.messages()[0].blocks[0].text, 'lumi.actions.bag')
  assert.deepEqual(guest.lastBlocks(), [{ type: 'bag' }])
  assert.equal(guest.redux.dispatched.length, 0) // a guest without a bag has nothing to load (asking would create one)
  guest.window.localStorage.setItem('iwj_guest_cart_id', 'cart-1')
  await guest.chat.quick('bag')
  assert.deepEqual(guest.redux.dispatched.map((a) => a.thunk), ['fetchCart'])
  await guest.chat.quick('bag') // already in the store
  assert.equal(guest.redux.dispatched.length, 1)
  guest.redux.state.cart.status = 'failed'
  guest.redux.server.fail.add('fetchCart')
  await guest.chat.quick('bag')
  assert.deepEqual(guest.lastBlocks(), [{ type: 'notice', tone: 'warning', text: 'lumi.shop.bagFailed' }, { type: 'links', links: [{ title: 'lumi.shop.openBag', url: '/cart' }] }])
  await guest.chat.quick('wishlist')
  assert.equal(guest.lastBlocks()[0].text, 'lumi.shop.wishlistLogin')

  const customer = chatHook({ signedIn: 'ann@example.com' })
  await customer.chat.quick('bag')
  await customer.chat.quick('wishlist')
  assert.deepEqual(customer.redux.dispatched.map((a) => a.thunk), ['fetchCart', 'fetchWishlist'])
  assert.deepEqual(customer.lastBlocks(), [{ type: 'wishlist' }])
  customer.redux.state.wishlist.status = 'failed'
  customer.redux.server.fail.add('fetchWishlist')
  await customer.chat.quick('wishlist')
  assert.deepEqual(customer.lastBlocks(), [{ type: 'notice', tone: 'warning', text: 'lumi.shop.wishlistLoadFailed' }, { type: 'links', links: [{ title: 'lumi.shop.openWishlist', url: '/wishlist' }] }])
  await customer.chat.quick('giftFinder')
  assert.equal(customer.messages().at(-2).blocks[0].text, 'lumi.actions.giftFinder')
  assert.deepEqual(customer.lastBlocks(), [{ type: 'giftFinder', step: 0, answers: {} }])
  // Every visitor message got its answer.
  assert.ok(customer.messages().filter((m) => m.from === 'you').every((m) => m.status === 'seen'))
  await customer.chat.quick('dance')
  assert.equal(customer.messages().length, 8)
})

test('gift finder: one question at a time, then Lumi searches exactly the answers, in the visitor\'s own words', async () => {
  const { chat, backend, messages, lastBlocks } = chatHook({ signedIn: 'ann@example.com' })
  chat.startGiftFinder()
  chat.startGiftFinder() // a second tap doesn't stack another
  assert.equal(messages().length, 1)
  const finderId = messages()[0].id
  const finder = () => messages().find((m) => m.id === finderId).blocks[0]
  await chat.answerGiftFinder(finderId, { recipient: 'partner' })
  assert.deepEqual(finder(), { type: 'giftFinder', step: 1, answers: { recipient: 'partner' } })
  await chat.answerGiftFinder(finderId, { occasion: 'birthday' })
  await chat.answerGiftFinder(finderId, { budget: 'under100', recipient: 'boss' })
  assert.deepEqual(finder(), { type: 'giftFinder', step: 3, answers: { recipient: 'partner', occasion: 'birthday', budget: 'under100' } })
  assert.equal(backend.of('POST', '/chat').length, 0)
  backend.chatReply = () => ({ kind: 'answer', id: 'reply-gift-1', tool: 'find_products', source: 'tool', blocks: [{ type: 'text', text: 'Here are 2 of our necklaces:' }, { type: 'products', products: [card('a'), card('b')] }], followUps: [] })
  await chat.answerGiftFinder(finderId, { type: 'necklaces' })
  assert.deepEqual(finder(), { type: 'giftFinder', step: 3, answers: { recipient: 'partner', occasion: 'birthday', budget: 'under100', type: 'necklaces' }, done: true })
  const [call] = backend.of('POST', '/chat')
  assert.deepEqual(call.body.intent, { tool: 'find_products', categories: ['necklaces'], maxPrice: 100, sort: 'popular', count: 8 })
  // The budget in the visitor's currency (euros here).
  const pieces = { item: 'lumi.gift.summary.item.necklaces', budget: 'lumi.gift.summary.budget.under100 {"amount":"€100","to":"€100"}', occasion: 'lumi.gift.summary.for.partner.birthday' }
  assert.equal(call.body.message, `lumi.gift.summary.text ${JSON.stringify(pieces)}`)
  const [summary, picks] = messages().slice(-2)
  assert.deepEqual([summary.from, summary.status, summary.blocks[0].text], ['you', 'seen', call.body.message])
  assert.deepEqual([picks.replyId, picks.blocks.map((b) => b.type)], ['reply-gift-1', ['text', 'products']])
  // Finished: answering again changes nothing; a new finder can start.
  await chat.answerGiftFinder(finderId, { type: 'rings' })
  assert.equal(backend.of('POST', '/chat').length, 1)
  chat.startGiftFinder()
  assert.deepEqual(lastBlocks(), [{ type: 'giftFinder', step: 0, answers: {} }])
  await chat.answerGiftFinder('no-such-message', { recipient: 'mum' })
  assert.deepEqual(lastBlocks(), [{ type: 'giftFinder', step: 0, answers: {} }])
})

test('gift finder: the last answer waits while Lumi is answering something else, then can be tapped again', async () => {
  const { chat, backend, messages } = chatHook({ signedIn: 'ann@example.com' })
  chat.startGiftFinder()
  const finderId = messages()[0].id
  const finder = () => messages().find((m) => m.id === finderId).blocks[0]
  await chat.answerGiftFinder(finderId, { recipient: 'mum', occasion: 'justBecause', budget: 'any' })
  backend.chatReply = () => ({ kind: 'answer', blocks: [{ type: 'text', text: 'Hi' }], followUps: [] })
  const post = backend.client.post
  let release
  backend.client.post = (...args) => new Promise((resolve) => { release = () => resolve(post(...args)) })
  const asking = chat.ask('Something else first')
  await settle()
  await chat.answerGiftFinder(finderId, { type: 'rings' })
  assert.deepEqual(finder(), { type: 'giftFinder', step: 3, answers: { recipient: 'mum', occasion: 'justBecause', budget: 'any', type: 'rings' } })
  release()
  await asking
  backend.client.post = post
  await chat.answerGiftFinder(finderId, { type: 'rings' })
  assert.equal(finder().done, true)
  assert.deepEqual(backend.of('POST', '/chat').at(-1).body.intent, { tool: 'find_products', categories: ['rings'], sort: 'popular', count: 8 })
})

test('backend actions: add to bag shows the options, add to wishlist saves (once), and the bag, wishlist and gift finder open', async () => {
  const products = { 'cadenza-earrings': shopProduct('cadenza-earrings') }
  const { chat, backend, redux, messages, lastBlocks } = chatHook({ signedIn: 'ann@example.com', products })
  const act = (action) => {
    backend.chatReply = () => ({ kind: 'action', id: 'reply-action-1', tool: action.type, source: 'tool', action })
  }
  act({ type: 'add_to_bag', productSlug: 'cadenza-earrings' })
  await chat.ask('Add the Cadenza earrings to my bag')
  assert.equal(lastBlocks()[0].type, 'product')
  assert.equal(lastBlocks()[0].product.productId, 'id-cadenza-earrings')
  act({ type: 'add_to_wishlist', productSlug: 'cadenza-earrings' })
  await chat.ask('Save them to my wishlist')
  assert.deepEqual(lastBlocks(), [{ type: 'text', text: 'lumi.shop.wishlistSaved' }])
  await chat.ask('Save them to my wishlist')
  assert.deepEqual(lastBlocks(), [{ type: 'text', text: 'lumi.shop.wishlistAlready' }])
  assert.deepEqual(redux.thunks('addToWishlist').map((a) => a.payload), ['id-cadenza-earrings'])
  assert.equal(redux.thunks('removeWishlistItem').length, 0) // asking to save never removes
  act({ type: 'add_to_wishlist', productSlug: 'gone-piece' })
  await chat.ask('Save the gone piece')
  assert.deepEqual(lastBlocks(), [{ type: 'notice', tone: 'info', text: 'lumi.shop.unknownProduct' }])
  act({ type: 'add_to_bag' })
  await chat.ask('Add it to my bag')
  assert.deepEqual(lastBlocks(), [{ type: 'text', text: 'lumi.shop.whichProduct' }])
  for (const [type, block] of [['show_bag', { type: 'bag' }], ['show_wishlist', { type: 'wishlist' }], ['gift_finder', { type: 'giftFinder', step: 0, answers: {} }]]) {
    act({ type })
    await chat.ask(`Open ${type}`)
    assert.deepEqual(lastBlocks(), [block])
  }
  // Feedback is for answers: what the website opens carries no reply id.
  assert.equal(messages().some((m) => m.replyId), false)
  assert.ok(messages().filter((m) => m.from === 'you').every((m) => m.status === 'seen'))

  const guest = chatHook({ products })
  guest.backend.chatReply = () => ({ kind: 'action', action: { type: 'add_to_wishlist', productSlug: 'cadenza-earrings' } })
  await guest.chat.ask('Save it')
  assert.equal(guest.lastBlocks()[0].text, 'lumi.shop.wishlistLogin')
})

test('feedback: thumbs on Lumi\'s answers are kept on the message and sent when they change', async () => {
  const { chat, backend, messages } = chatHook({ signedIn: 'ann@example.com' })
  backend.chatReply = () => ({ kind: 'answer', id: 'reply-0001', blocks: [{ type: 'text', text: 'Measure a ring you own.' }], followUps: [] })
  await chat.ask('How do I find my ring size?')
  const [question, reply] = messages()
  await chat.sendFeedback(reply.id, true)
  assert.equal(messages()[1].feedback, 'up')
  await chat.sendFeedback(reply.id, true) // the same again: nothing new to send
  await chat.sendFeedback(reply.id, false)
  assert.equal(messages()[1].feedback, 'down')
  assert.deepEqual(backend.of('POST', '/chat/feedback').map((call) => [call.body.replyId, call.body.helpful]), [['reply-0001', true], ['reply-0001', false]])
  await chat.sendFeedback(question.id, true) // the visitor's own message
  await chat.sendFeedback('no-such-message', true)
  assert.equal(backend.of('POST', '/chat/feedback').length, 2)
  // A failed send keeps the visitor's choice and throws nothing.
  backend.fail = (method, url) => (url === '/chat/feedback' ? httpError(500) : undefined)
  await chat.sendFeedback(reply.id, true)
  assert.equal(messages()[1].feedback, 'up')
})
