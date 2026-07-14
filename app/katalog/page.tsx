import type { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import ProductCard from "@/components/katalog/ProductCard";
import produkData from "@/data/produk.json";
import { ShoppingBag, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Katalog Produk UMKM",
  description:
    "Katalog produk olahan laut UMKM Banyusangka: Abon Ikan Tongkol, Kerupuk Kulit Ikan, dan Tepung Tulang Ikan. Pesan langsung via WhatsApp.",
};

export default function KatalogPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-sunset-500 to-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sm px-4 py-2 rounded-full mb-6">
              <ShoppingBag className="w-4 h-4" />
              Produk UMKM Olahan Laut
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Katalog Produk Banyusangka
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Produk olahan laut higienis, dibuat oleh ibu-ibu UMKM dampingan program
              TAWSEC dari bahan baku segar nelayan Desa Banyusangka.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Info bar */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif font-bold text-navy-900 text-xl">
                Semua Produk ({produkData.length} produk)
              </h2>
              <p className="text-navy-500 text-sm mt-0.5">
                Pesan langsung via WhatsApp — pengiriman ke seluruh Indonesia
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Stok Tersedia
            </div>
          </div>
        </FadeIn>

        {/* Product Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {produkData.map((produk) => (
            <StaggerItem key={produk.id}>
              <ProductCard produk={produk} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Order info */}
        <FadeIn>
          <div className="bg-gradient-ocean rounded-3xl p-8 text-white text-center">
            <h3 className="font-serif font-bold text-2xl mb-3">Cara Memesan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {[
                { step: "1", icon: "👆", title: "Pilih Produk", desc: "Klik produk yang diinginkan untuk melihat detail lengkap." },
                { step: "2", icon: "📱", title: "Klik Pesan WA", desc: "Tekan tombol Pesan via WhatsApp. Pesan otomatis terisi." },
                { step: "3", icon: "✅", title: "Konfirmasi", desc: "Diskusikan alamat & ongkir dengan admin, selesai!" },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">
                    {s.icon}
                  </div>
                  <p className="font-bold text-lg">{s.title}</p>
                  <p className="text-white/70 text-sm mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20memesan%20produk%20TAWSEC%20Banyusangka."
              target="_blank"
              rel="noopener noreferrer"
              id="katalog-cta-wa"
              className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              📱 Hubungi Kami via WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
