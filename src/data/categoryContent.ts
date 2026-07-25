// SEO copy for the /category/[category] landing pages, keyed by category slug.
// Categories without an entry fall back to buildGenericCategoryContent, so new
// backend categories get a working page without a frontend change.

export type CategoryContent = {
  metaTitle: string
  metaDescription: string
  heading: string
  intro: string[]
}

const categoryContentBySlug: Record<string, CategoryContent> = {
  necklaces: {
    metaTitle: 'Lab Grown Diamond Necklaces | I Want Jewels',
    metaDescription:
      'Shop lab grown diamond necklaces in 925 sterling silver with rhodium or 14kt gold plating. Tennis necklaces, pendants and everyday pieces, shipped from Antwerp.',
    heading: 'Lab Grown Diamond Necklaces',
    intro: [
      'From delicate everyday pendants to statement tennis necklaces, our necklace collection is crafted in 925 sterling silver with rhodium or 14kt gold plating and set with lab-grown diamonds — chemically and optically identical to mined diamonds, at a fraction of the environmental impact.',
      'Every necklace is designed in Antwerp, one of the world’s great diamond cities, and made for daily wear: hypoallergenic materials, secure clasps and finishes that hold their brilliance. Import duties for EU and UK orders are already covered.',
    ],
  },
  earrings: {
    metaTitle: 'Lab Grown Diamond Earrings | I Want Jewels',
    metaDescription:
      'Shop lab grown diamond earrings — studs, hoops, huggies and butterfly designs in 925 sterling silver with rhodium or 14kt gold plating. Designed in Antwerp.',
    heading: 'Lab Grown Diamond Earrings',
    intro: [
      'Studs for every day, huggies for the ear stack, hoops and butterfly designs for the evenings that call for more sparkle. Each pair is crafted in 925 sterling silver with rhodium or 14kt gold plating and set with lab-grown diamonds that carry the same fire and brilliance as mined stones.',
      'Our earrings are hypoallergenic and made for all-day comfort, whether you are choosing a first pair of diamond studs or a gift for someone who deserves the real thing. Designed in Antwerp and shipped with EU and UK duties already paid.',
    ],
  },
  bracelets: {
    metaTitle: 'Lab Grown Diamond Tennis Bracelets & Bracelets | I Want Jewels',
    metaDescription:
      'Shop lab grown diamond tennis bracelets and bracelets in 925 sterling silver with rhodium or 14kt gold plating. Classic, secure and made for everyday wear.',
    heading: 'Lab Grown Diamond Bracelets',
    intro: [
      'The tennis bracelet is the piece every jewellery collection is built around, and ours are set with lab-grown diamonds in 925 sterling silver with rhodium or 14kt gold plating — the classic line of light, made attainable.',
      'Each bracelet is finished with a secure clasp and sized for comfortable daily wear. Designed in Antwerp, hypoallergenic, and shipped across Europe, the UK and the US with EU and UK import duties already covered.',
    ],
  },
  rings: {
    metaTitle: 'Lab Grown Diamond Rings | I Want Jewels',
    metaDescription:
      'Shop lab grown diamond rings in 925 sterling silver with rhodium or 14kt gold plating. Everyday stacking rings and statement designs, designed in Antwerp.',
    heading: 'Lab Grown Diamond Rings',
    intro: [
      'From minimal stacking bands to statement solitaire styles, our rings are crafted in 925 sterling silver with rhodium or 14kt gold plating and set with lab-grown diamonds — real diamonds, grown above ground.',
      'Every ring is designed in Antwerp for everyday wear: hypoallergenic materials, comfortable profiles and finishes made to keep their shine. EU and UK import duties are already paid, so the price you see is the price you pay.',
    ],
  },
  'gift-cards': {
    metaTitle: 'Jewellery Gift Cards | I Want Jewels',
    metaDescription:
      'Give the gift of choice with an I Want Jewels gift card. Redeemable across our lab grown diamond jewellery collections — necklaces, earrings, bracelets and rings.',
    heading: 'Jewellery Gift Cards',
    intro: [
      'Not sure which piece they would choose? An I Want Jewels gift card lets them decide — redeemable across our full collection of lab-grown diamond necklaces, earrings, bracelets and rings.',
      'Delivered digitally and ready to use straight away, it is the simplest way to give fine jewellery without guessing a size or a style.',
    ],
  },
}

export function getCategoryContent(slug: string, displayName: string): CategoryContent {
  return categoryContentBySlug[slug] ?? buildGenericCategoryContent(displayName)
}

function buildGenericCategoryContent(displayName: string): CategoryContent {
  return {
    metaTitle: `${displayName} | I Want Jewels`,
    metaDescription: `Shop ${displayName.toLowerCase()} from I Want Jewels — lab grown diamond jewellery in 925 sterling silver with rhodium or 14kt gold plating, designed in Antwerp.`,
    heading: displayName,
    intro: [
      `Explore our ${displayName.toLowerCase()}, crafted in 925 sterling silver with rhodium or 14kt gold plating and set with lab-grown diamonds. Designed in Antwerp and made for everyday wear.`,
    ],
  }
}
