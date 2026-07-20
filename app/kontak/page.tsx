import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/Animations";
import { MapPin, MessageCircle, Camera, ShoppingBag, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak & Pemesanan",
  description:
    "Hubungi TAWSEC Banyusangka untuk pemesanan produk UMKM olahan laut. Tersedia via WhatsApp, Instagram, dan marketplace.",
};

export default function KontakPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-700 to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">Kontak &amp; Pemesanan</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Tertarik dengan produk kami? Hubungi kami langsung atau kunjungi toko online kami.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Kontak */}
          <div className="space-y-6">
            <FadeIn>
              <h2 className="font-serif font-bold text-navy-900 text-2xl mb-6">Cara Menghubungi Kami</h2>
            </FadeIn>

            {/* WhatsApp */}
            <FadeIn delay={0.1}>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-800 text-lg mb-1">WhatsApp (Utama)</h3>
                    <p className="text-navy-600 text-sm mb-4">
                      Cara tercepat untuk memesan produk dan bertanya tentang ketersediaan stok.
                    </p>
                    <a
                      href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20memesan%20produk%20TAWSEC%20Banyusangka."
                      target="_blank"
                      rel="noopener noreferrer"
                      id="kontak-wa-button"
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all hover:shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat WhatsApp Sekarang
                    </a>
                    <p className="text-navy-400 text-xs mt-3 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Respons dalam 1-2 jam (jam kerja)
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Instagram */}
            <FadeIn delay={0.2}>
              <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800 text-lg mb-1">Instagram</h3>
                    <p className="text-navy-600 text-sm mb-3">Follow akun kami untuk update produk terbaru dan konten menarik.</p>
                    <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-sm">
                      @tawsec.banyusangka (Segera Hadir)
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Marketplace */}
            <FadeIn delay={0.3}>
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800 text-lg mb-1">Marketplace</h3>
                    <p className="text-navy-600 text-sm mb-3">Toko online kami di berbagai platform marketplace.</p>
                    <div className="flex flex-wrap gap-2">
                      {["🛒 Shopee", "🎵 TikTok Shop"].map((m) => (
                        <span key={m} className="bg-gray-100 text-gray-500 text-sm px-3 py-1.5 rounded-full">
                          {m} — Segera Hadir
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Lokasi PPI */}
            <FadeIn delay={0.4}>
              <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800 text-lg mb-1">Lokasi Produksi</h3>
                    <p className="text-navy-700 font-medium text-sm">Desa Banyusangka, Kec. Tanjung Bumi</p>
                    <p className="text-navy-500 text-sm">Kab. Bangkalan, Pulau Madura, Jawa Timur</p>
                    <p className="text-primary-600 text-xs mt-2 font-semibold">
                      📍 Dekat PPI Banyusangka (Tipe D, est. 1978)
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Maps */}
          <FadeIn direction="right">
            <div>
              <h2 className="font-serif font-bold text-navy-900 text-2xl mb-6">Lokasi Desa Banyusangka</h2>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.5!2d113.02702!3d-6.88498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7d0c6a8a4e7d1%3A0x1234567890abcdef!2sBanyusangka%2C%20Tanjung%20Bumi%2C%20Bangkalan%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1720000000000!5m2!1sen!2sid"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Desa Banyusangka"
                />
              </div>
              <p className="text-navy-500 text-xs text-center">
                📍 6°53&apos;5.70&quot; LS, 113°1&apos;44.50&quot; BT — Desa Banyusangka, Bangkalan, Madura
              </p>

              {/* Info box */}
              <div className="mt-6 bg-navy-900 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-4">Program TAWSEC</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-primary-400 flex-shrink-0">🏛️</span>
                    <span className="text-white/80">UKM-F Penalaran AcSES FEB Universitas Airlangga</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-400 flex-shrink-0">📍</span>
                    <span className="text-white/80">Desa Banyusangka, Tanjung Bumi, Bangkalan</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-400 flex-shrink-0">📅</span>
                    <span className="text-white/80">Program aktif tahun 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
