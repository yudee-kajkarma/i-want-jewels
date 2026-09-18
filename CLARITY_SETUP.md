# Microsoft Clarity setup

## Project ID

The public ID is centralized in `src/lib/clarity.ts`:

- Environment override: `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
- Fallback project: `yk04k8t5l5`.

For production, set the company's Clarity project ID in the hosting environment **before building**. Next.js public environment variables are included at build time. Do not install a second Clarity tag through Google Tag Manager.

The existing Google Analytics implementation and ID `G-4CE12YQ4KR` are unchanged. This implementation sends custom shopping events to Clarity; it does not add new GA4 shopping events.

## Enabled capabilities

One asynchronous Clarity script supplies session collection, heatmaps, automatic events and behaviour insights. There is no custom Microsoft popup or user-facing analytics UI.

Custom API events:

| Area | Events |
| --- | --- |
| Product/search | product_viewed, product_searched, search_no_results, out_of_stock |
| Guest and signed-in carts | add_to_cart, remove_from_cart, cart_quantity_updated, cart_cleared, cart_viewed |
| Checkout | checkout_started, address_saved, order_created, checkout_failed |
| Gift cards | gift_card_applied, gift_card_failed, gift_card_removed |
| Payment | payment_started, payment_retry_started, payment_cancelled, payment_failed, purchase_completed |

Safe tags: customer_type (guest/signed_in), checkout_source (cart/buy_now), payment_method (online/cod), gift_card_failure_reason (fixed categories). No custom user identification is sent. COD is retained only for compatibility with stored order types, not offered as a new payment feature.

Cart mutations are tracked after success. Background cart fetches and Buy Now basket restoration are silent. Searches are tracked after their actual response, without an extra tracking-only request or raw search text. Purchase requires backend paid confirmation, with per-tab deduplication. Pending payment verification is retried up to five times; guest backend order access can still limit confirmation.

## Privacy and consent

Public page content follows **Clarity → Settings → Masking**. The body-wide code mask has been removed; select Balanced in the dashboard. Balanced can still hide numbers such as prices; selected public elements can be unmasked through dashboard selectors. No public content is explicitly unmasked by code.

Code safeguards mask checkout, account/profile, order/payment, admin and authentication routes, plus account identity displays, gift-card details and product review content. Inputs remain subject to Clarity's masking. Layout and interactions are still collected; masking is not anonymization of all telemetry. Avoid dashboard unmask rules on sensitive sections, since explicit unmasking can override masks.

Fixed event names and safe tags contain no passwords, email, address, phone, card data, gift-card code or gift message. Local order IDs are used only for deduplication, not sent through custom events.

Admin and authentication pages do not initialize custom tracking. This does not stop an already-loaded recorder after client navigation. Automatic URLs and sensitive routes require separate review. Page masking does not sanitize paths or query parameters.

Storage consent starts **denied**, with no manufactured acceptance. No existing CMP integration was found in the reviewed source. Clarity's consent API is available for a real consent system to update analytics storage, while advertising storage can remain denied. Full recordings, cross-page session continuity and funnels cannot be guaranteed in every region without appropriate consent. Adding no popup does not establish complete consent integration.

## Clarity dashboard

Open the company's project and use Dashboard → Smart events or Settings → Smart events to inspect received API events. Recordings and heatmaps use the same session data. Some automatic events can overlap with custom ones; use API event names for the instrumented journey.

Configure funnel steps and desired segments in the Clarity dashboard; these are account settings, not frontend code. Enable Consent Mode in the project settings and connect actual visitor choices for complete consent-dependent functionality. Team permissions, internal-traffic filtering and GA dashboard integration are also account settings; installing both tags does not configure them automatically.

## Verification

- `node --test tests/clarity.test.cjs`: queueing, one loader, company ID override, denied storage, role/path exclusions, confirmed payments, deduplication and successful cart mutations.
- `npx tsc --noEmit` and focused ESLint.
- `npm run build`: production compilation check, separate from hosting artifact size.

Local validation passed: six tests, TypeScript, focused lint and production build. The built cart page loaded one Clarity tag, kept the existing GA tag, showed no Microsoft popup (that check preceded the switch to dashboard-controlled public masking). A delayed-script check queued exactly one cart_viewed event; live Clarity collection returned HTTP 204. The build logged nonfatal sitemap fetch warnings because the local backend was unavailable.

Live paid checkout and production dashboard processing are not established by these local tests. The earlier screenshots in `MICROSOFT_CLARITY_IMPLEMENTATION.md` document the previous local trial, not fresh confirmation after this reimplementation.

References: [Client API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api), [Smart events](https://learn.microsoft.com/en-us/clarity/setup-and-installation/smart-events), [Consent management](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management).
