/**
 * How many separately sellable items a product represents.
 *
 * A customer buys one metal in one size, so that pair is the real unit — a ring
 * in 3 metals x 2 sizes is 6 things to buy, not 1 product. Variants without
 * sizes count as one. Mirrors the same rule on the API so the label above the
 * grid and the category filter never disagree.
 */
export function sellableCountForProduct(product: {
  variants?: Array<{ sizes?: unknown[] }> | null
}): number {
  const variants = product?.variants ?? []
  if (variants.length === 0) return 1

  return variants.reduce(
    (total, variant) => total + Math.max(1, variant?.sizes?.length ?? 0),
    0,
  )
}
