import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TAWSEC Banyusangka — Etalase UMKM Olahan Laut Desa Banyusangka",
    template: "%s | TAWSEC Banyusangka",
  },
  description:
    "Website resmi Desa Banyusangka dan program TAWSEC (Transformasi Ekonomi Pesisir melalui Sinergi Aksi Mandiri) UNAIR SUSTAINACTION 2026 oleh UKM-F Penalaran AcSES FEB Universitas Airlangga.",
  keywords: [
    "TAWSEC",
    "AcSES FEB UNAIR",
    "UNAIR SUSTAINACTION",
    "Desa Banyusangka",
    "Bangkalan",
    "Madura",
    "UMKM olahan laut",
    "abon ikan",
    "kerupuk ikan",
    "Universitas Airlangga",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "TAWSEC Banyusangka",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
