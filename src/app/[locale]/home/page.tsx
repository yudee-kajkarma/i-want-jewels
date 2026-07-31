import { redirect } from "next/navigation";
import { getLocalizedPath } from "@/i18n/routing";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(getLocalizedPath(locale, "/"));
}
