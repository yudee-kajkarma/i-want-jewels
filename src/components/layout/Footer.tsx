import { Link } from "@/lib/router";
import logofooter from "@/assets/logofooter.avif";

const informationLinks = [
    { label: "Contact us", to: "/contact" },
    // { label: 'Career' },
    { label: "My Account", to: "/profile" },
    { label: "Order & Returns", to: "/orders" },
    // { label: 'FAQs' },
];

const quickShopLinks = [
    { label: "Necklace", to: "/products?category=Necklace" },
    { label: "Bracelet", to: "/products?category=Bracelet" },
    { label: "Rings", to: "/products?category=Ring" },
    { label: "Earrings", to: "/products?category=Earring" },
    // { label: 'Blog' },
];
const customerServiceLinks = [
    "FAQs",
    "Shipping",
    "Privacy Policy",
    "Return & Refund",
];
const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/iwantjewels/" },
    { name: "Facebook", href: "https://www.facebook.com/iwjewels/" },
    { name: "TikTok", href: "https://www.tiktok.com/@iwantjewelsofficial" },
];
// const paymentCards = ['150 x 86', '150 x 86', '150 x 86', '150 x 86', '150 x 86']

function FooterLink({ label, to }: { label: string; to?: string }) {
    const className = "transition hover:text-pink-500";

    if (to) {
        return (
            <Link to={to} className={className}>
                {label}
            </Link>
        );
    }

    return (
        <a href="#" className={className}>
            {label}
        </a>
    );
}

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M5 12h14" strokeLinecap="round" />
            <path
                d="m13 5 7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function SocialIcon({ name }: { name: string }) {
    const className = "h-5 w-5";

    switch (name) {
        case "Facebook":
            return (
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={className}
                    fill="currentColor"
                >
                    <path d="M13.3 21v-7.7h2.6l.4-3h-3V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.2c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.2H7.5v3h2.5V21h3.3Z" />
                </svg>
            );
        case "Instagram":
            return (
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={className}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                >
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <circle cx="12" cy="12" r="3.5" />
                    <circle
                        cx="17.2"
                        cy="6.8"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                    />
                </svg>
            );
        case "TikTok":
            return (
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={className}
                    fill="currentColor"
                >
                    <path d="M14.7 3.8c.6 1.4 1.5 2.5 2.7 3.3 1 .7 2.2 1.1 3.5 1.2v2.7a8.6 8.6 0 0 1-3.8-.9v5.2a5.9 5.9 0 1 1-5-5.8v2.8a3.1 3.1 0 1 0 2.2 3v-11.5h2.4Z" />
                </svg>
            );
        default:
            return (
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={className}
                    fill="currentColor"
                >
                    <path d="M12.4 4C8.1 4 5.8 6.9 5.8 10c0 1.9.7 3.6 2.3 4.2.3.1.5 0 .5-.3.1-.2.3-1 .3-1.2 0-.2 0-.3-.2-.5-.5-.6-.8-1.4-.8-2.4 0-3 2.2-5.6 5.8-5.6 3.2 0 4.9 1.9 4.9 4.5 0 3.4-1.5 6.2-3.8 6.2-1.2 0-2.1-1-1.8-2.2.3-1.5.9-3.1.9-4.1 0-.9-.5-1.7-1.5-1.7-1.2 0-2.2 1.3-2.2 3 0 1.1.4 1.8.4 1.8L9.2 18c-.4 1.6 0 3.6 0 3.8 0 .1.1.2.2.1.1-.1 1.5-1.8 1.9-3.4l.5-1.8c.5 1 1.8 1.8 3.2 1.8 4.2 0 7-3.8 7-8.8C22 7.2 18.4 4 12.4 4Z" />
                </svg>
            );
    }
}

export default function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-white">
            <div className="mx-auto  px-4 py-10 lg:px-10 lg:py-12">
                <div className="grid gap-8 lg:grid-cols-4 lg:gap-10">
                    <div>
                        <img
                            src={logofooter.src}
                            alt="I Want Jewel"
                            className="h-auto w-[100px] lg:w-[100px]"
                        />
                        <div className="mt-6 space-y-4 text-zinc-800">
                            <p className="flex text-base lg:text-lg">
                                <span className=" font-semibold">Mail:</span>
                                <span>info@iwantjewels.com</span>
                            </p>
                            {/* <p className="flex gap-3 text-base lg:text-lg">
                <span className="min-w-20 font-semibold">Phone:</span>
                <span>1-333-345-6868</span>
              </p>
              <p className="flex gap-3 text-base lg:text-lg">
                <span className="min-w-20 font-semibold">Address:</span>
                <span>xyz</span>
              </p> */}
                        </div>
                    </div>

                    <div className="space-y-3 text-base text-zinc-800 lg:text-lg">
                        <h4 className="text-xl font-semibold uppercase tracking-[0.01em] text-zinc-900">
                            Infomation
                        </h4>
                        {informationLinks.map((link) => (
                            <div key={link.label}>
                                <FooterLink label={link.label} to={link.to} />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 text-base text-zinc-800 lg:text-lg">
                        <h4 className="text-xl font-semibold uppercase tracking-[0.01em] text-zinc-900">
                            Quick Shop
                        </h4>
                        {quickShopLinks.map((link) => (
                            <div key={link.label}>
                                <FooterLink label={link.label} to={link.to} />
                            </div>
                        ))}
                    </div>

                    {/* <div className="space-y-3 text-base text-zinc-800 lg:text-lg">
                        <h4 className="text-xl font-semibold uppercase tracking-[0.01em] text-zinc-900">
                            Customer Services
                        </h4>
                        {customerServiceLinks.map((link) => (
                            <div key={link}>
                                <FooterLink label={link} />
                            </div>
                        ))}
                    </div> */}

                    <div>
                        <h4 className="text-xl font-semibold uppercase tracking-[0.01em] text-zinc-900">
                            Newletter
                        </h4>
                        <p className="mt-4 max-w-sm text-base leading-8 text-zinc-800 lg:text-lg">
                            Sign up for our newsletter and get 10% off your
                            first purchase
                        </p>

                        <form className="mt-5 flex max-w-[400px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_0_rgba(17,24,39,0.03)]">
                            <input
                                type="email"
                                placeholder="Enter your e-mail"
                                className="h-14 flex-1 px-5 text-base text-zinc-800 outline-none placeholder:text-zinc-400 lg:text-lg"
                            />
                            <button
                                type="submit"
                                className="m-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white transition hover:bg-zinc-800"
                            >
                                <ArrowIcon />
                            </button>
                        </form>

                        <div className="mt-6 flex items-center gap-7 text-zinc-900">
                            {socialLinks.map((socialLink) => (
                                <a
                                    key={socialLink.name}
                                    href={socialLink.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={socialLink.name}
                                    className="transition hover:text-pink-500"
                                >
                                    <SocialIcon name={socialLink.name} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-center border-t border-zinc-200 pt-5 text-center text-base text-zinc-600 lg:text-lg">
                    <div className="flex justify-center">
                        <p>©2026 I Want Jewel. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
