import type { Metadata } from "next";
import { Montserrat, Play, Poppins } from "next/font/google";
import "../index.css";
import "./app.css";
import Providers from "../components/app/Providers";

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
    metadataBase: new URL("https://iwantjewels.com"),
    title: {
        default: "I Want Jewels | Lab-Grown Diamond Jewellery",
        template: "%s | I Want Jewels",
    },
    description:
        "Discover lab-grown diamond jewellery, engagement rings, earrings, necklaces and bracelets designed for modern everyday luxury.",
    alternates: {
        canonical: "https://iwantjewels.com",
    },
    openGraph: {
        title: "I Want Jewels | Lab-Grown Diamond Jewellery",
        description:
            "Discover lab-grown diamond jewellery, engagement rings, earrings, necklaces and bracelets designed for modern everyday luxury.",
        type: "website",
        url: "https://iwantjewels.com",
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${montserrat.variable} ${play.variable} ${poppins.variable}`}
        >
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
