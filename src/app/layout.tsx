import type { Metadata } from "next";
import { Suspense } from "react";
import { getCategories } from "@/lib/api";
import Header from "@/components/Header";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import "@fontsource/noto-sans-bengali/400.css";
import "@fontsource/noto-sans-bengali/600.css";
import "@fontsource/noto-sans-bengali/700.css";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "বাজার দর | আজকের বাজারের দাম", template: "%s | বাজার দর" },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের বাজারভিত্তিক দাম এক নজরে।",
};
export const dynamic = "force-dynamic";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Shell stays usable if the category endpoint is temporarily unavailable.
  const categories = await getCategories().catch(() => []);
  return (
    <html lang="bn">
      <body>
        <a className="skip-link" href="#main-content">
          মূল বিষয়ে যান
        </a>
        <Header categories={categories} />
        <Suspense fallback={<div className="skeleton h-9" />}>
          <PriceTicker />
        </Suspense>
        <main id="main-content" className="container-width main-content">
          {children}
        </main>
        <Footer />
        <Providers />
      </body>
    </html>
  );
}
