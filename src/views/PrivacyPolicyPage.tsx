'use client'

import type { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileStickyActions from '@/components/shared/MobileStickyActions'
import { Link } from '@/lib/router'
import introImage from '@/assets/about-us/under-about1.jpeg'

/**
 * Privacy Policy (English), laid out like the resource and blog articles
 * (one photo, no banner): image + title intro, quick summary, then the policy sections with an
 * "On this page" sidebar. Written from what the site actually does: Google and
 * Facebook sign-in, accounts, orders, Stripe payments, FedEx/DHL delivery,
 * order emails, hosting and Microsoft Clarity. Also serves as the privacy
 * policy and data-deletion page for Google OAuth and Meta app review.
 */

const LAST_UPDATED = '21 October 2026'
const CONTACT_EMAIL = 'info@iwantjewels.com'
const CONTACT_PHONE = '+32 483 17 27 03'

const SECTIONS = [
  { id: 'who-we-are', title: 'Who We Are' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'sources', title: 'Where We Get It From' },
  { id: 'how-we-use-it', title: 'How We Use Your Information' },
  { id: 'google-and-facebook', title: 'Google and Facebook Sign-In Data' },
  { id: 'sharing', title: 'Who We Share It With' },
  { id: 'emails', title: 'Emails We Send' },
  { id: 'international-transfers', title: 'International Transfers' },
  { id: 'security', title: 'How We Protect Your Data' },
  { id: 'retention', title: 'How Long We Keep It' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'delete-your-data', title: 'How to Delete Your Data' },
  { id: 'cookies', title: 'Cookies and Browser Storage' },
  { id: 'other-websites', title: 'Links to Other Websites' },
  { id: 'children', title: 'Children' },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

// Typography shared with the resource articles.
const body = 'font-poppins text-[15px] leading-[1.8] text-[#344256]'
const linkClass = 'font-medium text-pink-500 hover:underline'

function Section({ id, first = false, children }: { id: SectionId; first?: boolean; children: ReactNode }) {
  const title = SECTIONS.find((section) => section.id === id)?.title
  return (
    <section id={id} className={`scroll-mt-[100px] ${first ? '' : 'mt-12 border-t border-zinc-100 pt-10'}`}>
      <h2 className="mb-4 font-play text-[22px] font-semibold leading-snug text-[#1f2732] md:text-[24px]">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

const P = ({ children }: { children: ReactNode }) => <p className={body}>{children}</p>

const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="pt-2 font-play text-[17px] font-semibold text-[#1f2732] md:text-[18px]">{children}</h3>
)

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-5">
      {items.map((item, index) => (
        <li
          key={index}
          className={`relative ${body} before:absolute before:-left-4 before:top-[0.72em] before:h-[5px] before:w-[5px] before:rounded-full before:bg-pink-400 before:content-['']`}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

/** The articles' pink "See also" box. */
function Note({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="my-2 inline-block bg-[#fef4f9] px-4 py-2 font-poppins text-[13px] leading-6">
      <span className="font-semibold text-[#1f2732]">{label} </span>
      {children}
    </div>
  )
}

const Email = () => (
  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
    {CONTACT_EMAIL}
  </a>
)

const External = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
    {children}
  </a>
)

const Jump = ({ to, children }: { to: SectionId; children: ReactNode }) => (
  <a href={`#${to}`} className={linkClass}>
    {children}
  </a>
)

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* 1. Intro: image left | title, text and contact button right */}
        <section className="w-full bg-white px-5 py-12 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-0">
              <div className="w-full flex-shrink-0 self-stretch md:w-1/2">
                <img
                  src={introImage.src}
                  alt="I Want Jewels lab-grown diamond jewellery"
                  className="block h-full max-h-[620px] min-h-[320px] w-full object-cover"
                />
              </div>
              <div className="flex w-full flex-col justify-center md:w-1/2 md:px-10 lg:px-14">
                <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-pink-500">
                  Last updated: {LAST_UPDATED}
                </p>
                <h1 className="mt-3 font-play text-[26px] font-bold leading-tight text-[#1f2732] sm:text-[30px] lg:text-[34px]">
                  Privacy Policy
                </h1>
                <p className="mt-1 font-play text-[22px] font-bold leading-tight text-[#1f2732] sm:text-[26px] lg:text-[30px]">
                  How We Collect, Use and Protect Your Information
                </p>
                <div className="mt-5 space-y-4">
                  <p className="font-poppins text-[14px] leading-[1.85] text-[#344256]">
                    This policy explains what personal information I Want Jewels collects when you visit
                    iwantjewels.com, sign in with Google or Facebook, create an account or place an order; why we
                    collect it; who we share it with; and how you can see, change or delete it.
                  </p>
                  <p className="font-poppins text-[14px] leading-[1.85] text-[#344256]">
                    We collect only what we need to run your account and deliver your jewellery, and we never sell your
                    personal information.
                  </p>
                </div>
                <div className="mt-7">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 border border-pink-400 px-6 py-2.5 text-[12px] font-medium tracking-[0.06em] text-pink-500 transition hover:bg-pink-50"
                  >
                    Contact Us About Your Data
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Quick summary */}
        <section className="w-full bg-white px-5 pb-4 lg:px-10">
          <div className="mx-auto max-w-[1400px] border-t border-zinc-100 pt-10">
            <h2 className="mb-4 font-play text-[22px] font-semibold text-[#1f2732] md:text-[24px]">Quick Summary</h2>
            <Bullets
              items={[
                'We use your information only to sign you in, run your account, and process and deliver your orders.',
                'From Google or Facebook we receive only your name, email address and account ID.',
                'We never sell your personal information or use it for advertising.',
                'Card payments are handled by Stripe; we never see or store your full card number.',
                <>You can ask to see, correct or delete your data at any time by emailing <Email />.</>,
              ]}
            />
          </div>
        </section>

        {/* 3. Policy sections | "On this page" sidebar, as on the blog articles */}
        <div className="mx-auto mb-20 flex max-w-[1400px] flex-col gap-12 px-5 py-12 lg:flex-row lg:px-10">
          <aside className="order-first h-fit w-full lg:order-last lg:sticky lg:top-24 lg:w-1/3">
            <nav aria-label="On this page" className="rounded-sm bg-[#f7f8fa] p-8 shadow-sm lg:rounded-none">
              <h2 className="mb-5 font-play text-3xl font-semibold text-[#0f172a] lg:text-2xl">On This Page</h2>
              <ol className="space-y-3">
                {SECTIONS.map((section, index) => (
                  <li key={section.id} className="border-b border-slate-200 pb-2 last:border-0 lg:border-0 lg:pb-0">
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-4 font-poppins text-[15px] text-slate-700 transition-colors hover:text-[#bb923a] lg:text-sm lg:font-semibold lg:tracking-wide"
                    >
                      <span className="w-5 shrink-0 text-slate-400">{index + 1}.</span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="w-full flex-1 lg:w-2/3">
            <Section id="who-we-are" first>
              <P>
                iwantjewels.com is run by <strong className="text-[#1f2732]">I Want Jewels</strong>, Antwerp, Belgium. We
                are the controller of the personal information described in this policy, which means we decide how and
                why it is used.
              </P>
              <P>
                For any privacy question or request, email <Email /> or call {CONTACT_PHONE}.
              </P>
            </Section>

            <Section id="information-we-collect">
              <H3>When you sign in with Google</H3>
              <P>
                With your permission, Google shares your name (first and last name), your email address, whether that
                email address is verified, and your Google account ID. We use these only to create your account and sign
                you in. We do not receive your Google password, and we do not access your contacts, Gmail, Google Drive,
                calendar or any other Google data.
              </P>
              <H3>When you sign in with Facebook</H3>
              <P>
                With your permission, Facebook shares your first and last name, your email address and your Facebook user
                ID. We use these only to create your account and sign you in. We do not post to Facebook or read your
                friends list, messages or other Facebook data.
              </P>
              <H3>When you create an account with your email</H3>
              <P>
                Your name, email address and password (stored only in scrambled, hashed form, never readable by us), and
                your phone number if you add it. To confirm your email we send you a one-time code.
              </P>
              <H3>When you place an order</H3>
              <P>With an account or as a guest, we collect:</P>
              <Bullets
                items={[
                  'your name, email address and phone number;',
                  'your delivery and billing address;',
                  'what you ordered, prices, currency, gift card codes used, and the order, payment and shipping status;',
                  'for shipments outside the EU, the customs information carriers require (such as item descriptions and values).',
                ]}
              />
              <H3>Payments</H3>
              <P>
                Card payments are processed by Stripe. You enter your card details directly with Stripe; we never see or
                store your full card number or security code. Stripe tells us whether the payment succeeded.
              </P>
              <H3>Gift cards</H3>
              <P>
                When you buy a gift card for someone, you give us their name and email address so we can send it to them.
                Please only do this if you know they are happy for you to share their details. We use them only to deliver
                the gift card and, if it is about to expire, to remind them.
              </P>
              <H3>Returns</H3>
              <P>
                If you return an item, we keep the details of your return request, such as the items, the reason and the
                outcome.
              </P>
              <H3>Your account activity</H3>
              <P>
                Your wishlist, shopping bag, saved addresses and product reviews you write. Reviews are shown on the
                product page with your username.
              </P>
              <H3>When you contact us</H3>
              <P>
                What you send us through the contact form, by email, by phone or on WhatsApp, together with your name and
                contact details, so we can answer you and keep a record of your request.
              </P>
              <H3>How you use the website</H3>
              <P>
                Like most websites, our servers record technical information such as your IP address, browser type and
                the pages requested, to keep the site running and secure. We also use Microsoft Clarity to understand how
                pages are used (for example clicks and scrolling) so we can improve the site; Clarity hides form inputs
                and personal details, and we run it without analytics cookies.
              </P>
            </Section>

            <Section id="sources">
              <Bullets
                items={[
                  <><strong className="text-[#1f2732]">From you</strong> – when you create an account, place an order, write a review, buy a gift card or contact us.</>,
                  <><strong className="text-[#1f2732]">Automatically</strong> – technical and usage information from your browser while you use the website.</>,
                  <><strong className="text-[#1f2732]">From Google or Facebook</strong> – only if you choose to sign in with them, and only the details listed above.</>,
                  <><strong className="text-[#1f2732]">From our service providers</strong> – Stripe tells us whether a payment succeeded, and FedEx and DHL tell us where your parcel is.</>,
                  <><strong className="text-[#1f2732]">From someone else</strong> – if a friend buys you a gift card, they give us your name and email address.</>,
                ]}
              />
            </Section>

            <Section id="how-we-use-it">
              <P>We use your information only to:</P>
              <Bullets
                items={[
                  <><strong className="text-[#1f2732]">sign you in and run your account</strong> (authentication, profile, saved addresses, wishlist and bag);</>,
                  <><strong className="text-[#1f2732]">process and deliver your orders</strong> (payment, invoices, shipping, customs, returns and refunds);</>,
                  <><strong className="text-[#1f2732]">send you service emails</strong> such as order confirmations, shipping updates, one-time codes and password resets;</>,
                  <><strong className="text-[#1f2732]">answer your questions</strong> and handle support tickets;</>,
                  <><strong className="text-[#1f2732]">keep the website safe</strong> and prevent fraud and misuse;</>,
                  <><strong className="text-[#1f2732]">improve the website</strong> using usage information;</>,
                  <><strong className="text-[#1f2732]">meet our legal obligations</strong>, for example keeping invoices for accounting and tax.</>,
                ]}
              />
              <P>
                Under the EU General Data Protection Regulation (GDPR), we must have a legal reason (a “legal basis”) for
                each use:
              </P>
              <div className="my-2 overflow-x-auto border border-zinc-200">
                <table className="w-full border-collapse font-poppins text-[14px]">
                  <thead>
                    <tr>
                      {['What we do', 'Information used', 'Legal basis'].map((head) => (
                        <th key={head} className="border-b border-pink-100 bg-[#fef4f9] px-4 py-3 text-left font-play text-[14px] font-semibold text-[#1f2732]">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Create your account and sign you in', 'Name, email, Google or Facebook ID, password (hashed)', 'Contract with you'],
                      ['Process, deliver and return orders', 'Name, contact details, addresses, order and payment status', 'Contract with you'],
                      ['Send service emails', 'Name, email, order details', 'Contract with you'],
                      ['Deliver gift cards', 'Recipient’s name and email', 'Legitimate interest (delivering the gift you were sent)'],
                      ['Answer your questions', 'Your messages and contact details', 'Contract with you, or legitimate interest'],
                      ['Keep invoices and accounting records', 'Order and payment details', 'Legal obligation'],
                      ['Keep the website secure and prevent fraud', 'Technical data, IP address, account activity', 'Legitimate interest'],
                      ['Improve the website', 'Usage data (Microsoft Clarity)', 'Legitimate interest'],
                    ].map(([what, data, basis]) => (
                      <tr key={what}>
                        <td className="border-t border-zinc-100 px-4 py-3 align-top text-[#1f2732]">{what}</td>
                        <td className="border-t border-zinc-100 px-4 py-3 align-top text-[#344256]">{data}</td>
                        <td className="border-t border-zinc-100 px-4 py-3 align-top text-[#344256]">{basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <P>
                Where we rely on your consent, you can withdraw it at any time. We only use your information for a new
                purpose if it fits with why we collected it; otherwise we will tell you first.
              </P>
              <H3>If you don’t give us some information</H3>
              <P>
                Some details are needed to complete your order, such as your name, delivery address and email address. If
                you don’t provide them, we can’t process or deliver your order.
              </P>
              <Note label="In short:">
                <span className="text-[#344256]">
                  we do not sell your personal information, use it for advertising profiles, or make automated decisions
                  about you.
                </span>
              </Note>
            </Section>

            <Section id="google-and-facebook">
              <P>
                Information we receive from Google or Facebook sign-in (your name, email address and account ID) is used{' '}
                <strong className="text-[#1f2732]">only to create your I Want Jewels account and sign you in</strong>.
                Specifically:
              </P>
              <Bullets
                items={[
                  'we never sell this data or use it for advertising;',
                  'we do not share it with anyone, except the service providers listed below that host our website and send our emails, or where the law requires it;',
                  'our staff do not read it except when needed for security, to help you with a request, or to comply with the law;',
                  'we request only the basic sign-in permissions (name, email address and account ID) and nothing more.',
                ]}
              />
              <P>
                Our use of information received from Google APIs follows the{' '}
                <External href="https://developers.google.com/terms/api-services-user-data-policy">
                  Google API Services User Data Policy
                </External>
                , including its Limited Use requirements.
              </P>
              <P>
                You can disconnect I Want Jewels from your account at any time: for Google at{' '}
                <External href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</External>, and
                for Facebook under <em>Settings &amp; privacy → Settings → Apps and websites</em>. Disconnecting stops
                further sharing.
              </P>
              <Note label="See also:">
                <Jump to="delete-your-data">How to delete the data we already hold</Jump>
              </Note>
            </Section>

            <Section id="sharing">
              <P>
                We never sell or rent your personal information. We share it only with the service providers that help us
                run the shop, and only what each one needs to do its job for us:
              </P>
              <Bullets
                items={[
                  <><strong className="text-[#1f2732]">Stripe</strong> – processes card payments;</>,
                  <><strong className="text-[#1f2732]">FedEx and DHL Express</strong> – deliver your orders (name, address, phone number and, for customs, item details);</>,
                  <><strong className="text-[#1f2732]">Google</strong> – Google Sign-In, and Google Workspace, which we use to send our emails;</>,
                  <><strong className="text-[#1f2732]">Meta (Facebook)</strong> – Facebook Login;</>,
                  <><strong className="text-[#1f2732]">Netlify</strong> – hosts the website;</>,
                  <><strong className="text-[#1f2732]">Amazon Web Services</strong> – runs our servers and stores product images;</>,
                  <><strong className="text-[#1f2732]">MongoDB Atlas</strong> – our database;</>,
                  <><strong className="text-[#1f2732]">Microsoft Clarity</strong> – website usage analytics.</>,
                ]}
              />
              <P>
                Stripe processes payment information under its own{' '}
                <External href="https://stripe.com/privacy">privacy policy</External>. Product reviews you write are public
                and show your username.
              </P>
              <P>
                These providers may only use your information to provide their service to us. We may also disclose
                information when the law requires it (for example to tax authorities or a court), or to protect our rights
                or your safety. If our business were ever sold or merged, your information would be transferred only under
                this policy, and we would tell you.
              </P>
            </Section>

            <Section id="emails">
              <P>We only send emails connected to your account and orders, for example:</P>
              <Bullets
                items={[
                  'a welcome email and one-time codes to confirm your email, sign in safely or change your details;',
                  'order confirmations, shipment tracking and delivery confirmations;',
                  'gift card emails to you and to the person you send a gift card to, including an expiry reminder;',
                  'updates on returns and answers to your messages.',
                ]}
              />
              <P>
                We do not send marketing or newsletter emails at the moment. If we start, we will only send them if you
                have agreed (or, for existing customers, where the law allows it), and every message will include an
                unsubscribe link.
              </P>
            </Section>

            <Section id="international-transfers">
              <P>
                Some of our providers process data outside the European Economic Area, for example in the United States.
                When that happens, the transfer is protected by appropriate safeguards such as the European Commission’s
                Standard Contractual Clauses or the EU–US Data Privacy Framework.
              </P>
            </Section>

            <Section id="security">
              <Bullets
                items={[
                  'all traffic to iwantjewels.com is encrypted (HTTPS);',
                  'passwords are stored only in hashed form, and sensitive keys are stored encrypted;',
                  'card payments are handled by Stripe, which is certified to the PCI DSS security standard;',
                  'access to customer data is limited to staff who need it, and admin access is protected.',
                ]}
              />
              <P>
                No system is perfectly secure, but we work to protect your information and will inform you and the
                authorities if a breach affects you, as the law requires.
              </P>
            </Section>

            <Section id="retention">
              <Bullets
                items={[
                  <><strong className="text-[#1f2732]">Account information</strong> – until you delete your account or ask us to delete it.</>,
                  <><strong className="text-[#1f2732]">Orders and invoices</strong> – as long as Belgian accounting and tax law requires; after your account is deleted we keep them only for that purpose.</>,
                  <><strong className="text-[#1f2732]">Support messages</strong> – as long as needed to resolve your request and any follow-up.</>,
                  <><strong className="text-[#1f2732]">Server logs and usage data</strong> – only for a limited period, for security and to improve the website.</>,
                ]}
              />
            </Section>

            <Section id="your-rights">
              <P>Under the GDPR you have the right to:</P>
              <Bullets
                items={[
                  'access the personal information we hold about you and get a copy of it;',
                  'correct information that is wrong or incomplete;',
                  'have your information deleted;',
                  'restrict or object to how we use it;',
                  'receive your information in a portable format;',
                  'withdraw your consent at any time, where we rely on it.',
                ]}
              />
              <P>
                Using your rights is free. To protect your account, we may ask you to confirm your identity before we act
                on a request. If we can’t fully meet a request, for example because the law requires us to keep invoices,
                we will explain why.
              </P>
              <P>
                To use any of these rights, email <Email /> from the email address on your account. We reply within one
                month. If you are not satisfied, you can complain to the Belgian Data Protection Authority (
                <External href="https://www.dataprotectionauthority.be">dataprotectionauthority.be</External>) or the
                authority in your own country.
              </P>
            </Section>

            <Section id="delete-your-data">
              <P>To delete your account and personal information, including anything we received from Google or Facebook:</P>
              <ol className="space-y-3">
                {[
                  <>Email <Email /> with the subject <strong className="text-[#1f2732]">“Delete my data”</strong>, from the email address you use to sign in.</>,
                  'We may ask you to confirm the request so that nobody else can delete your account.',
                  'We delete your account and personal information within 30 days and confirm by email. Orders and invoices we must keep by law are kept only for that purpose and then deleted.',
                ].map((step, index) => (
                  <li key={index} className={`flex gap-4 ${body}`}>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fef4f9] font-play text-[14px] font-semibold text-pink-500">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <Note label="See also:">
                <Jump to="google-and-facebook">Remove I Want Jewels from your Google or Facebook account</Jump>
              </Note>
            </Section>

            <Section id="cookies">
              <P>We use a small number of cookies and browser storage items that the website needs to work:</P>
              <Bullets
                items={[
                  'your sign-in session, so you stay logged in;',
                  'your guest shopping bag, so it is still there when you return;',
                  'your language and currency choice.',
                ]}
              />
              <P>
                These are strictly necessary, so they don’t need your consent. If you choose to sign in with Google or
                Facebook, those services may set their own cookies under their own privacy policies.
              </P>
              <P>
                We do not use advertising cookies. Microsoft Clarity runs without analytics cookies. You can clear
                cookies and site data in your browser settings at any time; you will then be signed out and a guest bag
                will be emptied.
              </P>
            </Section>

            <Section id="other-websites">
              <P>
                Our website links to other services, such as our Instagram, Facebook and TikTok pages, WhatsApp, and
                Google or Facebook sign-in. When you use them, their own privacy policies apply, and we are not
                responsible for how they handle your information. We recommend reading their policies.
              </P>
            </Section>

            <Section id="children">
              <P>
                Our website is not intended for children under 16, and we do not knowingly collect their personal
                information. If you believe a child has given us personal information, contact us and we will delete it.
              </P>
            </Section>

            <Section id="changes">
              <P>
                We may update this policy when our services or the law change. The date at the top shows the latest
                version. If a change significantly affects how we use your information, we will tell you by email or on
                the website before it takes effect.
              </P>
            </Section>

            <Section id="contact">
              <div className="bg-[#fafaf8] px-6 py-5">
                <p className="font-play text-[18px] font-semibold text-[#1f2732]">I Want Jewels</p>
                <p className={`mt-1 ${body}`}>
                  Antwerp, Belgium
                  <br />
                  Email: <Email />
                  <br />
                  Phone: {CONTACT_PHONE}
                </p>
              </div>
            </Section>
          </article>
        </div>

        {/* 4. Questions band, as at the end of the resource articles */}
        <section className="border-t border-zinc-100 bg-[#fff7fb] px-6 py-14 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-[1480px] text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-pink-500">Your data, your choice</p>
            <h2 className="mt-3 font-play text-[24px] font-semibold text-zinc-900 sm:text-[30px]">
              Questions About Your Privacy?
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-poppins text-[14px] leading-7 text-zinc-600">
              Ask us anything about your data, or request a copy or deletion. We reply within one month, usually much
              sooner.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 bg-[#1f2732] px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-pink-500"
              >
                Email Us
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center border border-pink-400 bg-white px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-pink-500 transition hover:bg-pink-50"
              >
                Contact Page
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MobileStickyActions />
      <Footer />
    </div>
  )
}
