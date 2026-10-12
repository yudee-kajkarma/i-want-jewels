// Navbar collections: the curated /category/<slug> pages and the in-page
// sections on the four parent category pages.
//
// Membership and order come from the product-to-category mapping (10 Oct 2026,
// 60 designs); titles, descriptions, H1s and URLs from the navbar SEO plan.
// Products are listed by their base code (= the product slug, lowercased), so
// every colour variant stays on the one product. Products not found in the live
// catalogue are simply left out of the grid and its JSON-LD.
//
// The words for each page (title, description, H1, intro, section names) live
// per language in ./collectionCopy/<locale>.json; English is the source.

import en from './collectionCopy/en.json'
import de from './collectionCopy/de.json'
import nl from './collectionCopy/nl.json'
import fr from './collectionCopy/fr.json'
import it from './collectionCopy/it.json'
import es from './collectionCopy/es.json'

export type CollectionCopy = {
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string[]
  sections?: Record<string, { name: string; description: string }>
}

export type ProductCopy = {
  metaTitle: string
  metaDescription: string
  h1: string
  material: string
}

type CopyFile = {
  /** Breadcrumb words for JSON-LD (Home, Shop). */
  crumbs: { home: string; shop: string }
  collections: Record<string, CollectionCopy>
  products: Record<string, ProductCopy>
}

const copyByLocale: Record<string, CopyFile> = { en, de, nl, fr, it, es }

export function getCopy(locale: string): CopyFile {
  return copyByLocale[locale] ?? en
}

/** A related-collection chip: `key` is its label in common.json → header.megaMenu. */
export type CollectionLink = { key: string; to: string }

type CollectionDef = {
  slug: string
  /** Parent page slug, for the breadcrumb trail (Home › Shop › parent › page). */
  parent?: string
  /** Curated pages list these products; parent pages list their backend category. */
  codes?: string[]
  sections?: Array<{ anchor: string; codes: string[] }>
  related?: CollectionLink[]
}

export type Collection = Omit<CollectionCopy, 'sections'> & {
  slug: string
  parent?: { name: string; slug: string }
  codes?: string[]
  sections: Array<{ anchor: string; name: string; description: string; codes: string[] }>
  related: CollectionLink[]
}

const studEarrings = [
  'IWJER0009', // Cadenza Earrings
  'IWJER0019', // Ottavia Studs
  'IWJER0023', // Aurora Studs Earrings
  'IWJER0026', // Letizia Earrings
  'IWJER0027', // Alessia Studs Earrings
  'IWJER0001', // Alidi Farfalla Earrings
  'IWJER0011', // Aereo Earrings
  'IWJER0012', // Allegra Earrings
  'IWJER0014', // Serafina Earrings
  'IWJER0015', // Teschio Earrings
  'IWJER0016', // Triad Aura Diamond
  'IWJER0017', // Orsola Earrings
  'IWJER0018', // Celestina Earrings
  'IWJER0020', // Ottavia Ombretta Earrings
  'IWJER0024', // Amadea Earrings
]

const hoopHuggieEarrings = [
  'IWJER0002', // Piazza Earrings
  'IWJER0003', // Amadea Huggie Earrings
  'IWJER0004', // Laluce Earrings
  'IWJER0005', // Pavé Hoops Earrings
  'IWJER0006', // Lusso Earrings
  'IWJER0010', // T Froza Earrings
  'IWJER0013', // Farfalla Earrings
]

const dropEarrings = [
  'IWJER0006', // Lusso Earrings
  'IWJER0013', // Farfalla Earrings
  'IWJER0020', // Ottavia Ombretta Earrings
  'IWJER0021', // Aurora Long Earrings
  'IWJER0022', // Aurora Short
]

const everydayEarrings = [
  'IWJER0002', // Piazza Earrings
  'IWJER0003', // Amadea Huggie Earrings
  'IWJER0004', // Laluce Earrings
  'IWJER0005', // Pavé Hoops Earrings
  'IWJER0009', // Cadenza Earrings
  'IWJER0010', // T Froza Earrings
  'IWJER0011', // Aereo Earrings
  'IWJER0014', // Serafina Earrings
  'IWJER0016', // Triad Aura Diamond
  'IWJER0017', // Orsola Earrings
  'IWJER0018', // Celestina Earrings
  'IWJER0019', // Ottavia Studs
  'IWJER0020', // Ottavia Ombretta Earrings
  'IWJER0022', // Aurora Short
  'IWJER0023', // Aurora Studs Earrings
  'IWJER0025', // Luna Curve Earrings
  'IWJER0026', // Letizia Earrings
  'IWJER0027', // Alessia Studs Earrings
]

const everydayStackingRings = [
  'IWJRN0001', // Renata Ring
  'IWJRN0003', // Ilaria Ring
  'IWJRN0004', // Laluce Ring
  'IWJRN0002', // Attraverso Ring
  'IWJRN0005', // Alessia Ring
  'IWJRN0006', // Stella Ring
  'IWJRN0009', // Amadea Ring
  'IWJRN0010', // Ondina Ring
]

const statementRings = [
  'IWJRN0007', // Tiziana Ring
  'IWJRN0008', // Lucrezia Ring
]

const everydayPendants = [
  'IWJNK0002', // Stella Necklace
  'IWJNK0004', // Aurora Singola Necklace
  'IWJNK0006', // Amadea Necklace
  'IWJNK0007', // Renata Necklace
  'IWJNK0008', // Fiorella Necklace
  'IWJNK0010', // Aereo Necklace
  'IWJNK0011', // Alessia Necklace
  'IWJNK0012', // Serafina Necklace
  'IWJNK0013', // Marina Vertigo Necklace
  'IWJNK0014', // Marina Hori Necklace
  'IWJNK0015', // Ondina Necklace
  'IWJNK0017', // Vittoria Necklace
]

const layeringYNecklaces = [
  'IWJNK0003', // Aurora Sette Necklace
  'IWJNK0004', // Aurora Singola Necklace
  'IWJNK0005', // Aurora Y Necklace
  'IWJNK0007', // Renata Necklace
  'IWJNK0008', // Fiorella Necklace
  'IWJNK0010', // Aereo Necklace
  'IWJNK0011', // Alessia Necklace
  'IWJNK0013', // Marina Vertigo Necklace
  'IWJNK0014', // Marina Hori Necklace
  'IWJNK0015', // Ondina Necklace
  'IWJNK0016', // Zola Necklace
  'IWJNK0017', // Vittoria Necklace
  'IWJNK0018', // Elettra Necklace
  'IWJNK0019', // Letizia Necklace
]

const chainBracelets = [
  'IWJBR0001', // Stella Bracelet
  'IWJBR0002', // Spilla Bracelet
  'IWJBR0003', // Serafina Bracelet
  'IWJBR0004', // Elettra Bracelet
  'IWJBR0005', // Aurora Bracelet
]

const anniversaryGifts = [
  'IWJER0001', // Alidi Farfalla Earrings
  'IWJER0002', // Piazza Earrings
  'IWJER0003', // Amadea Huggie Earrings
  'IWJER0004', // Laluce Earrings
  'IWJER0005', // Pavé Hoops Earrings
  'IWJER0006', // Lusso Earrings
  'IWJER0009', // Cadenza Earrings
  'IWJER0010', // T Froza Earrings
  'IWJER0011', // Aereo Earrings
  'IWJER0012', // Allegra Earrings
  'IWJER0013', // Farfalla Earrings
  'IWJER0014', // Serafina Earrings
  'IWJER0017', // Orsola Earrings
  'IWJER0018', // Celestina Earrings
  'IWJER0019', // Ottavia Studs
  'IWJER0020', // Ottavia Ombretta Earrings
  'IWJER0021', // Aurora Long Earrings
  'IWJER0023', // Aurora Studs Earrings
  'IWJER0026', // Letizia Earrings
  'IWJER0027', // Alessia Studs Earrings
  'IWJRN0001', // Renata Ring
  'IWJRN0004', // Laluce Ring
  'IWJRN0005', // Alessia Ring
  'IWJRN0006', // Stella Ring
  'IWJRN0007', // Tiziana Ring
  'IWJRN0008', // Lucrezia Ring
  'IWJRN0010', // Ondina Ring
  'IWJNK0001', // Marcella Necklace
  'IWJNK0002', // Stella Necklace
  'IWJNK0003', // Aurora Sette Necklace
  'IWJNK0004', // Aurora Singola Necklace
  'IWJNK0005', // Aurora Y Necklace
  'IWJNK0007', // Renata Necklace
  'IWJNK0008', // Fiorella Necklace
  'IWJNK0009', // Spilla Necklace
  'IWJNK0013', // Marina Vertigo Necklace
  'IWJNK0019', // Letizia Necklace
  'IWJBN0001', // Alessia Bracelet
]

const partyEvening = [
  'IWJER0001', // Alidi Farfalla Earrings
  'IWJER0002', // Piazza Earrings
  'IWJER0005', // Pavé Hoops Earrings
  'IWJER0006', // Lusso Earrings
  'IWJER0010', // T Froza Earrings
  'IWJER0012', // Allegra Earrings
  'IWJER0013', // Farfalla Earrings
  'IWJER0015', // Teschio Earrings
  'IWJER0016', // Triad Aura Diamond
  'IWJER0020', // Ottavia Ombretta Earrings
  'IWJER0021', // Aurora Long Earrings
  'IWJER0022', // Aurora Short
  'IWJER0024', // Amadea Earrings
  'IWJNK0001', // Marcella Necklace
  'IWJNK0003', // Aurora Sette Necklace
  'IWJNK0005', // Aurora Y Necklace
  'IWJNK0006', // Amadea Necklace
  'IWJNK0009', // Spilla Necklace
  'IWJNK0016', // Zola Necklace
  'IWJNK0017', // Vittoria Necklace
  'IWJRN0005', // Alessia Ring
  'IWJRN0006', // Stella Ring
  'IWJRN0007', // Tiziana Ring
  'IWJRN0008', // Lucrezia Ring
  'IWJRN0010', // Ondina Ring
  'IWJBN0001', // Alessia Bracelet
  'IWJBR0002', // Spilla Bracelet
]

const graduationGifts = [
  'IWJER0002', // Piazza Earrings
  'IWJER0003', // Amadea Huggie Earrings
  'IWJER0004', // Laluce Earrings
  'IWJER0005', // Pavé Hoops Earrings
  'IWJER0009', // Cadenza Earrings
  'IWJER0010', // T Froza Earrings
  'IWJER0011', // Aereo Earrings
  'IWJER0014', // Serafina Earrings
  'IWJER0017', // Orsola Earrings
  'IWJER0018', // Celestina Earrings
  'IWJER0019', // Ottavia Studs
  'IWJER0020', // Ottavia Ombretta Earrings
  'IWJER0022', // Aurora Short
  'IWJER0023', // Aurora Studs Earrings
  'IWJER0025', // Luna Curve Earrings
  'IWJER0026', // Letizia Earrings
  'IWJER0027', // Alessia Studs Earrings
  'IWJRN0001', // Renata Ring
  'IWJRN0002', // Attraverso Ring
  'IWJRN0003', // Ilaria Ring
  'IWJRN0004', // Laluce Ring
  'IWJRN0005', // Alessia Ring
  'IWJNK0002', // Stella Necklace
  'IWJNK0003', // Aurora Sette Necklace
  'IWJNK0004', // Aurora Singola Necklace
  'IWJNK0005', // Aurora Y Necklace
  'IWJNK0006', // Amadea Necklace
  'IWJNK0007', // Renata Necklace
  'IWJNK0008', // Fiorella Necklace
  'IWJNK0010', // Aereo Necklace
  'IWJNK0011', // Alessia Necklace
  'IWJNK0012', // Serafina Necklace
  'IWJNK0013', // Marina Vertigo Necklace
  'IWJNK0014', // Marina Hori Necklace
  'IWJNK0016', // Zola Necklace
  'IWJNK0017', // Vittoria Necklace
  'IWJNK0019', // Letizia Necklace
  'IWJBR0001', // Stella Bracelet
  'IWJBR0002', // Spilla Bracelet
  'IWJBR0003', // Serafina Bracelet
  'IWJBR0005', // Aurora Bracelet
  'IWJER0001', // Alidi Farfalla Earrings
  'IWJER0012', // Allegra Earrings
  'IWJER0013', // Farfalla Earrings
  'IWJER0021', // Aurora Long Earrings
  'IWJER0024', // Amadea Earrings
  'IWJNK0001', // Marcella Necklace
]

const birthdayGifts = [
  'IWJER0001', // Alidi Farfalla Earrings
  'IWJER0002', // Piazza Earrings
  'IWJER0003', // Amadea Huggie Earrings
  'IWJER0004', // Laluce Earrings
  'IWJER0005', // Pavé Hoops Earrings
  'IWJER0006', // Lusso Earrings
  'IWJER0009', // Cadenza Earrings
  'IWJER0010', // T Froza Earrings
  'IWJER0011', // Aereo Earrings
  'IWJER0012', // Allegra Earrings
  'IWJER0013', // Farfalla Earrings
  'IWJER0014', // Serafina Earrings
  'IWJER0016', // Triad Aura Diamond
  'IWJER0017', // Orsola Earrings
  'IWJER0018', // Celestina Earrings
  'IWJER0019', // Ottavia Studs
  'IWJER0020', // Ottavia Ombretta Earrings
  'IWJER0021', // Aurora Long Earrings
  'IWJER0022', // Aurora Short
  'IWJER0023', // Aurora Studs Earrings
  'IWJER0024', // Amadea Earrings
  'IWJER0025', // Luna Curve Earrings
  'IWJER0026', // Letizia Earrings
  'IWJER0027', // Alessia Studs Earrings
  'IWJRN0001', // Renata Ring
  'IWJRN0002', // Attraverso Ring
  'IWJRN0003', // Ilaria Ring
  'IWJRN0004', // Laluce Ring
  'IWJRN0005', // Alessia Ring
  'IWJRN0006', // Stella Ring
  'IWJRN0007', // Tiziana Ring
  'IWJRN0008', // Lucrezia Ring
  'IWJRN0009', // Amadea Ring
  'IWJRN0010', // Ondina Ring
  'IWJNK0001', // Marcella Necklace
  'IWJNK0002', // Stella Necklace
  'IWJNK0003', // Aurora Sette Necklace
  'IWJNK0004', // Aurora Singola Necklace
  'IWJNK0005', // Aurora Y Necklace
  'IWJNK0006', // Amadea Necklace
  'IWJNK0007', // Renata Necklace
  'IWJNK0008', // Fiorella Necklace
  'IWJNK0009', // Spilla Necklace
  'IWJNK0010', // Aereo Necklace
  'IWJNK0011', // Alessia Necklace
  'IWJNK0012', // Serafina Necklace
  'IWJNK0013', // Marina Vertigo Necklace
  'IWJNK0014', // Marina Hori Necklace
  'IWJNK0015', // Ondina Necklace
  'IWJNK0016', // Zola Necklace
  'IWJNK0017', // Vittoria Necklace
  'IWJNK0018', // Elettra Necklace
  'IWJNK0019', // Letizia Necklace
  'IWJBN0001', // Alessia Bracelet
  'IWJBR0001', // Stella Bracelet
  'IWJBR0002', // Spilla Bracelet
  'IWJBR0003', // Serafina Bracelet
  'IWJBR0004', // Elettra Bracelet
  'IWJBR0005', // Aurora Bracelet
]

const christmasGifts = [
  'IWJNK0001', // Marcella Necklace
  'IWJNK0002', // Stella Necklace
  'IWJNK0003', // Aurora Sette Necklace
  'IWJNK0004', // Aurora Singola Necklace
  'IWJNK0005', // Aurora Y Necklace
  'IWJNK0006', // Amadea Necklace
  'IWJNK0007', // Renata Necklace
  'IWJNK0008', // Fiorella Necklace
  'IWJNK0009', // Spilla Necklace
  'IWJNK0010', // Aereo Necklace
  'IWJNK0011', // Alessia Necklace
  'IWJNK0012', // Serafina Necklace
  'IWJNK0013', // Marina Vertigo Necklace
  'IWJNK0014', // Marina Hori Necklace
  'IWJNK0015', // Ondina Necklace
  'IWJNK0016', // Zola Necklace
  'IWJNK0017', // Vittoria Necklace
  'IWJNK0018', // Elettra Necklace
  'IWJNK0019', // Letizia Necklace
  'IWJBN0001', // Alessia Bracelet
  'IWJBR0001', // Stella Bracelet
  'IWJBR0002', // Spilla Bracelet
  'IWJBR0003', // Serafina Bracelet
  'IWJBR0004', // Elettra Bracelet
  'IWJBR0005', // Aurora Bracelet
  'IWJER0001', // Alidi Farfalla Earrings
  'IWJER0002', // Piazza Earrings
  'IWJER0003', // Amadea Huggie Earrings
  'IWJER0004', // Laluce Earrings
  'IWJER0005', // Pavé Hoops Earrings
  'IWJER0006', // Lusso Earrings
  'IWJER0009', // Cadenza Earrings
  'IWJER0010', // T Froza Earrings
  'IWJER0011', // Aereo Earrings
  'IWJER0012', // Allegra Earrings
  'IWJER0013', // Farfalla Earrings
  'IWJER0014', // Serafina Earrings
  'IWJER0016', // Triad Aura Diamond
  'IWJER0017', // Orsola Earrings
  'IWJER0018', // Celestina Earrings
  'IWJER0019', // Ottavia Studs
  'IWJER0020', // Ottavia Ombretta Earrings
  'IWJER0021', // Aurora Long Earrings
  'IWJER0022', // Aurora Short
  'IWJER0023', // Aurora Studs Earrings
  'IWJER0024', // Amadea Earrings
  'IWJER0025', // Luna Curve Earrings
  'IWJER0026', // Letizia Earrings
  'IWJER0027', // Alessia Studs Earrings
  'IWJRN0001', // Renata Ring
  'IWJRN0002', // Attraverso Ring
  'IWJRN0003', // Ilaria Ring
  'IWJRN0004', // Laluce Ring
  'IWJRN0005', // Alessia Ring
  'IWJRN0006', // Stella Ring
  'IWJRN0007', // Tiziana Ring
  'IWJRN0008', // Lucrezia Ring
  'IWJRN0009', // Amadea Ring
  'IWJRN0010', // Ondina Ring
]

const earringLinks: CollectionLink[] = [
  { key: 'studEarrings', to: '/category/stud-earrings' },
  { key: 'hoopHuggieEarrings', to: '/category/hoop-huggie-earrings' },
  { key: 'dropEarrings', to: '/category/drop-earrings' },
  { key: 'everydayEarrings', to: '/category/everyday-earrings' },
]

const giftLinks: CollectionLink[] = [
  { key: 'anniversaryGifts', to: '/category/anniversary-gifts' },
  { key: 'partyEvening', to: '/category/party-evening-jewellery' },
  { key: 'graduationGifts', to: '/category/graduation-gifts' },
  { key: 'birthdayGifts', to: '/category/birthday-gifts' },
  { key: 'christmasGifts', to: '/category/christmas-jewellery-gifts' },
]

const except = (links: CollectionLink[], slug: string) => links.filter((link) => link.to !== `/category/${slug}`)

const definitions: CollectionDef[] = [
  // Parent pages (existing backend categories)
  { slug: 'earrings', related: earringLinks },
  {
    slug: 'rings',
    sections: [
      { anchor: 'everyday-stacking-rings', codes: everydayStackingRings },
      { anchor: 'statement-rings', codes: statementRings },
    ],
  },
  {
    slug: 'necklaces',
    sections: [
      { anchor: 'everyday-pendants', codes: everydayPendants },
      { anchor: 'layering-y-necklaces', codes: layeringYNecklaces },
    ],
  },
  {
    slug: 'bracelets',
    sections: [{ anchor: 'chain-bracelets', codes: chainBracelets }],
    related: [{ key: 'alessiaBangle', to: '/products/iwjbn0001' }],
  },

  // Earring collections
  { slug: 'stud-earrings', parent: 'earrings', codes: studEarrings, related: except(earringLinks, 'stud-earrings') },
  { slug: 'hoop-huggie-earrings', parent: 'earrings', codes: hoopHuggieEarrings, related: except(earringLinks, 'hoop-huggie-earrings') },
  { slug: 'everyday-earrings', parent: 'earrings', codes: everydayEarrings, related: except(earringLinks, 'everyday-earrings') },
  { slug: 'drop-earrings', parent: 'earrings', codes: dropEarrings, related: except(earringLinks, 'drop-earrings') },

  // Gifts & occasions
  { slug: 'anniversary-gifts', codes: anniversaryGifts, related: except(giftLinks, 'anniversary-gifts') },
  { slug: 'party-evening-jewellery', codes: partyEvening, related: except(giftLinks, 'party-evening-jewellery') },
  { slug: 'graduation-gifts', codes: graduationGifts, related: except(giftLinks, 'graduation-gifts') },
  { slug: 'birthday-gifts', codes: birthdayGifts, related: except(giftLinks, 'birthday-gifts') },
  { slug: 'christmas-jewellery-gifts', codes: christmasGifts, related: except(giftLinks, 'christmas-jewellery-gifts') },
]

const definitionsBySlug = new Map(definitions.map((definition) => [definition.slug, definition]))

// A language missing a page (or a section) falls back to the English words.
function pageCopy(slug: string, locale: string): CollectionCopy {
  return getCopy(locale).collections[slug] ?? en.collections[slug as keyof typeof en.collections]
}

export function getCollection(slug: string, locale: string): Collection | undefined {
  const definition = definitionsBySlug.get(slug.trim().toLowerCase())
  if (!definition) return undefined

  const copy = pageCopy(definition.slug, locale)
  const englishSections = pageCopy(definition.slug, 'en').sections ?? {}

  return {
    ...copy,
    slug: definition.slug,
    parent: definition.parent ? { name: pageCopy(definition.parent, locale).h1, slug: definition.parent } : undefined,
    codes: definition.codes,
    sections: (definition.sections ?? []).map((section) => ({
      ...(copy.sections?.[section.anchor] ?? englishSections[section.anchor]),
      anchor: section.anchor,
      codes: section.codes,
    })),
    related: definition.related ?? [],
  }
}

/** Curated pages (not backed by a backend category), for the sitemap. */
export const curatedCollectionSlugs = definitions
  .filter((definition) => definition.codes)
  .map((definition) => definition.slug)
