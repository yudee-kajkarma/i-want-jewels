import { buildPageMetadata } from "@/i18n/metadata";
import ContactPage from "../../../views/ContactPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "contact", "/contact");
}

export default function Page() {
  return <ContactPage />;
}
