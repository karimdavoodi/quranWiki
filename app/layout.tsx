import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Quran Wiki",
    authors: [{ name: "Karim Davoodi" }],
    keywords: [
        "Quran",
        "Hadith",
        "Islam",
        "Islamic books",
        "Quran Wiki",
        "Bible",
    ],
    abstract:
        "QuranWiki is an application that helps us understand the Quran by connecting its verses to other religious texts.",
    description:
        "QuranWiki is an application that helps us understand the Quran by connecting its verses to other religious texts.",
    manifest: "/manifest.json",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
