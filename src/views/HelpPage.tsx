"use client";

import { Link } from "@/lib/router";
import { Clock3, Headset } from "lucide-react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-parsi">
            <Header />
            <main>
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            Homepage / Help
                        </p>
                        <h1 className="mt-3 text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                            Help Center
                        </h1>
                    </div>
                </section>

                <section className="mx-auto flex max-w-[1480px] flex-col items-start px-6 py-16 lg:px-10 lg:py-24">
                    <span className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-700">
                        <Clock3 className="h-3.5 w-3.5" />
                        Coming Soon
                    </span>

                    <h2 className="mt-6 max-w-3xl text-[28px] font-medium leading-tight tracking-[-0.01em] text-zinc-900 sm:text-[36px] lg:text-[48px]">
                        Our help center is on its way.
                    </h2>

                    <p className="mt-6 max-w-2xl text-[14px] leading-7 text-zinc-600 sm:text-[15px]">
                        We&apos;re putting the finishing touches on a dedicated
                        space with answers to common questions, ordering
                        guidance, care tips, and more. In the meantime, our
                        team is happy to help you directly.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-pink-500 px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-pink-600 sm:text-[13px]"
                        >
                            <Headset className="h-4 w-4" />
                            Contact Support
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center border border-zinc-800 bg-white px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-800 transition hover:bg-zinc-900 hover:text-white sm:text-[13px]"
                        >
                            Back to Home
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
