import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import produkData from "@/data/produk.json";
import { formatRupiah, buildWaLink } from "@/lib/utils";
import { FadeIn } from "@/components/ui/Animations";
import {
  ArrowLeft, ShoppingCart, MessageCircle, Package,
  Thermometer, Clock, Users, CheckCircle, AlertCircle,
  Share2, ChevronRight
} from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return produkData.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const produk = produkData.find((p) => p.id === id);
  if (!produk) return { title: "Produk Tidak Ditemukan" };
  return {
    title: produk.nama,
    description: produk.deskripsi,
    openGraph: {
      title: `${produk.nama} | TAWSEC Banyusangka`,
      description: produk.tagline,
      images: [produk.foto[0]],
    },
  };
}

export default async function ProdukDetailPage({ params }: Props) {
  const { id } = await params;
  const produk = produkData.find((p) => p.id === id);
  if (!produk) notFound();

  const waLink = buildWaLink(produk.kontak_wa, produk.pesan_wa);
  const hargaMin = Math.min(...produk.varian.map((v) => v.harga));
  const hargaMax = Math.max(...produk.varian.map((v) => v.harga));
  const otherProducts = produkData.filter((p) => p.id !== produk.id);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-navy-500">
          <Link href="/" className="hover:text-primary-600 transition-colors">Beranda</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/katalog" className="hover:text-primary-600 transition-colors">Katalog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-navy-800 font-medium">{produk.nama}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image Gallery */}
          <FadeIn direction="left">
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src={produk.foto[0]}
                  alt={produk.nama}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {produk.kategori}
                  </span>
                  {produk.status_halal === "Dalam proses sertifikasi" && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Proses Halal
                    </span>
                  )}
                </div>
              </div>
              {produk.foto.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {produk.foto.map((f, i) => (
                    <div key={i} className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <Image src={f} alt={`${produk.nama} foto ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Product Info */}
          <FadeIn direction="right">
            <div>
              {/* Back button */}
              <Link
                href="/katalog"
                className="inline-flex items-center gap-1.5 text-navy-500 hover:text-primary-600 text-sm mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
              </Link>

              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {produk.kategori}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-2">
                {produk.nama}
              </h1>
              <p className="text-navy-500 text-lg mb-6 italic">{produk.tagline}</p>

              {/* Price */}
              <div className="bg-primary-50 rounded-2xl p-5 mb-6 border border-primary-100">
                <p className="text-primary-500 text-sm mb-1">Harga</p>
                <p className="font-bold text-primary-700 text-3xl">
                  {formatRupiah(hargaMin)}
                  {hargaMin !== hargaMax && (
                    <span className="text-lg text-primary-500"> — {formatRupiah(hargaMax)}</span>
                  )}
                </p>
              </div>

              {/* Variants */}
              <div className="mb-6">
                <p className="font-semibold text-navy-700 mb-3">Pilih Varian Ukuran</p>
                <div className="flex flex-wrap gap-3">
                  {produk.varian.map((v) => (
                    <div
                      key={v.ukuran}
                      className="border-2 border-primary-300 bg-primary-50 text-primary-700 rounded-xl px-4 py-3 text-center"
                    >
                      <p className="font-bold text-sm">{v.ukuran}</p>
                      <p className="text-xs text-primary-600">{formatRupiah(v.harga)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`produk-wa-${produk.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Pesan via WhatsApp
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`produk-beli-${produk.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Beli Sekarang
                </a>
              </div>

              {/* Marketplace placeholder */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <p className="text-navy-500 text-xs mb-2 font-semibold uppercase tracking-wider">Tersedia juga di</p>
                <div className="flex flex-wrap gap-2">
                  {["🛒 Shopee", "📸 Instagram Shop", "🎵 TikTok Shop"].map((m) => (
                    <span key={m} className="bg-gray-200 text-gray-500 text-xs px-3 py-1.5 rounded-full">
                      {m} (Segera Hadir)
                    </span>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs px-3 py-1.5 rounded-full font-semibold">
                  <CheckCircle className="w-3 h-3" /> Produk Higienis
                </span>
                <span className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-xs px-3 py-1.5 rounded-full font-semibold">
                  <CheckCircle className="w-3 h-3" /> Tanpa Pengawet Buatan
                </span>
                <span className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs px-3 py-1.5 rounded-full font-semibold">
                  <Users className="w-3 h-3" /> {produk.produsen}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Detail tabs */}
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Deskripsi */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-serif font-bold text-navy-900 text-lg mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary-500" /> Deskripsi Produk
              </h3>
              <p className="text-navy-600 text-sm leading-relaxed">{produk.deskripsi}</p>
            </div>

            {/* Komposisi */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-serif font-bold text-navy-900 text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Komposisi
              </h3>
              <ul className="space-y-2">
                {produk.komposisi.map((k, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-navy-700">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cara Penyimpanan */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-serif font-bold text-navy-900 text-lg mb-4 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-blue-500" /> Cara Penyimpanan
              </h3>
              <p className="text-navy-600 text-sm leading-relaxed">{produk.cara_penyimpanan}</p>
            </div>

            {/* Info Produk */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-serif font-bold text-navy-900 text-lg mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-sunset-500" /> Info Produk
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-navy-500">Produsen</span>
                  <span className="font-semibold text-navy-800">{produk.produsen}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-navy-500">Status Halal</span>
                  <span className="font-semibold text-yellow-700">{produk.status_halal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-500">Berat Bersih</span>
                  <span className="font-semibold text-navy-800">{produk.berat_bersih}</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Produk lainnya */}
        {otherProducts.length > 0 && (
          <FadeIn>
            <div>
              <h3 className="font-serif font-bold text-navy-900 text-2xl mb-6">Produk Lainnya</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/katalog/${p.id}`}
                    className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all group"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-primary-50">
                      <Image src={p.foto[0]} alt={p.nama} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-navy-900 group-hover:text-primary-700 transition-colors">
                        {p.nama}
                      </p>
                      <p className="text-primary-600 font-bold text-sm mt-1">
                        {formatRupiah(Math.min(...p.varian.map((v) => v.harga)))}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
