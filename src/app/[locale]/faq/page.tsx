import { buildPageMetadata } from "@/i18n/metadata";
import FAQPage from "@/views/FaqPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "faq", "/faq");
}

export default function Page() {
    return <FAQPage />;
}
