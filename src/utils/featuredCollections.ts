export type UmbrellaCollectionGroup = {
    label: string
    members: string[]
}

export const FEATURED_COLLECTION_UMBRELLAS: Array<{ label: string; prefix: string }> = [
    { label: 'Alessia', prefix: 'alessia' },
    { label: 'Stella', prefix: 'stella' },
    { label: 'Concetta', prefix: 'concetta' },
    { label: 'Aurora', prefix: 'aurora' },
]

export function buildCollectionGroups(rawCollections: string[]): UmbrellaCollectionGroup[] {
    return FEATURED_COLLECTION_UMBRELLAS
        .map(({ label, prefix }) => ({
            label,
            members: rawCollections.filter((name) =>
                name.trim().toLowerCase().startsWith(prefix),
            ),
        }))
        .filter((group) => group.members.length > 0)
}

export function buildCollectionFilterHref(group: UmbrellaCollectionGroup | undefined): string {
    if (!group || group.members.length === 0) {
        return '/products'
    }
    return `/products?collection=${encodeURIComponent(group.members.join(','))}`
}
