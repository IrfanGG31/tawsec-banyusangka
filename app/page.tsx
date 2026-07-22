"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import {
  ArrowRight, ShieldCheck, ShoppingBag, ChevronRight,
  Package, Store, Users, Compass, MapPin, Layers, Phone
} from "lucide-react";
import produkData from "@/data/produk.json";
import { createClient } from "@/lib/supabase/client";
import NewsCarousel from "@/components/home/NewsCarousel";

interface DampakItem {
  id: string;
  label: string;
  angka: string;
  satuan: string;
  icon?: string;
}

const defaultDampak: DampakItem[] = [
  { id: "1", label: "Kemasan Siap Pemasaran", angka: "500+", satuan: "Pcs", icon: "Package" },
  { id: "2", label: "Kelompok Usaha Bersama (KUB)", angka: "10", satuan: "Unit Usaha", icon: "Store" },
  { id: "3", label: "Warga Pesisir Terlatih", angka: "45+", satuan: "Orang", icon: "Users" },
];

const jelajahiCards = [
  {
    href: "/tentang-desa",
    title: "Profil Desa Banyusangka",
    desc: "Gambaran wilayah pesisir Tanjung Bumi, kependudukan, dan potensi perikanan PPI.",
    image: "/images/galeri/nelayan-1.png",
    icon: <MapPin className="w-4 h-4 text-sky-600" />,
    tag: "Potensi Desa",
  },
  {
    href: "/program-tawsec",
    title: "Program & 4 Pilar TAWSEC",
    desc: "Struktur pelatihan 4 pilar, timeline, luaran, dan dashboard progress 9 KPI.",
    image: "/images/galeri/pelatihan-1.png",
    icon: <Layers className="w-4 h-4 text-emerald-600" />,
    tag: "Strategi",
  },
  {
    href: "/katalog",
    title: "Katalog Olahan Laut",
    desc: "Produk higienis Abon Ikan Tongkol, Kerupuk Kulit Ikan, dan Tepung Tulang Ikan.",
    image: "/images/galeri/display-1.png",
    icon: <ShoppingBag className="w-4 h-4 text-orange-600" />,
    tag: "E-Commerce",
  },
  {
    href: "/tim-mitra",
    title: "Tim & Kontak Pemesanan",
    desc: "15 mahasiswa UNAIR, dosen pembimbing, mitra kelembagaan, & kontak WhatsApp.",
    image: "/images/anggota/tim-group-1.jpg",
    icon: <Phone className="w-4 h-4 text-rose-600" />,
    tag: "Kelembagaan",
  },
];

export default function HomePage() {
  const [dampakList, setDampakList] = useState<DampakItem[]>(defaultDampak);

  useEffect(() => {
    const fetchDynamicData = async () => {
      const supabase = createClient();
      if (supabase) {
        try {
          const { data: dData } = await supabase.from("dampak").select("*");
          if (dData && dData.length > 0) setDampakList(dData as DampakItem[]);
        } catch {
          // Fallback
        }
      }
    };
    fetchDynamicData();
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-16">
      {/* ===== HERO BANNER ===== */}
      <section className="relative min-h-[500px] sm:min-h-[560px] flex items-center overflow-hidden bg-navy-950 text-white border-b border-slate-800">
        {/* Background HD Ocean Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banyusangka-hd.png"
            alt="Pemandangan Laut Pesisir Desa Banyusangka"
            fill
            className="object-cover object-center brightness-90 contrast-110 scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-14 sm:py-20">
          <div className="max-w-3xl space-y-6">
            <FadeIn>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] drop-shadow-lg">
                Transformasi Olahan Laut &amp; <span className="text-gradient-ocean font-serif">Ekonomi Pesisir Banyusangka</span>
              </h1>

              <p className="text-slate-100 text-base sm:text-lg leading-relaxed max-w-2xl mt-4 drop-shadow font-normal">
                Inovasi <strong>Zero Waste</strong> pengolahan ikan layang &amp; tongkol oleh perempuan nelayan Desa Banyusangka. Mengubah sisa tangkapan melimpah menjadi produk olahan bernilai tambah tinggi.
              </p>
            </FadeIn>

            {/* Action Buttons */}
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/katalog"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-sunset-500 to-orange-600 hover:from-sunset-600 hover:to-orange-700 text-white font-bold py-3.5 px-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 text-sm sm:text-base"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Lihat Katalog Produk
                </Link>

                <Link
                  href="/program-tawsec"
                  className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md hover:bg-white/25 border border-white/40 text-white font-semibold py-3.5 px-6 rounded-2xl shadow transition-all text-sm sm:text-base"
                >
                  <Compass className="w-5 h-5 text-sky-300" />
                  Tentang Program TAWSEC
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: SLIDE CAROUSEL BERITA TERKINI ===== */}
      <NewsCarousel />

      {/* ===== SECTION 3: JELAJAHI TAWSEC BANYUSANGKA (4 KARTU NAVIGASI COMPACT) ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200">
            Peta Navigasi Cepat
          </span>
          <h2 className="font-serif font-bold text-navy-950 text-2xl sm:text-3xl mt-2">
            Jelajahi Platform TAWSEC Banyusangka
          </h2>
          <p className="text-navy-600 text-xs sm:text-sm mt-1">
            Pintu masuk utama untuk mengenal potensi desa, program pengabdian, katalog produk, dan kontak tim.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {jelajahiCards.map((card, idx) => (
            <StaggerItem key={idx}>
              <Link
                href={card.href}
                className="group bg-white border border-gray-200 hover:border-primary-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute top-2 left-2 bg-navy-950/80 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                      {card.tag}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {card.icon}
                      <h3 className="font-serif font-bold text-navy-950 text-sm group-hover:text-primary-600 transition-colors leading-tight">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-navy-600 text-xs leading-relaxed line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs font-bold text-sky-700 group-hover:text-sky-800">
                  <span>Buka Halaman</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ===== SECTION 4: ANGKA DAMPAK PROGRAM ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-navy-900 to-primary-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {dampakList.map((d) => (
              <div key={d.id} className="pt-6 sm:pt-0 sm:px-6 first:pt-0">
                <p className="font-serif font-extrabold text-4xl sm:text-5xl text-amber-400 leading-none mb-2">
                  {d.angka}
                </p>
                <p className="font-semibold text-sm sm:text-base text-white">{d.label}</p>
                <p className="text-xs text-sky-200 mt-0.5 font-medium">{d.satuan}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: PRODUK KHAS DESA ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
              Etalase Produk Khas
            </span>
            <h2 className="font-serif font-bold text-navy-950 text-2xl sm:text-3xl mt-2">
              Produk Olahan Laut Banyusangka
            </h2>
            <p className="text-navy-600 text-xs sm:text-sm mt-1">
              Diproduksi higienis oleh ibu-ibu ngojur dengan standar kualitas pangan &amp; Zero Waste.
            </p>
          </div>

          <Link
            href="/katalog"
            className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 px-4 py-2 rounded-xl border border-sky-200 hover:bg-sky-100 transition-all"
          >
            <span>Lihat Semua Katalog &amp; Detail Varian</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Streamlined Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {produkData.slice(0, 3).map((prod) => {
            const minPrice = prod.varian ? Math.min(...prod.varian.map((v) => v.harga)) : 15000;
            return (
              <div
                key={prod.id}
                className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={prod.foto[0] || "/images/galeri/display-1.png"}
                      alt={prod.nama}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        Zero Waste
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                      {prod.kategori}
                    </span>

                    <h3 className="font-serif font-bold text-navy-950 text-xl mt-2 mb-1 group-hover:text-sky-600 transition-colors">
                      {prod.nama}
                    </h3>

                    <p className="text-navy-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {prod.tagline}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-navy-400 block font-medium">Mulai dari:</span>
                        <span className="font-bold text-emerald-700 text-base sm:text-lg">
                          Rp {minPrice.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-navy-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                        {prod.varian?.[0]?.ukuran || "100g"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/katalog/${prod.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Detail Produk &amp; Pesan
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== SECTION 6: KESAN DUKUNGAN TOKOH BANYUSANGKA ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-2 border-white">
            <Image
              src="/images/galeri/hero_desa_1784057776565.png"
              alt="H. Abd. Syukur"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Dukungan Pemerintah Desa Banyusangka
            </div>

            <blockquote className="font-serif font-semibold text-navy-950 text-base sm:text-lg leading-snug">
              &quot;Pendampingan dari mahasiswa Universitas Airlangga ini sangat membantu ibu-ibu nelayan kami mengolah hasil laut menjadi produk bernilai tinggi yang siap bersaing.&quot;
            </blockquote>

            <p className="text-navy-600 text-xs sm:text-sm font-medium">
              <strong className="text-navy-900">H. Abd. Syukur</strong> — Kepala Desa Banyusangka, Kec. Tanjung Bumi, Bangkalan
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
