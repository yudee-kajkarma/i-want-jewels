import { buildPageMetadata } from "@/i18n/metadata";
import AboutPage from "../../../views/AboutPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "about", "/about");
}

export default function Page() {
  return <AboutPage />;
}
