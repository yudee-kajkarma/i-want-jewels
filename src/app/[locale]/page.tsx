import { buildPageMetadata } from "@/i18n/metadata";
import HomePage from "../../views/HomePage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "home", "/");
}

export default function Page() {
  return <HomePage />;
}
