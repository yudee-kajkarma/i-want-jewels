import type { Metadata } from "next";
import { Montserrat, Raleway, Play, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "../index.css";
import "./app.css";
import Providers from "../components/app/Providers";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-montserrat",
    display: "swap",
});
const raleway = Raleway({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-raleway",
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

const parsi = localFont({
    src: [
        {
            path: "../assets/fonts/parsi/Parsi-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../assets/fonts/parsi/Parsi-Light.woff",
            weight: "300",
            style: "normal",
        },
        {
            path: "../assets/fonts/parsi/Parsi-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../assets/fonts/parsi/Parsi-Regular.woff",
            weight: "400",
            style: "normal",
        },
        {
            path: "../assets/fonts/parsi/Parsi-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../assets/fonts/parsi/Parsi-Bold.woff",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-parsi",
    display: "swap",
});

export const metadata: Metadata = {
    title: "I Want Jewels",
    description: "Jewellery storefront migrated to Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${montserrat.variable} ${raleway.variable} ${play.variable} ${poppins.variable} ${parsi.variable}`}
        >
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
