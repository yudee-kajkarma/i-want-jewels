// URL slugs for the /category/[category] landing pages, derived from the
// backend's category names (e.g. "Necklace" -> "necklaces", "Gift card" ->
// "gift-cards"). Follows the same plural display convention as product cards.

const pluralDisplayLabels: Record<string, string> = {
  bracelet: 'Bracelets',
  earring: 'Earrings',
  necklace: 'Necklaces',
  ring: 'Rings',
  'gift card': 'Gift Cards',
}

export function categoryDisplayName(category: string): string {
  const normalized = category.trim().toLowerCase()
  const known = pluralDisplayLabels[normalized]

  if (known) {
    return known
  }

  // Unknown categories still get a readable plural title, so newly added
  // backend categories work without a frontend change.
  const titleCased = category
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return titleCased.toLowerCase().endsWith('s') ? titleCased : `${titleCased}s`
}

export function categorySlug(category: string): string {
  return categoryDisplayName(category)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function resolveCategoryFromSlug(
  slug: string,
  categories: string[],
): string | null {
  const normalizedSlug = slug.trim().toLowerCase()

  return categories.find((category) => categorySlug(category) === normalizedSlug) ?? null
}
