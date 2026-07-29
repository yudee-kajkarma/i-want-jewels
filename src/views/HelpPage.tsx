"use client";

import { Link } from "@/lib/router";
import { Clock3, Headset } from "lucide-react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useTranslation } from "react-i18next";

export default function HelpPage() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-poppins">
            <Header />
            <main>
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            {t("help.breadcrumbs")}
                        </p>
                        <h1 className="mt-3 text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                            {t("help.title")}
                        </h1>
                    </div>
                </section>

                <section className="mx-auto flex max-w-[1480px] flex-col items-start px-6 py-16 lg:px-10 lg:py-24">
                    <span className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-700">
                        <Clock3 className="h-3.5 w-3.5" />
                        {t("help.comingSoon")}
                    </span>

                    <h2 className="mt-6 max-w-3xl text-[28px] font-medium leading-tight tracking-[-0.01em] text-zinc-900 sm:text-[36px] lg:text-[48px]">
                        {t("help.heading")}
                    </h2>

                    <p className="mt-6 max-w-2xl text-[14px] leading-7 text-zinc-600 sm:text-[15px]">
                        {t("help.description")}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <Link
                            to="/resources"
                            className="inline-flex items-center gap-2 bg-[#17110d] px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-black sm:text-[13px]"
                        >
                            {t("help.browseGuidesBtn")}
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 border border-zinc-800 bg-white px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-800 transition hover:bg-zinc-900 hover:text-white sm:text-[13px]"
                        >
                            <Headset className="h-4 w-4" />
                            {t("help.contactBtn")}
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center border border-zinc-300 bg-white px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-600 transition hover:bg-zinc-100 sm:text-[13px]"
                        >
                            {t("help.homeBtn")}
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
