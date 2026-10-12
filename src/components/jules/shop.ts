import { parseLocalePathname } from '../../i18n/routing'
import type { SingleCheckoutDraft } from '../../types/order'
import type { ProductDetail, ProductVariant } from '../../types/product'
import { minPriceOf, type CurrencyCode, type Price } from '../../utils/price'
import type {
  GiftAnswers,
  GiftBudget,
  GiftOccasion,
  GiftRecipient,
  GiftType,
  JulesBagSelection,
  JulesColourKey,
  JulesPageContext,
  JulesProductDetail,
  JulesSizeOption,
  JulesVariant,
} from './contract'

/**
 * Shopping in the chat, the parts that are plain data: which product page the
 * visitor is on, the shop's product turned into the card Jules shows (colours,
 * sizes, prices and stock all from the shop's own data), the "Buy now"
 * checkout, and the gift finder's answers turned into an exact search. No
 * React and no requests here, so every rule can be tested on its own.
 */

// ---------------------------------------------------------------------------
// Product pages
// ---------------------------------------------------------------------------

/**
 * A product's name in the address ("iwjnk0009", "spilla-necklace"). The shop
 * only makes slugs like this, and it is also what the backend accepts as page
 * context, so anything else is never sent or loaded.
 */
const PRODUCT_SLUG = /^[a-z0-9][a-z0-9-]{0,119}$/

export const isProductSlug = (value: unknown): value is string => typeof value === 'string' && PRODUCT_SLUG.test(value)

/** The slug of the product page in `pathname` ("/products/<slug>", also with a language like "/de/products/<slug>"); null on every other page. */
export function productSlugFromPath(pathname: string): string | null {
  const { pathnameWithoutLocale } = parseLocalePathname(pathname || '/')
  const match = /^\/products\/([^/]+)\/?$/.exec(pathnameWithoutLocale)
  return match && isProductSlug(match[1]) ? match[1] : null
}

// ---------------------------------------------------------------------------
// The shop's product as Jules's product card
// ---------------------------------------------------------------------------

const COLOUR_KEYS: readonly JulesColourKey[] = ['yellow', 'rose', 'white']

/** A variant's colour from its title, read as the backend reads it: "Yellow Gold" → yellow, "Rose Gold" → rose. */
export function colourKeyOf(variantTitle: string): JulesColourKey | undefined {
  const title = variantTitle.trim().toLowerCase()
  return COLOUR_KEYS.find((key) => title.startsWith(key))
}

/** The longest size label the contract allows. */
const SIZE_LABEL_CHARS = 20

/** How a size is shown, as the backend shows it: earrings sized by diamond weight (below 5) in carats, everything else as the number. */
/**
 * A size label in the visitor's language: the number keeps its decimal comma
 * where the language uses one ("0.5 ct" → "0,5 ct" in German); the rest stays.
 */
export function localSizeLabel(label: string, language: string): string {
  return label.replace(/\d+(?:\.\d+)?/, (number) => {
    try {
      return new Intl.NumberFormat(language, { maximumFractionDigits: 2 }).format(Number(number))
    } catch {
      return number
    }
  })
}

export function sizeLabelOf(category: string, size: number): string {
  return (/^earring/i.test(category.trim()) && size < 5 ? `${size} ct` : String(size)).slice(0, SIZE_LABEL_CHARS)
}

/** Pictures come from the shop's storage (https) or the site itself, like everything the chat draws. */
const PICTURE = /^(https?:\/\/[^\s\\]+|\/(?![/\\])[^\s\\]*)$/i

/** A variant's picture for a small card: its cover, else its listing photo, else its first image (the backend's order). */
function variantPicture(variant: ProductVariant): string | undefined {
  return [variant.coverImage, variant.thumbnail, variant.images?.[0]?.src]
    .map((src) => (typeof src === 'string' ? src.trim() : ''))
    .find((src) => PICTURE.test(src))
}

const maxPriceOf = (prices: Price[]): Price => ({
  dol: Math.max(...prices.map((price) => price.dol)),
  eur: Math.max(...prices.map((price) => price.eur)),
  pou: Math.max(...prices.map((price) => price.pou)),
})

/**
 * A variant's sizes with the price and stock of each, in the shop's order.
 * A size without its own price costs the variant's price. Kept even when
 * there is only one, because the bag needs it (as on the product page).
 */
function sizeOptions(variant: ProductVariant, category: string, onSale: boolean): JulesSizeOption[] {
  const options: JulesSizeOption[] = []
  for (const entry of variant.sizes ?? []) {
    if (!Number.isFinite(entry.size) || options.some((option) => option.size === entry.size)) continue
    options.push({
      size: entry.size,
      label: sizeLabelOf(category, entry.size),
      price: entry.price ?? variant.price,
      inStock: onSale && entry.stock > 0,
    })
  }
  return options
}

/** In stock as the product page decides it: a sized variant by its sizes, any other by its stock (unknown stock counts as in stock). */
function variantInStock(variant: ProductVariant, sizes: JulesSizeOption[], onSale: boolean): boolean {
  if (!onSale) return false
  if (sizes.length) return sizes.some((size) => size.inStock)
  return (variant.stock ?? variant.totalStock ?? 1) > 0
}

/** One option per size across all colours (the cheapest price, in stock in any colour), smallest first; empty unless there are two or more. */
function sharedSizes(variants: JulesVariant[]): JulesSizeOption[] {
  const bySize = new Map<number, JulesSizeOption>()
  for (const option of variants.flatMap((variant) => variant.sizes)) {
    const known = bySize.get(option.size)
    bySize.set(option.size, known
      ? { ...known, price: option.price.eur < known.price.eur ? option.price : known.price, inStock: known.inStock || option.inStock }
      : option)
  }
  const sizes = [...bySize.values()].sort((a, b) => a.size - b.size)
  return sizes.length >= 2 ? sizes : []
}

/** Words the card needs in the visitor's language. */
export type ProductWords = {
  /** "Yellow gold", "Roségold" … */
  colour: (key: JulesColourKey) => string
  /** The metal with its finish, e.g. "925 Sterling Silver with Gold Plating". */
  material: (metal: string, finish: string) => string
}

/**
 * The shop's product (as productService loads it by slug) as Jules's product
 * card: every colour with its own id, sizes, prices and stock, so the card
 * can put the exact choice in the bag. Null without an id, a name or a colour
 * that has an id (nothing could go in the bag). `slug` is the one it was
 * loaded by.
 */
export function toJulesProduct(product: ProductDetail, words: ProductWords, slug: string): JulesProductDetail | null {
  const productSlug = isProductSlug(product.slug) ? product.slug : slug
  const title = product.title.trim()
  if (!product.id || !title || !isProductSlug(productSlug)) return null

  const variants: JulesVariant[] = []
  for (const variant of product.variants) {
    if (!variant.id || variants.some((known) => known.id === variant.id)) continue
    // A product taken off sale, or a colour switched off, is shown but sold out.
    const onSale = product.availability !== false && variant.available !== false
    const sizes = sizeOptions(variant, product.category ?? '', onSale)
    const colour = colourKeyOf(variant.title)
    const image = variantPicture(variant)
    variants.push({
      id: variant.id,
      ...(colour ? { colour } : {}),
      title: variant.title.trim() || title,
      ...(image ? { image } : {}),
      price: minPriceOf(sizes.length ? sizes.map((size) => size.price) : [variant.price]),
      inStock: variantInStock(variant, sizes, onSale),
      sizes,
    })
  }
  if (!variants.length) return null

  const prices = variants.flatMap((variant) => (variant.sizes.length ? variant.sizes.map((size) => size.price) : [variant.price]))
  const low = minPriceOf(prices)
  const high = maxPriceOf(prices)
  const colours = [...new Set(variants.map((variant) => variant.colour).filter((key): key is JulesColourKey => key !== undefined))]
  const metal = product.metal?.trim()
  const finish = product.finish?.trim()
  const image = variants.find((variant) => variant.image)?.image

  return {
    productId: product.id,
    slug: productSlug,
    title,
    ...(image ? { image } : {}),
    price: low,
    // One price for every option, as the backend decides it (in euros).
    fixedPrice: low.eur === high.eur,
    url: `/products/${productSlug}`,
    inStock: variants.some((variant) => variant.inStock),
    priceHigh: high,
    colours: colours.map((key) => ({ key, name: words.colour(key) })),
    ...(metal ? { material: finish ? words.material(metal, finish) : metal } : {}),
    sizes: sharedSizes(variants),
    variants,
  }
}

/** The product page as the chat shows it: its name and picture. */
export function pageContextOf(product: ProductDetail, slug: string): JulesPageContext {
  const title = product.title.trim()
  const image = product.variants.map(variantPicture).find((src) => src !== undefined)
  return {
    slug: isProductSlug(product.slug) ? product.slug : slug,
    ...(title ? { title } : {}),
    ...(image ? { image } : {}),
  }
}

// ---------------------------------------------------------------------------
// Bag and checkout
// ---------------------------------------------------------------------------

/** How many to add: a whole number of at least 1 (the default). */
export function bagQuantity(quantity: unknown): number {
  return typeof quantity === 'number' && Number.isSafeInteger(quantity) && quantity >= 1 ? quantity : 1
}

/** One line of the bag: the same product, colour and size. */
export const bagItemKey = (selection: Pick<JulesBagSelection, 'productId' | 'variantId' | 'size'>) =>
  `${selection.productId}:${selection.variantId}:${selection.size ?? ''}`

/** The single-item checkout "Buy now" opens, built exactly as the product page builds it. */
export function checkoutDraft(
  selection: JulesBagSelection,
  page: { returnPath: string; thumbnail: string; sizeMeasurement?: string },
): SingleCheckoutDraft {
  const { productId, variantId, size } = selection
  return {
    item: {
      id: `${productId}-${variantId}${size !== undefined ? `-${size}` : ''}`,
      productId,
      variantId,
      title: selection.title,
      variantTitle: selection.variantTitle ?? '',
      thumbnail: page.thumbnail,
      price: selection.price,
      quantity: bagQuantity(selection.quantity),
      ...(size !== undefined ? { size } : {}),
      ...(page.sizeMeasurement ? { sizeMeasurement: page.sizeMeasurement } : {}),
    },
    returnPath: page.returnPath,
  }
}

// ---------------------------------------------------------------------------
// Gift finder
// ---------------------------------------------------------------------------

/** The finder's four questions, in the order they are asked (the block's `step`). */
export const GIFT_STEPS = ['recipient', 'occasion', 'budget', 'type'] as const
/** The last question's step: a finished finder stays on it. */
export const LAST_GIFT_STEP = GIFT_STEPS.length - 1
/** How many picks Jules shows at the end (a products block holds at most 10). */
export const GIFT_PICKS = 8

const RECIPIENTS: readonly GiftRecipient[] = ['partner', 'mum', 'friend', 'myself']
const OCCASIONS: readonly GiftOccasion[] = ['birthday', 'anniversary', 'wedding', 'justBecause']
const BUDGETS: readonly GiftBudget[] = ['under100', 'from100to200', 'over200', 'any']
const TYPES: readonly GiftType[] = ['earrings', 'necklaces', 'rings', 'bracelets', 'any']

/** The first of `values` the finder offers. */
function choice<T extends string>(allowed: readonly T[], ...values: unknown[]): T | undefined {
  return values.find((value): value is T => typeof value === 'string' && (allowed as readonly string[]).includes(value))
}

/** Answers as they may arrive (from the screen or a saved chat): each value is checked. */
type UncheckedGiftAnswers = { [K in keyof GiftAnswers]?: unknown }

/** New answers laid over the earlier ones; anything the finder doesn't offer is ignored. */
export function mergeGiftAnswers(earlier: UncheckedGiftAnswers, answers: UncheckedGiftAnswers): GiftAnswers {
  const recipient = choice(RECIPIENTS, answers.recipient, earlier.recipient)
  const occasion = choice(OCCASIONS, answers.occasion, earlier.occasion)
  const budget = choice(BUDGETS, answers.budget, earlier.budget)
  const type = choice(TYPES, answers.type, earlier.type)
  return {
    ...(recipient ? { recipient } : {}),
    ...(occasion ? { occasion } : {}),
    ...(budget ? { budget } : {}),
    ...(type ? { type } : {}),
  }
}

/** The question to ask next: the first one without an answer (GIFT_STEPS.length once all are answered). */
export function giftStep(answers: GiftAnswers): number {
  const next = GIFT_STEPS.findIndex((step) => answers[step] === undefined)
  return next < 0 ? GIFT_STEPS.length : next
}

export type CompleteGiftAnswers = Required<GiftAnswers>

export const isCompleteGift = (answers: GiftAnswers): answers is CompleteGiftAnswers => giftStep(answers) === GIFT_STEPS.length

/**
 * A product search the website already knows exactly (POST /api/chat
 * `intent`, the backend's IntentSchema): run without the AI.
 */
export type JulesIntent = {
  tool: 'find_products'
  categories?: Array<Exclude<GiftType, 'any'>>
  sort?: 'cheapest' | 'most_expensive' | 'range' | 'popular'
  minPrice?: number
  maxPrice?: number
  colour?: JulesColourKey
  count?: number
}

/** Budgets in euros, the currency the shop's search works in. */
const BUDGET_RANGES: Record<GiftBudget, Pick<JulesIntent, 'minPrice' | 'maxPrice'>> = {
  under100: { maxPrice: 100 },
  from100to200: { minPrice: 100, maxPrice: 200 },
  over200: { minPrice: 200 },
  any: {},
}

/** The search for the finder's answers: the chosen kind of jewellery in the budget, most popular first. */
export function giftIntent(answers: CompleteGiftAnswers): JulesIntent {
  return {
    tool: 'find_products',
    ...(answers.type !== 'any' ? { categories: [answers.type] } : {}),
    ...BUDGET_RANGES[answers.budget],
    sort: 'popular',
    count: GIFT_PICKS,
  }
}

/**
 * The currency a budget is written in. Budgets are searched in euros; the
 * shop prices pounds the same as euros, so pounds are exact too. Dollars
 * follow a daily rate the website doesn't know, so they stay in euros.
 */
export const budgetCurrency = (currency: CurrencyCode): CurrencyCode => (currency === 'dol' ? 'eur' : currency)

/** Writes a budget's euros as money ("€100", "£100"). */
export type BudgetMoney = (euros: number) => string

/** The amounts a budget's words show ({{amount}}, {{from}}, {{to}}), from the same euros the search uses. */
export function budgetValues(budget: GiftBudget, money: BudgetMoney): Record<string, string> {
  const { minPrice, maxPrice } = BUDGET_RANGES[budget]
  const amount = maxPrice ?? minPrice
  return {
    ...(amount !== undefined ? { amount: money(amount) } : {}),
    ...(minPrice !== undefined ? { from: money(minPrice) } : {}),
    ...(maxPrice !== undefined ? { to: money(maxPrice) } : {}),
  }
}

/** Looks up a text in the visitor's language (keys under the chat's i18n section). */
export type Translate = (key: string, values?: Record<string, string>) => string

/**
 * The visitor's own words for their answers, e.g. "A necklace under £100 for
 * my partner's birthday", put together from short translated pieces, so every
 * language can order them its own way.
 */
export function giftSummary(answers: CompleteGiftAnswers, translate: Translate, money: BudgetMoney): string {
  const item = translate(`jules.gift.summary.item.${answers.type}`)
  const budget = answers.budget === 'any' ? '' : translate(`jules.gift.summary.budget.${answers.budget}`, budgetValues(answers.budget, money))
  const occasion = translate(`jules.gift.summary.for.${answers.recipient}.${answers.occasion}`)
  return translate('jules.gift.summary.text', { item, budget, occasion }).replace(/\s+/g, ' ').trim()
}
