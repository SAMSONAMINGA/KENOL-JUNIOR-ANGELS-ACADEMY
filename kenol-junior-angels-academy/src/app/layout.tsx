import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kenol Junior Angels Academy | Strive To Excel, Sky is The Limit",
  description:
    "Kenol Junior Angels Academy - A nurturing, CBC-aligned learning environment for PP1, PP2 & Grades 1-8 in Kenol Town. Strong literacy, numeracy, and character foundation.",
  keywords: [
    "Kenol Junior Angels Academy",
    "Kenol school",
    "CBC school Kenol",
    "Primary school Kenol",
    "PP1 PP2 Grade 1-8",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
