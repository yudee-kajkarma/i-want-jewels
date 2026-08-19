/**
 * SEO migration redirect map.
 *
 * Source of truth: `docs/seo-migration-tracker.md` (§2 retirements, §3 blog actions).
 * Conflict decisions A–H were settled by the site owner on 2026-08-19.
 *
 * Every entry is a PERMANENT (308) redirect. Destinations were verified to exist in
 * `src/content/resources/en/` before this file was written.
 *
 * DELIBERATELY EXCLUDED — do not add without a decision:
 *   - B37 `best-earrings-for-a-girls-night-out-in-2026`  — §27 L16687 holds it back
 *   - B45 `the-geometric-earrings-vs-classic-hoop-earrings-in-2026` — §46 L23382 holds it
 *   - R6  `what-earrings-to-wear-as-a-wedding-guest` — CANCELLED, page kept alive (conflict H)
 *   - R8  `jewellery-care-guides/valentines-day-jewellery-gifts` — no destination (N6 dropped)
 *   - Product slug→slug redirects (T2) — the map lives in Mongo, not derivable here
 */

/** Locales that carry a URL prefix. English is served from the root. */
const PREFIXED_LOCALES = ['nl', 'de', 'fr', 'it', 'es'] as const

type Redirect = {
  /** Blog slug under `/blogs/`, or a full resource path starting with `/resources/`. */
  from: string
  /** Destination path without locale prefix. */
  to: string
  /** Tracker row id, for auditing against the migration doc. */
  id: string
}

/**
 * §3 — Retired blog URLs. `from` is the slug only; `/blogs/` is added by the builder.
 * 54 of 56 rows: B37 and B45 are on hold (see header).
 */
export const blogRedirects: Redirect[] = [
  // → everyday lab-grown diamond earrings guide (§13)
  { id: 'B1', from: 'the-everyday-diamond-earrings-for-work-in-2026', to: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
  { id: 'B2', from: 'best-everyday-earrings-for-women-2026', to: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
  { id: 'B3', from: 'everyday-office-earrings-in-2026', to: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
  { id: 'B4', from: 'best-office-to-dinner-earrings-2026', to: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
  { id: 'B5', from: 'best-diamond-earrings-for-office', to: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
  { id: 'B6', from: 'how-to-style-diamond-studs-everyday-in-2026', to: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
  { id: 'B7', from: 'how-to-style-medium-diamond-studs-from-day-to-night-in-the-2026', to: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
  { id: 'B8', from: 'how-to-make-classic-diamond-studs-look-more-modern-in-2026', to: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },

  // → travel jewellery guide (§15)
  { id: 'B9', from: 'the-travel-jewellery-for-the-women', to: '/resources/earring-style-guides/travel-jewellery-guide' },
  { id: 'B10', from: 'the-best-travel-friendly-diamond-earrings-in-2026', to: '/resources/earring-style-guides/travel-jewellery-guide' },
  { id: 'B11', from: 'the-travel-friendly-diamond-earrings-in-2026', to: '/resources/earring-style-guides/travel-jewellery-guide' },
  { id: 'B12', from: 'the-travel-jewellery-earrings-you-can-wear-all-day', to: '/resources/earring-style-guides/travel-jewellery-guide' },

  // → what are huggie earrings (§20)
  { id: 'B13', from: 'what-are-huggie-earrings-and-are-they-comfortable-in-2026', to: '/resources/earring-style-guides/what-are-huggie-earrings' },
  { id: 'B14', from: 'the-best-huggie-earrings-for-everyday-wear-in-2026', to: '/resources/earring-style-guides/what-are-huggie-earrings' },

  // → how to style huggie earrings — CONFLICT A resolved
  { id: 'B15', from: 'how-to-style-diamond-huggies-from-morning-to-evening-2026', to: '/resources/earring-style-guides/how-to-style-huggie-earrings' },

  // → hoop vs huggie / stud vs huggie
  { id: 'B16', from: 'huggie-earrings-vs-hoop-earrings-in-2026', to: '/resources/earring-style-guides/hoop-vs-huggie-earrings' },
  { id: 'B17', from: 'the-huggie-earrings-vs-stud-earrings-2026', to: '/resources/earring-style-guides/stud-vs-huggie-earrings' },

  // → how to stack earrings — CONFLICT B resolved
  { id: 'B18', from: 'how-to-style-huggie-earrings-in-theear-stack', to: '/resources/earring-style-guides/how-to-stack-earrings' },

  // → minimalist jewellery styling guide — CONFLICTS C and D resolved
  { id: 'B19', from: 'minimalist-jewellery-capsule-wardrobe', to: '/resources/earring-style-guides/minimalist-jewellery-styling-guide' },
  { id: 'B20', from: 'the-minimalist-jewellery-gifts-for-women', to: '/resources/earring-style-guides/minimalist-jewellery-styling-guide' },
  { id: 'B21', from: 'the-minimalist-huggie-earrings-quiet-luxury-2026', to: '/resources/earring-style-guides/minimalist-jewellery-styling-guide' },

  // → how to style butterfly earrings (§24) — CONFLICT E resolved (B27)
  { id: 'B22', from: 'how-to-style-butterfly-earrings', to: '/resources/earring-style-guides/how-to-style-butterfly-earrings' },
  { id: 'B23', from: 'how-to-style-pave-butterfly-earrings-elegantly-in-2026', to: '/resources/earring-style-guides/how-to-style-butterfly-earrings' },
  { id: 'B24', from: 'gold-butterfly-earrings-how-to-style-every-day', to: '/resources/earring-style-guides/how-to-style-butterfly-earrings' },
  { id: 'B25', from: 'best-butterfly-earrings-for-evening-events-in-the-2026', to: '/resources/earring-style-guides/how-to-style-butterfly-earrings' },
  { id: 'B26', from: 'the-pave-butterfly-earrings-vs-simple-butterfly-earrings', to: '/resources/earring-style-guides/how-to-style-butterfly-earrings' },
  { id: 'B27', from: 'are-butterfly-earrings-too-young', to: '/resources/earring-style-guides/how-to-style-butterfly-earrings' },

  // → bold statement earrings guide (§26)
  { id: 'B28', from: 'how-to-style-statement-earrings-in-the-2026', to: '/resources/earring-style-guides/bold-statement-earrings-guide' },
  { id: 'B29', from: 'the-statement-jewellery-styling-in-2026', to: '/resources/earring-style-guides/bold-statement-earrings-guide' },
  { id: 'B30', from: 'how-to-wear-eye-catching-earrings-without-overdoing-it-2026', to: '/resources/earring-style-guides/bold-statement-earrings-guide' },
  { id: 'B31', from: 'statement-earrings-vs-classic-studs-in-2026', to: '/resources/earring-style-guides/bold-statement-earrings-guide' },
  { id: 'B32', from: 'the-diamond-hoops-vs-statement-earrings-in-the-2026', to: '/resources/earring-style-guides/bold-statement-earrings-guide' },

  // → party earrings guide (§27 approved batch; B37 excluded, still on hold)
  { id: 'B33', from: 'best-statement-earrings-for-black-tie-events-2026', to: '/resources/earring-style-guides/party-earrings-guide' },
  { id: 'B34', from: 'the-gala-jewellery-guide-in-the-2026', to: '/resources/earring-style-guides/party-earrings-guide' },
  { id: 'B35', from: 'cocktail-party-jewellery-ideas-in-the-2026', to: '/resources/earring-style-guides/party-earrings-guide' },
  { id: 'B36', from: 'the-jewellery-to-wear-to-a-formal-dinner-without-looking-overdressed-in-2026', to: '/resources/earring-style-guides/party-earrings-guide' },

  // → date night guide (§37) — CONFLICT F resolved (B38)
  { id: 'B38', from: 'the-best-date-night-earrings', to: '/resources/jewellery-gift-guides/date-night-jewellery-guide' },
  { id: 'B39', from: 'the-elegant-dinner-date-earrings-2026', to: '/resources/jewellery-gift-guides/date-night-jewellery-guide' },
  { id: 'B40', from: 'what-are-the-jewellery-to-wear-to-an-anniversary-dinner', to: '/resources/jewellery-gift-guides/date-night-jewellery-guide' },

  // → dress / neckline guides
  { id: 'B41', from: 'the-earrings-with-black-dress-in-2026', to: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
  { id: 'B42', from: 'what-earrings-to-wear-with-a-silk-dress', to: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
  { id: 'B43', from: 'what-the-earrings-to-wear-with-a-romantic-dres-2026', to: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-sweetheart-neckline' },

  // → geometric earrings — CONFLICT G resolved (blog moves to /resources/)
  { id: 'B44', from: 'how-to-style-geometric-earrings-in-2026', to: '/resources/earring-style-guides/how-to-style-geometric-earrings' },

  // → lab-grown diamond guides (§1)
  { id: 'B46', from: 'the-first-diamond-stud-earrings-2026', to: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
  { id: 'B47', from: 'the-best-first-diamond-earrings-2026', to: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
  { id: 'B48', from: 'the-best-pave-hoop-earrings-everyday-luxury-2026', to: '/resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide' },

  // CONFLICT H resolved "keep both": the guest page survives, so these point AT it
  // (not at the weddings page, which L849 would have required).
  { id: 'B49', from: 'best-diamond-stud-earrings-for-wedding-guests-in-2026', to: '/resources/lab-grown-diamond-guides/what-earrings-to-wear-as-a-wedding-guest' },
  { id: 'B50', from: 'best-wedding-guest-earrings-for-spring-and-summer-weddings', to: '/resources/lab-grown-diamond-guides/what-earrings-to-wear-as-a-wedding-guest' },

  // → gift guides. NOTE: these six destinations still need rewrite copy (§6).
  { id: 'B51', from: 'milestone-birthday-jewellery-gifts-in-the-2026', to: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her' },
  { id: 'B52', from: 'the-luxury-earrings-gift-milestone-birthday', to: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her' },
  { id: 'B53', from: 'the-best-anniversary-diamond-earrings-for-her', to: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her' },
  { id: 'B54', from: 'best-graduation-jewellery-gifts-for-her-2026', to: '/resources/jewellery-gift-guides/graduation-jewellery-gifts' },
  { id: 'B55', from: 'best-classic-jewellery-gifts-for-her-2026', to: '/resources/jewellery-gift-guides/jewellery-gifts-for-her' },
  { id: 'B56', from: 'simple-jewellery-gifts-in-the-2026', to: '/resources/jewellery-gift-guides/jewellery-gifts-for-her' },
]

/**
 * §2 — Retired resource URLs. `from` is a full path.
 * 8 of 10 rows: R6 cancelled, R8 on hold (see header).
 */
export const resourceRedirects: Redirect[] = [
  { id: 'R1', from: '/resources/earring-style-guides/lab-grown-diamond-hoop-earrings-guide', to: '/resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide' },
  { id: 'R2', from: '/resources/earring-style-guides/can-you-wear-lab-grown-diamond-earrings-every-day', to: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
  { id: 'R3', from: '/resources/earring-style-guides/gold-vs-white-vs-rose-gold-diamond-earrings', to: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
  { id: 'R4', from: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks', to: '/resources/earring-style-guides/diamond-ear-stack-ideas' },
  { id: 'R5', from: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts', to: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
  { id: 'R7', from: '/resources/jewellery-care-guides/new-year-jewellery-gifts', to: '/resources/occasion-jewellery-guides/new-year-jewellery-gifts' },
  { id: 'R9', from: '/resources/jewellery-gift-guides/birthday-jewellery-gifts', to: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her' },
  { id: 'R10', from: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts', to: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her' },
]

export type NextRedirect = {
  source: string
  destination: string
  permanent: true
}

/**
 * Expand the tables into Next.js redirect rules.
 *
 * Each entry produces two rules:
 *   1. the English URL at the root      `/blogs/x`            → `/resources/…`
 *   2. all five prefixed locales in one `/:locale(nl|de|…)/…` → `/:locale/resources/…`
 *
 * Legacy English prefixes (`/en`, `/eng`, …) are intentionally NOT listed here.
 * `src/proxy.ts` already 308s them to the root URL, which then matches rule 1.
 * Adding them here would require an unused `:legacy` param that Next.js appends to
 * the destination as a query string — exactly the kind of junk parameter the audit
 * flags elsewhere.
 */
export function buildRedirects(): NextRedirect[] {
  const localeGroup = PREFIXED_LOCALES.join('|')
  const rules: NextRedirect[] = []

  const add = (fromPath: string, to: string) => {
    rules.push({ source: fromPath, destination: to, permanent: true })
    rules.push({
      source: `/:locale(${localeGroup})${fromPath}`,
      destination: `/:locale${to}`,
      permanent: true,
    })
  }

  for (const r of blogRedirects) add(`/blogs/${r.from}`, r.to)
  for (const r of resourceRedirects) add(r.from, r.to)

  return rules
}
