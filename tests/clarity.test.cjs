const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
function compiled(file) { return ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText }
function load({ role, id } = {}) {
  const scripts = [], session = new Map()
  const window = { location: { pathname: '/cart' }, sessionStorage: { getItem: key => session.get(key), setItem: (key, value) => session.set(key, value) } }
  const document = { querySelector: () => scripts[0] ?? null, createElement: () => ({}), head: { appendChild: script => scripts.push(script) } }
  const ctx = { exports: {}, window, document, process: { env: { NEXT_PUBLIC_CLARITY_PROJECT_ID: id } }, require: () => ({ getStoredAuthSession: () => role ? { role } : null }) }
  vm.runInNewContext(compiled('src/lib/clarity.ts'), ctx)
  return { api: ctx.exports, window, scripts }
}
test('one project script, early queued events, denied storage and no personal payloads', () => {
  const { api, window, scripts } = load({ id: 'company123' })
  assert.equal(api.trackClarity('cart_viewed'), true)
  api.initializeClarity()
  api.trackClarity('add_to_cart')
  assert.equal(scripts.length, 1)
  assert.equal(scripts[0].src, 'https://www.clarity.ms/tag/company123')
  assert.equal(window.clarity.q[0][0], 'consentv2')
  assert.equal(window.clarity.q[0][1].analytics_Storage, 'denied')
  assert.equal(window.clarity.q.filter(x => x[0] === 'event').length, 2)
  assert.ok(window.clarity.q.filter(x => x[0] === 'event').every(x => x.length === 2))
})
test('admins and auth pages do not initialize custom tracking', () => {
  const admin = load({ role: 'ADMIN' })
  assert.equal(admin.api.trackClarity('cart_viewed'), false)
  assert.equal(admin.scripts.length, 0)
  const guest = load()
  guest.window.location.pathname = '/en/reset-password'
  assert.equal(guest.api.trackClarity('cart_viewed'), false)
})
test('paid confirmation is required; purchase and failed-attempt duplicates suppressed', () => {
  const { api, window } = load()
  const order = { id: 'order1', paymentMethod: 'ONLINE', paymentStatus: 'pending', sessionId: 'attempt1', email: 'private@example.com' }
  api.trackOrderPayment(order)
  assert.equal(window.clarity, undefined)
  api.trackOrderPayment({ ...order, paymentStatus: 'paid' })
  api.trackOrderPayment({ ...order, paymentStatus: 'paid' })
  api.trackOrderPayment({ ...order, paymentStatus: 'failed' })
  api.trackOrderPayment({ ...order, paymentStatus: 'failed' })
  api.trackOrderPayment({ ...order, paymentStatus: 'failed', sessionId: 'attempt2' })
  assert.equal(window.clarity.q.filter(x => x[1] === 'purchase_completed').length, 1)
  assert.equal(window.clarity.q.filter(x => x[1] === 'payment_failed').length, 2)
  assert.ok(!JSON.stringify(window.clarity.q).includes(order.email))
})
test('SDK errors never interrupt shopping', () => {
  const { api, window } = load()
  window.clarity = () => { throw Error('SDK failure') }
  assert.equal(api.trackClarity('add_to_cart'), false)
})
function cart({ mutationFails = false, refreshFails = false } = {}) {
  const toolkit = require('@reduxjs/toolkit'), events = []
  const mutate = async () => { if (mutationFails) throw Error('Rejected mutation') }
  const ctx = { exports: {}, require: name => name === '@reduxjs/toolkit' ? toolkit : name.endsWith('/clarity') ? { trackClarity: event => events.push(event) } : { addCartItem: mutate, deleteCartItem: mutate, updateCartItem: mutate, clearCartItems: mutate, getCart: async () => { if (refreshFails) throw Error('Refresh failed'); return { items: [] } } } }
  vm.runInNewContext(compiled('src/store/cartSlice.ts'), ctx)
  const store = toolkit.configureStore({ reducer: { cart: ctx.exports.default } })
  return { api: ctx.exports, store, events }
}
test('cart refresh is silent; successful customer actions trigger their events', async () => {
  const { api, store, events } = cart()
  await store.dispatch(api.fetchCart())
  await store.dispatch(api.addToCart({ productId: 'p', variantId: 'v', quantity: 1 }))
  await store.dispatch(api.changeCartItemQuantity({ itemId: 'i', quantity: 2 }))
  await store.dispatch(api.removeCartItem({ productId: 'p', variantId: 'v' }))
  await store.dispatch(api.clearCart())
  assert.deepEqual(events, ['add_to_cart', 'cart_quantity_updated', 'remove_from_cart', 'cart_cleared'])
})
test('rejected mutation has no event; successful add counts even if refresh fails', async () => {
  for (const mutationFails of [true, false]) {
    const { api, store, events } = cart({ mutationFails, refreshFails: true })
    await store.dispatch(api.addToCart({ productId: 'p', variantId: 'v', quantity: 1 }))
    assert.deepEqual(events, mutationFails ? [] : ['add_to_cart'])
  }
})
