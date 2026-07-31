import type { Metadata } from "next";
import { Montserrat, Play, Poppins } from "next/font/google";
import "../../index.css";
import "./app.css";
import Providers from "../../components/app/Providers";
import { dir } from "i18next";
import { getTranslation, namespaces } from "../../i18n";
import { getLocalizedStaticParams } from "../../i18n/settings";
import { I18nProvider } from "../../i18n/I18nProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});
const play = Play({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-play",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.iwantjewels.com"),
  title: {
    default: "I Want Jewels | Lab Grown Diamond Jewellery",
    template: "%s | I Want Jewels",
  },
  description:
    "Shop lab grown diamond earrings, tennis bracelets and demi-fine jewellery. I Want Jewels is a sustainable jewellery brand that creates beautiful pieces for everyday wear.",
};

export async function generateStaticParams() {
  return getLocalizedStaticParams();
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { resources } = await getTranslation(locale, [...namespaces]);

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${montserrat.variable} ${play.variable} ${poppins.variable}`}
    >
      <body>
        <I18nProvider locale={locale} resources={resources}>
          <Providers>{children}</Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
