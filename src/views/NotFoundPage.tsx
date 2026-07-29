"use client";

import { Link } from "@/lib/router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-poppins">
            <Header />

            <main>
                <section className="flex flex-col items-center px-6 py-24 text-center lg:py-36">
                    <h1 className="mt-3 text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                        {t("notFound.title", "Page Not Found")}
                    </h1>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-600">
                        {t("notFound.description", "The page you are looking for doesn't exist or may have been moved. Perhaps one of our collections holds what you were after.")}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            to="/products"
                            className="inline-flex h-[50px] items-center bg-zinc-900 px-8 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-zinc-700 sm:text-[13px]"
                        >
                            {t("notFound.shopBtn", "Shop the Collection")}
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex h-[50px] items-center border border-zinc-300 px-8 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-900 transition hover:border-zinc-900 sm:text-[13px]"
                        >
                            {t("notFound.homeBtn", "Back to Homepage")}
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
