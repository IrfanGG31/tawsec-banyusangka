import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
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
    "Website resmi Desa Banyusangka dan program TAWSEC (Transformasi Ekonomi Pesisir melalui Sinergi Aksi Mandiri) LPMB Universitas Airlangga. Temukan produk UMKM olahan laut berkualitas: abon ikan, kerupuk ikan, dan tepung tulang ikan.",
  keywords: [
    "TAWSEC",
    "Desa Banyusangka",
    "Bangkalan",
    "Madura",
    "UMKM olahan laut",
    "abon ikan",
    "kerupuk ikan",
    "Universitas Airlangga",
    "KKN Unair",
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
      </body>
    </html>
  );
}
