import { localizedAlternates } from '@/i18n/metadata'
import type { Metadata } from "next";
import BlogsIndexPage from "@/views/BlogsIndexPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = {
    title: "Blog — Tennis Bracelet & Necklace Guides | I Want Jewels",
    description:
        "Expert guides on tennis bracelets and tennis necklaces — buying tips, pricing, styling, sizing, and care advice for 2026."
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/blogs', locale),
  }
}

export default function Page() {
  return <BlogsIndexPage />
}
