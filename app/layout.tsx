import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Quran Wiki",
    authors: [{ name: "Karim Davoodi" }],
    keywords: ["Quran", "Hadith", "Islam", "Quran Wiki", "Bible"],
    category: "Quran",
    classification: "Religious texts",
    abstract:
        "Quran Wiki is Application to understand the meaning of the Quran by connecting its verse to other verses and Hadith and Bible.",
    description:
        "Quran Wiki is Application to understand Quran by connecting Quran verses to other religious texts",
    manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
