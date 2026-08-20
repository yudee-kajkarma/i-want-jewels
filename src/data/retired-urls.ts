/**
 * Retired URL manifest — the permanent record of every page taken out of the listings.
 *
 * WHY THIS FILE EXISTS
 * The 62 URLs below were retired by the SEO migration. Their entries were NOT deleted from
 * the source files — they were COMMENTED OUT, so any of them can be brought back by
 * deleting its marker line and stripping the leading "// " from the block beneath it.
 *
 * HOW TO FIND ONE
 * Each commented entry is preceded by a marker line:
 *
 *     // ─── SEO-RETIRED <id> · <url> → <destination> · see src/data/retired-urls.ts ───
 *
 * `line` below is that marker's line number at the time of writing (2026-08-19).
 * Line numbers drift as files are edited — the reliable lookup is always:
 *
 *     grep -n "SEO-RETIRED ${id}" <commentedIn>
 *
 * WHERE THE REDIRECTS LIVE
 * Every `url` here has a matching 308 in src/data/redirects.ts, wired into next.config.ts.
 * If you un-retire a URL you MUST also remove its redirect, or the page will redirect away
 * from itself. See docs/seo-migration-tracker.md §2 and §3 for the decision behind each row.
 *
 * NOT IN THIS FILE (deliberately still live and listed):
 *   B37 /blogs/best-earrings-for-a-girls-night-out-in-2026        — on hold, §27 L16687
 *   B45 /blogs/the-geometric-earrings-vs-classic-hoop-earrings-in-2026 — on hold, §46 L23382
 *   R6  /resources/lab-grown-diamond-guides/what-earrings-to-wear-as-a-wedding-guest
 *                                                                  — cancelled, page kept (conflict H)
 *   R8  /resources/jewellery-care-guides/valentines-day-jewellery-gifts
 *                                                                  — no destination (N6 dropped)
 */

export type RetiredUrl = {
  /** Tracker row id — B1..B56 for blogs, R1..R10 for resources. */
  id: string
  /** The retired public path, without locale prefix. */
  url: string
  /** Live destination the 308 points at. */
  redirectsTo: string
  /** File where the original entry sits, commented out. */
  commentedIn: string
  /** Line of the SEO-RETIRED marker as of 2026-08-19. Verify with grep — see header. */
  line: number
}

/** 54 retired blog URLs, previously listed in blogList.ts. */
export const retiredBlogs: RetiredUrl[] = [
  { id: 'B1', url: '/blogs/the-everyday-diamond-earrings-for-work-in-2026', redirectsTo: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 14 },
  { id: 'B2', url: '/blogs/best-everyday-earrings-for-women-2026', redirectsTo: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 32 },
  { id: 'B3', url: '/blogs/everyday-office-earrings-in-2026', redirectsTo: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 110 },
  { id: 'B4', url: '/blogs/best-office-to-dinner-earrings-2026', redirectsTo: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 241 },
  { id: 'B5', url: '/blogs/best-diamond-earrings-for-office', redirectsTo: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 300 },
  { id: 'B6', url: '/blogs/how-to-style-diamond-studs-everyday-in-2026', redirectsTo: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 128 },
  { id: 'B7', url: '/blogs/how-to-style-medium-diamond-studs-from-day-to-night-in-the-2026', redirectsTo: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 158 },
  { id: 'B8', url: '/blogs/how-to-make-classic-diamond-studs-look-more-modern-in-2026', redirectsTo: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 170 },
  { id: 'B9', url: '/blogs/the-travel-jewellery-for-the-women', redirectsTo: '/resources/earring-style-guides/travel-jewellery-guide', commentedIn: 'src/components/shared/blogList.ts', line: 247 },
  { id: 'B10', url: '/blogs/the-best-travel-friendly-diamond-earrings-in-2026', redirectsTo: '/resources/earring-style-guides/travel-jewellery-guide', commentedIn: 'src/components/shared/blogList.ts', line: 20 },
  { id: 'B11', url: '/blogs/the-travel-friendly-diamond-earrings-in-2026', redirectsTo: '/resources/earring-style-guides/travel-jewellery-guide', commentedIn: 'src/components/shared/blogList.ts', line: 116 },
  { id: 'B12', url: '/blogs/the-travel-jewellery-earrings-you-can-wear-all-day', redirectsTo: '/resources/earring-style-guides/travel-jewellery-guide', commentedIn: 'src/components/shared/blogList.ts', line: 306 },
  { id: 'B13', url: '/blogs/what-are-huggie-earrings-and-are-they-comfortable-in-2026', redirectsTo: '/resources/earring-style-guides/what-are-huggie-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 276 },
  { id: 'B14', url: '/blogs/the-best-huggie-earrings-for-everyday-wear-in-2026', redirectsTo: '/resources/earring-style-guides/what-are-huggie-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 270 },
  { id: 'B15', url: '/blogs/how-to-style-diamond-huggies-from-morning-to-evening-2026', redirectsTo: '/resources/earring-style-guides/how-to-style-huggie-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 282 },
  { id: 'B16', url: '/blogs/huggie-earrings-vs-hoop-earrings-in-2026', redirectsTo: '/resources/earring-style-guides/hoop-vs-huggie-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 288 },
  { id: 'B17', url: '/blogs/the-huggie-earrings-vs-stud-earrings-2026', redirectsTo: '/resources/earring-style-guides/stud-vs-huggie-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 318 },
  { id: 'B18', url: '/blogs/how-to-style-huggie-earrings-in-theear-stack', redirectsTo: '/resources/earring-style-guides/how-to-stack-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 330 },
  { id: 'B19', url: '/blogs/minimalist-jewellery-capsule-wardrobe', redirectsTo: '/resources/earring-style-guides/minimalist-jewellery-styling-guide', commentedIn: 'src/components/shared/blogList.ts', line: 294 },
  { id: 'B20', url: '/blogs/the-minimalist-jewellery-gifts-for-women', redirectsTo: '/resources/earring-style-guides/minimalist-jewellery-styling-guide', commentedIn: 'src/components/shared/blogList.ts', line: 312 },
  { id: 'B21', url: '/blogs/the-minimalist-huggie-earrings-quiet-luxury-2026', redirectsTo: '/resources/earring-style-guides/minimalist-jewellery-styling-guide', commentedIn: 'src/components/shared/blogList.ts', line: 324 },
  { id: 'B22', url: '/blogs/how-to-style-butterfly-earrings', redirectsTo: '/resources/earring-style-guides/how-to-style-butterfly-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 235 },
  { id: 'B23', url: '/blogs/how-to-style-pave-butterfly-earrings-elegantly-in-2026', redirectsTo: '/resources/earring-style-guides/how-to-style-butterfly-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 199 },
  { id: 'B24', url: '/blogs/gold-butterfly-earrings-how-to-style-every-day', redirectsTo: '/resources/earring-style-guides/how-to-style-butterfly-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 223 },
  { id: 'B25', url: '/blogs/best-butterfly-earrings-for-evening-events-in-the-2026', redirectsTo: '/resources/earring-style-guides/how-to-style-butterfly-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 176 },
  { id: 'B26', url: '/blogs/the-pave-butterfly-earrings-vs-simple-butterfly-earrings', redirectsTo: '/resources/earring-style-guides/how-to-style-butterfly-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 217 },
  { id: 'B27', url: '/blogs/are-butterfly-earrings-too-young', redirectsTo: '/resources/earring-style-guides/how-to-style-butterfly-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 229 },
  { id: 'B28', url: '/blogs/how-to-style-statement-earrings-in-the-2026', redirectsTo: '/resources/earring-style-guides/bold-statement-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 74 },
  { id: 'B29', url: '/blogs/the-statement-jewellery-styling-in-2026', redirectsTo: '/resources/earring-style-guides/bold-statement-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 86 },
  { id: 'B30', url: '/blogs/how-to-wear-eye-catching-earrings-without-overdoing-it-2026', redirectsTo: '/resources/earring-style-guides/bold-statement-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 211 },
  { id: 'B31', url: '/blogs/statement-earrings-vs-classic-studs-in-2026', redirectsTo: '/resources/earring-style-guides/bold-statement-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 92 },
  { id: 'B32', url: '/blogs/the-diamond-hoops-vs-statement-earrings-in-the-2026', redirectsTo: '/resources/earring-style-guides/bold-statement-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 98 },
  { id: 'B33', url: '/blogs/best-statement-earrings-for-black-tie-events-2026', redirectsTo: '/resources/earring-style-guides/party-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 50 },
  { id: 'B34', url: '/blogs/the-gala-jewellery-guide-in-the-2026', redirectsTo: '/resources/earring-style-guides/party-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 56 },
  { id: 'B35', url: '/blogs/cocktail-party-jewellery-ideas-in-the-2026', redirectsTo: '/resources/earring-style-guides/party-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 68 },
  { id: 'B36', url: '/blogs/the-jewellery-to-wear-to-a-formal-dinner-without-looking-overdressed-in-2026', redirectsTo: '/resources/earring-style-guides/party-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 152 },
  { id: 'B38', url: '/blogs/the-best-date-night-earrings', redirectsTo: '/resources/jewellery-gift-guides/date-night-jewellery-guide', commentedIn: 'src/components/shared/blogList.ts', line: 38 },
  { id: 'B39', url: '/blogs/the-elegant-dinner-date-earrings-2026', redirectsTo: '/resources/jewellery-gift-guides/date-night-jewellery-guide', commentedIn: 'src/components/shared/blogList.ts', line: 259 },
  { id: 'B40', url: '/blogs/what-are-the-jewellery-to-wear-to-an-anniversary-dinner', redirectsTo: '/resources/jewellery-gift-guides/date-night-jewellery-guide', commentedIn: 'src/components/shared/blogList.ts', line: 182 },
  { id: 'B41', url: '/blogs/the-earrings-with-black-dress-in-2026', redirectsTo: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress', commentedIn: 'src/components/shared/blogList.ts', line: 80 },
  { id: 'B42', url: '/blogs/what-earrings-to-wear-with-a-silk-dress', redirectsTo: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress', commentedIn: 'src/components/shared/blogList.ts', line: 164 },
  { id: 'B43', url: '/blogs/what-the-earrings-to-wear-with-a-romantic-dres-2026', redirectsTo: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-sweetheart-neckline', commentedIn: 'src/components/shared/blogList.ts', line: 205 },
  { id: 'B44', url: '/blogs/how-to-style-geometric-earrings-in-2026', redirectsTo: '/resources/earring-style-guides/how-to-style-geometric-earrings', commentedIn: 'src/components/shared/blogList.ts', line: 253 },
  { id: 'B46', url: '/blogs/the-first-diamond-stud-earrings-2026', redirectsTo: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 104 },
  { id: 'B47', url: '/blogs/the-best-first-diamond-earrings-2026', redirectsTo: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 336 },
  { id: 'B48', url: '/blogs/the-best-pave-hoop-earrings-everyday-luxury-2026', redirectsTo: '/resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide', commentedIn: 'src/components/shared/blogList.ts', line: 26 },
  { id: 'B49', url: '/blogs/best-diamond-stud-earrings-for-wedding-guests-in-2026', redirectsTo: '/resources/lab-grown-diamond-guides/what-earrings-to-wear-as-a-wedding-guest', commentedIn: 'src/components/shared/blogList.ts', line: 146 },
  { id: 'B50', url: '/blogs/best-wedding-guest-earrings-for-spring-and-summer-weddings', redirectsTo: '/resources/lab-grown-diamond-guides/what-earrings-to-wear-as-a-wedding-guest', commentedIn: 'src/components/shared/blogList.ts', line: 193 },
  { id: 'B51', url: '/blogs/milestone-birthday-jewellery-gifts-in-the-2026', redirectsTo: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her', commentedIn: 'src/components/shared/blogList.ts', line: 134 },
  { id: 'B52', url: '/blogs/the-luxury-earrings-gift-milestone-birthday', redirectsTo: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her', commentedIn: 'src/components/shared/blogList.ts', line: 62 },
  { id: 'B53', url: '/blogs/the-best-anniversary-diamond-earrings-for-her', redirectsTo: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her', commentedIn: 'src/components/shared/blogList.ts', line: 140 },
  { id: 'B54', url: '/blogs/best-graduation-jewellery-gifts-for-her-2026', redirectsTo: '/resources/jewellery-gift-guides/graduation-jewellery-gifts', commentedIn: 'src/components/shared/blogList.ts', line: 8 },
  { id: 'B55', url: '/blogs/best-classic-jewellery-gifts-for-her-2026', redirectsTo: '/resources/jewellery-gift-guides/jewellery-gifts-for-her', commentedIn: 'src/components/shared/blogList.ts', line: 44 },
  { id: 'B56', url: '/blogs/simple-jewellery-gifts-in-the-2026', redirectsTo: '/resources/jewellery-gift-guides/jewellery-gifts-for-her', commentedIn: 'src/components/shared/blogList.ts', line: 122 },
]

/** 8 retired resource URLs, previously listed in resources.ts. */
export const retiredResources: RetiredUrl[] = [
  { id: 'R1', url: '/resources/earring-style-guides/lab-grown-diamond-hoop-earrings-guide', redirectsTo: '/resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide', commentedIn: 'src/data/resources.ts', line: 1009 },
  { id: 'R2', url: '/resources/earring-style-guides/can-you-wear-lab-grown-diamond-earrings-every-day', redirectsTo: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day', commentedIn: 'src/data/resources.ts', line: 1048 },
  { id: 'R3', url: '/resources/earring-style-guides/gold-vs-white-vs-rose-gold-diamond-earrings', redirectsTo: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings', commentedIn: 'src/data/resources.ts', line: 935 },
  { id: 'R4', url: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks', redirectsTo: '/resources/earring-style-guides/diamond-ear-stack-ideas', commentedIn: 'src/data/resources.ts', line: 275 },
  { id: 'R5', url: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts', redirectsTo: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts', commentedIn: 'src/data/resources.ts', line: 255 },
  { id: 'R7', url: '/resources/jewellery-care-guides/new-year-jewellery-gifts', redirectsTo: '/resources/occasion-jewellery-guides/new-year-jewellery-gifts', commentedIn: 'src/data/resources.ts', line: 1183 },
  { id: 'R9', url: '/resources/jewellery-gift-guides/birthday-jewellery-gifts', redirectsTo: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her', commentedIn: 'src/data/resources.ts', line: 586 },
  { id: 'R10', url: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts', redirectsTo: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her', commentedIn: 'src/data/resources.ts', line: 574 },
]

/** All 62 retired URLs. */
export const retiredUrls: RetiredUrl[] = [...retiredBlogs, ...retiredResources]
