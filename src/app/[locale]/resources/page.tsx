import { buildPageMetadata } from "@/i18n/metadata";
import ResourcesPage from "../../../views/ResourcesPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "resources", "/resources");
}

export default function Page() {
  return <ResourcesPage />;
}
