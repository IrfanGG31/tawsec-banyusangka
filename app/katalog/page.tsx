import type { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import ProductCard from "@/components/katalog/ProductCard";
import produkData from "@/data/produk.json";
import { ShoppingBag, FileDown, Heart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "Katalog Produk UMKM Olahan Laut Banyusangka",
  description:
    "Katalog produk olahan laut UMKM Banyusangka: Abon Ikan Tongkol, Kerupuk Kulit Ikan, dan Tepung Tulang Ikan. Pesan eceran & grosir B2B.",
};

export default function KatalogPage() {
  const waB2B = `https://wa.me/${config.WA_NUMBER}?text=${encodeURIComponent(
    "Halo Tim TAWSEC Banyusangka, saya berminat untuk kemitraan grosir/B2B ritel produk olahan laut."
  )}`;

  return (
    <div className="pt-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-sunset-500 to-orange-600 text-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-xs sm:text-sm px-4 py-2 rounded-full mb-4 font-semibold">
              <ShoppingBag className="w-4 h-4 text-white" />
              Etalase UMKM Perempuan Pesisir Banyusangka
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mb-3">
              Katalog Produk Olahan Laut
            </h1>
            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Dibuat higienis tanpa bahan pengawet dari 100% ikan segar nelayan PPI Banyusangka oleh ibu-ibu binaan TAWSEC AcSES FEB UNAIR.
            </p>

            {/* B2B Download E-Catalog Button (Du Anyam Benchmark) */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <Link
                href="/modul"
                className="inline-flex items-center gap-2 bg-white text-sunset-600 hover:bg-gray-100 font-bold px-6 py-3 rounded-2xl shadow-lg transition-all text-xs sm:text-sm"
              >
                <FileDown className="w-4 h-4 text-sunset-600" />
                Download E-Katalog B2B &amp; Modul (PDF)
              </Link>
              <a
                href={waB2B}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sunset-700/60 hover:bg-sunset-700 border border-white/30 text-white font-semibold px-5 py-3 rounded-2xl transition-all text-xs sm:text-sm"
              >
                🤝 Kerjasama Grosir / Toko Oleh-oleh
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Info bar */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
            <div>
              <h2 className="font-serif font-bold text-navy-950 text-2xl">
                Semua Produk ({produkData.length} Varian Utama)
              </h2>
              <p className="text-navy-600 text-xs sm:text-sm mt-0.5 flex items-center gap-1.5 font-medium">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                Pemberdayaan Perempuan Pesisir Desa Banyusangka
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> NIB OSS &amp; Halal BPJPH
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Product Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {produkData.map((produk) => (
            <StaggerItem key={produk.id}>
              <ProductCard produk={produk} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Ordering Instructions (Kitabisa Benchmark) */}
        <FadeIn>
          <div className="bg-gradient-to-br from-navy-900 to-primary-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
            <h3 className="font-serif font-bold text-2xl text-center mb-8">Cara Pemesanan &amp; Pengiriman</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { step: "1", icon: "👆", title: "Pilih Varian", desc: "Pilih varian ukuran (100g, 250g, 500g, 1kg) yang diinginkan." },
                { step: "2", icon: "📱", title: "Klik Pesan WA", desc: "Formulir pesanan otomatis terisi langsung ke WhatsApp admin." },
                { step: "3", icon: "📦", title: "Pengiriman", desc: "Pengiriman cepat via ekspedisi ke seluruh Bangkalan, Surabaya &amp; Indonesia." },
              ].map((s) => (
                <div key={s.step} className="bg-white/10 border border-white/15 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">
                    {s.icon}
                  </div>
                  <p className="font-bold text-base text-white">{s.title}</p>
                  <p className="text-white/70 text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href={`https://wa.me/${config.WA_NUMBER}?text=${encodeURIComponent("Halo Tim TAWSEC Banyusangka, saya ingin memesan produk olahan laut.")}`}
                target="_blank"
                rel="noopener noreferrer"
                id="katalog-cta-wa"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:scale-105 transition-all text-sm"
              >
                📱 Pesan Langsung via WhatsApp ({config.WA_NUMBER})
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
