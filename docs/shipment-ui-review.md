# Shipment dialog redesign

## Scope

Redesigned Admin Orders → Ship, the carrier chooser, and both carrier forms. The implementation retains the existing DHL and FedEx shipment payloads, carrier options, customs values, and shipping endpoints. Backend source files were reviewed but not changed.

The shared dialog provides local SVG carrier wordmarks, a route preview, one continuous form with four clearly headed sections, selectable service cards, a detailed updating summary, and a persistent submit footer. Desktop, narrow desktop, and mobile layouts use the same controlled form state. All six supported locales include the new copy.

Accessibility includes dialog naming, keyboard focus containment and restoration, Escape dismissal, visible focus states, named form controls, radio service selection, and reduced-motion support. All form sections remain visible and mounted; scrolling preserves edits without Previous/Next navigation. Submission disables editing, carrier switching, and dismissal until the request completes.

## Shipment flow checked

- `src/views/AdminOrdersPage.tsx`: order selection, preview loading, carrier selection, successful shipment refresh.
- `src/services/orderService.ts` and `src/types/order.ts`: preview and rate normalization, address updates, carrier-specific shipment payloads.
- `src/components/admin/FedExShipForm.tsx` and `DHLShipForm.tsx`: sender and recipient details, commodities, packaging, service selection, account-charge breakdowns, additional services, duties, notifications, and existing blockers.
- Backend `src/controller/OrderController.ts`, `src/routes/orderRoutes.ts`, and `src/services/order.service.ts`: preview, rate, shipping-address, and shipment requests.
- Backend `src/integrations/FedExService.ts`, `DHLExpressService.ts`, `fedex.reference.ts`, and `dhl.reference.ts`: integration interfaces and locally documented carrier values.

The UI now ignores out-of-order rate and preview responses, preserves an available selected service during requoting, refreshes the displayed preview, validation, and declaration-value snapshots after a saved address, and disables submission during rate loading or failure. Opening another order starts with carrier selection.

## Existing backend limitations

These are findings in the existing integration, outside this UI redesign:

1. Custom dimensions reach shipment creation, but the admin rate endpoint does not read custom dimensions. Editing your own box dimensions therefore does not guarantee a matching rate estimate.
2. The controller reads the requested ship date, but the FedEx rate-service interface has no ship-date parameter and the controller does not forward it to that carrier. The FedEx shipment creation flow does receive the selected date.
3. When a FedEx quote with additional options fails, the backend can fall back to a plain quote. That fallback may exclude selected extras.

The summary explicitly presents a carrier quote and explains that final charges may vary; it does not promise an all-inclusive final price.

## Verification

- Frontend production build and TypeScript checks passed.
- ESLint passed for the new workspace and all three changed shipment components. The Orders page still has pre-existing `any` errors in pickup handlers and an existing effect-dependency warning.
- Backend build passed. All 23 source tests passed with `npx vitest run src/utils/__tests__ --exclude '**/dist/**'`. The default `npm test` additionally discovers compiled CommonJS test copies under `dist`, which fail to import Vitest.
- Chrome browser checks with synthetic order data and mocked carrier responses covered desktop/mobile layouts, both carrier selections, service and price updates, all sections, loading, failure/retry, receiver saving, preserved service selection, both shipment payloads, declaration-currency refresh with preserved HS-code edits, submission locks, Tab focus containment, Escape, and focus restoration.
- The actual localized Orders page was exercised through carrier selection and DHL service rendering with intercepted API responses. This exposed missing locale fallback text, which was resolved by adding all new strings to every supported locale.
- The local English route encountered an existing redirect loop; the actual-page check used `/de/admin/orders`. Isolated component checks used English. No routing configuration was changed.

No real shipment was booked, label purchased, or customer notified during verification.

## Follow-up: site styling and rate disclosure

Compared the shared styles, Header, Checkout page, and surrounding Orders cards/actions. The shipment dialog now follows the Orders page's square surfaces, thin pink borders, white/blush backgrounds, plum text, Poppins typography, and uppercase pink actions. FedEx and DHL keep their original wordmarks; their brand colors no longer override the application's controls.

The service summary and footer price stay hidden until the Shipping services & rates section scrolls into view. Once that section has been viewed, rates remain visible during review, and choosing a carrier again resets this state. Shipment creation is disabled until the rates section has been viewed. Customs and order values remain separately identified.

Replaced decorative headings with direct task labels and the ambiguous “Live” indicator with “Draft.” Rate amounts, lowest-rate comparisons, and delivery estimates continue to use existing carrier response data; no sample rates or delivery promises were added to production code.

## Follow-up: continuous form and complete summary

Removed the step navigation and Previous/Next controls. Sender and recipient, parcel and customs, shipping services, and billing and notifications now appear together in one scrollable form. Desktop retains the independently scrollable right-hand summary; mobile places that summary after the form.

The summary reflects parcel details, order and declaration totals, delivery options, references, label format, billing, and email notification preferences. Sender/recipient details and individual product lines stay in the main form; the summary does not repeat them. A pending-save message remains visible when editing an address. Carrier-specific fields appear only for their carrier. The account-charge breakdown moved from the service section into the summary: available base charges, discounts, surcharges, taxes, quoted total, public rate, savings, and billing weight come from the selected rate. Missing breakdown data is identified instead of inferred.

Verification for the final continuous form: TypeScript, targeted shipment-component ESLint, and whitespace checks passed. Isolated Chrome checks with synthetic orders and mocked carrier data passed for both carriers: all sections visible without navigation, rates revealed on scroll, editable-address and company updates, HS codes, service changes, charge breakdowns, references, label options, DHL insurance, mobile scrolling without horizontal overflow, and both shipment payloads. No live carrier request was submitted. The existing development server on port 3000 was left running.


## Follow-up: simpler review, inline dates, and shipment loading

- Removed the Sender & recipient summary group and repeated product lines from Parcel & customs. Main-form addresses and commodity inputs remain available.
- Removed the DHL SMS checkbox and phone display from notification options, along with its summary row and optional SMS payload field. Email notifications remain supported.
- Both carriers now use an always-visible calendar with localized month/day labels, selected-day styling, past-date blocking, month navigation, and keyboard controls (arrows, Home/End, Page Up/Down). Calendar dates use local calendar days and still submit ISO date strings through the existing carrier options.
- The initial Admin Orders shipment loading state displays an animated truck, parcel, and route with Loading text and both carrier logos. Motion stops for reduced-motion preferences; it does not simulate progress or delay real loading.
- The chooser keeps FedEx/DHL logos, names, and continue actions with a short introduction. Repeated International descriptions and feature lists were removed.

Verification: TypeScript and targeted shipment-component lint passed. Mocked Chrome checks covered both carriers, simplified summary content, opening loader and reduced motion, inline calendars, leap day and month-end navigation, keyboard selection, past-date blocking, mobile sizing, selected-date shipment payloads, and absence of DHL SMS payloads. No real shipment was submitted.


## Earlier iteration: expanded API details (revised below)

Every service card now includes a native, keyboard-accessible Rate details & discounts disclosure. Clicking/selecting a service opens its breakdown; opening or closing another disclosure does not change the selected shipment service. The existing right-hand summary remains available.

The expanded panel covers the complete rate shape exposed by the admin API: account and walk-in totals, account/list base charges, itemized freight discounts with percentages and type codes, total freight discount, itemized account/list surcharges and taxes, their totals and fuel percentages, pre-tax FedEx charge, billing weight, service code, transit days, estimated delivery, rate tag, local pickup cutoff, available extras and codes, and whether selected extras are included. Savings are calculated only when the supplied walk-in total exceeds the account quote. Explicit zero values are retained; unavailable walk-in or itemization data is identified without invented amounts. Existing carrier normalization now preserves an omitted extras-pricing flag instead of treating omission as false.

Verification: TypeScript, targeted component ESLint, and whitespace checks passed. Mocked Chrome checks covered full FedEx breakdowns, partial DHL responses, zero taxes, independent mouse/keyboard disclosures, service selection and submitted service codes, and mobile overflow. A direct check of the production normalization function confirmed preservation of supplied rate fields and absent/false/true extras-pricing states. No real carrier booking was made.


## Current rate dropdown: focused pricing and reliable selection

Removed the Service details section, raw carrier/type codes, rate tags, extras-pricing metadata, and the full available-services catalogue from each dropdown. Available services describe possibilities, not charges applied to the quote. The dropdown now contains only the account/walk-in comparison, savings, charge/discount/tax lines and totals, fuel percentages, and billing weight. Missing walk-in data uses one brief note and no empty comparison column. The right-hand summary is unchanged.

Replaced the native details/onToggle synchronization with an explicitly controlled accordion. Clicking a service name, price, or radio opens that rate immediately, including an already-selected rate. Only one breakdown is open at a time. A separate labelled disclosure button can collapse or inspect a quote; radio keyboard selection, Space, and Enter also open the appropriate panel. Refreshed quotes update the open panel from current rate data.

Validation: TypeScript, targeted ESLint, and whitespace checks passed. Chrome checks using the actual shipment components with mocked API responses tested both carriers, a DHL catalogue containing 120 extras, absence of raw metadata, preservation of walk-in/discount/charge figures, repeated card switches, name/price/radio clicks, reopening selected radios by keyboard, independent disclosure, refreshed quote amounts, correct submitted service codes, and 390/768/1440 px layouts without overflow. Desktop and mobile screenshots were visually reviewed. No real shipment was created.

The additional full Orders-page check on the existing port-3000 server could not complete: the localized page timed out during navigation. The component/browser checks above passed independently; the existing development server was left running.


## Current comparison: restore the original parallel price table

Cross-checked the original committed FedEx and DHL forms. FedEx previously used aligned rows with public/walk-in amounts on the left and account amounts on the right, including a derived base-charge-after-discount row and total savings. The shared dropdown now restores that comparison structure for both carriers. It keeps both amount columns aligned at mobile, tablet, and desktop widths. The separate right-hand shipment summary and automatic rate-card opening remain unchanged.

Matching account/list surcharge and tax lines share a row. Matching uses carrier type codes internally, with descriptions as a fallback when a code is absent; raw codes are not rendered. Repeated charge types and lines supplied on only one side are preserved. Missing amounts render as dashes. The after-discount subtotal uses the supplied total freight discount, or the sum of supplied discount lines when the total is absent; the final quote remains the carrier-supplied amount. Savings use supplied public/account totals.

Verification: TypeScript, targeted lint, and whitespace checks passed. Mocked browser checks covered both carriers, exact column ordering and amounts, aligned fuel charges and percentages, discounts and the after-discount subtotal, final totals and savings, missing DHL walk-in values, 390/768/1440 px layouts, automatic disclosure, and submitted service selection. Matching checks covered repeated charges, list-only/account-only charges, description fallback, and explicit zero values. Desktop and mobile screenshots were visually inspected.


## Pre-deployment verification

The backend working tree was clean; shipment changes are confined to the frontend repository (including frontend rate normalization and state handling). A fresh default `npm run build` passed compilation, TypeScript, static page generation, and optimization. Targeted ESLint for all shipment components and whitespace checks passed. Build-time sitemap requests reported the local backend at localhost:3001 as unavailable; this did not fail the build.

Using the resulting production build on a temporary local server, Chrome successfully exercised the actual German Admin Orders page through Ship, both carrier choices, automatic comparison opening, mobile layout, and Escape dismissal. All API responses were intercepted with synthetic fixtures; live carrier credentials/rates and real shipment creation have not been validated by these checks. This successful production-build check supersedes the earlier local-development-page timeout.

New shared shipment components, CSS module, carrier assets, and this review document are untracked until explicitly included in the commit. The generated next-env.d.ts was restored to its pre-build contents. No push or deployment was performed.
