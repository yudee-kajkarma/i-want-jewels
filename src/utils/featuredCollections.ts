export type UmbrellaCollectionGroup = {
    label: string
    members: string[]
}

/** Shown first, in this order; each gathers every collection whose name starts with its prefix. */
export const FEATURED_COLLECTION_UMBRELLAS: Array<{ label: string; prefix: string }> = [
    { label: 'Alessia', prefix: 'alessia' },
    { label: 'Stella', prefix: 'stella' },
    { label: 'Concetta', prefix: 'concetta' },
    { label: 'Aurora', prefix: 'aurora' },
]

/**
 * Every collection the shop has: the featured ones first (those with products),
 * then all the others from the database, A–Z, so a new collection shows up
 * here without a code change.
 */
export function buildCollectionGroups(rawCollections: string[]): UmbrellaCollectionGroup[] {
    const names = Array.from(new Set(rawCollections.map((name) => name.trim()).filter(Boolean)))
    const featured = FEATURED_COLLECTION_UMBRELLAS
        .map(({ label, prefix }) => ({
            label,
            members: names.filter((name) => name.toLowerCase().startsWith(prefix)),
        }))
        .filter((group) => group.members.length > 0)
    const taken = new Set(featured.flatMap((group) => group.members))
    const others = names
        .filter((name) => !taken.has(name))
        .sort((a, b) => a.localeCompare(b))
        .map((name) => ({ label: name, members: [name] }))
    return [...featured, ...others]
}

export function buildCollectionFilterHref(group: UmbrellaCollectionGroup | undefined): string {
    if (!group || group.members.length === 0) {
        return '/products'
    }
    return `/products?collection=${encodeURIComponent(group.members.join(','))}`
}
