import { buildPageMetadata } from "@/i18n/metadata";
import BlogsIndexPage from "@/views/BlogsIndexPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "blogs", "/blogs");
}

export default function Page() {
  return <BlogsIndexPage />;
}
