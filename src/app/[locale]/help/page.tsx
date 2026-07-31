import { buildPageMetadata } from "@/i18n/metadata";
import HelpPage from "../../../views/HelpPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "help", "/help");
}

export default function Page() {
  return <HelpPage />;
}
