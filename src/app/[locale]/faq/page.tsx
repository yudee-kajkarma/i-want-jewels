import { buildPageMetadata } from "@/i18n/metadata";
import FAQPage from "@/views/FaqPage";
import { faqPageSchema } from "@/lib/structuredData";
import { getTranslation } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "faq", "/faq");
}

export default async function Page({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const { t } = await getTranslation(locale, "common");

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqPageSchema(t)),
                }}
            />
            <FAQPage />
        </>
    );
}
