export type HomepageShopTarget = {
  category: string;
  collection?: string;
  search?: string;
};

/** Link static homepage artwork to the existing shop filters, never to a
 * mutable product-detail slug. */
export function buildHomepageShopHref(target: HomepageShopTarget): string {
  const params = new URLSearchParams({ category: target.category });

  if (target.collection) params.set("collection", target.collection);
  if (target.search) params.set("search", target.search);

  return `/products?${params.toString()}`;
}
