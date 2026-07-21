"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import {
  ArrowRight, ShieldCheck, ShoppingBag, BookOpen, ChevronRight,
  Sparkles, Package, Store, Users, Compass
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

export default function HomePage() {
  const [dampakList, setDampakList] = useState<DampakItem[]>(defaultDampak);

  useEffect(() => {
    const fetchDampak = async () => {
      const supabase = createClient();
      if (supabase) {
        try {
          const { data, error } = await supabase.from("dampak").select("*");
          if (!error && data && data.length > 0) {
            setDampakList(data as DampakItem[]);
          }
        } catch {
          // Fallback to default
        }
      }
    };
    fetchDampak();
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-16">
      {/* ===== MAJESTIC CRYSTAL-CLEAR OCEAN HERO BANNER ===== */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center overflow-hidden bg-navy-950 text-white">
        {/* Background HD Ocean Image with High Sharpness & Vibrant Contrast */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banyusangka-hd.png"
            alt="Pemandangan Laut Pesisir Desa Banyusangka"
            fill
            className="object-cover object-center brightness-90 contrast-110 scale-105"
            priority
            sizes="100vw"
          />
          {/* Subtle directional gradient so text is 100% readable while ocean view stays crisp & bright */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-xs font-bold text-sky-200 uppercase tracking-wider shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-400" />
                UNAIR SUSTAINACTION 2026 × UKM-F Penalaran AcSES FEB UNAIR
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mt-4 drop-shadow-lg">
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
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-sunset-500 to-orange-600 hover:from-sunset-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 text-sm sm:text-base"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Lihat Katalog Produk
                </Link>

                <Link
                  href="/program-tawsec"
                  className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md hover:bg-white/25 border border-white/40 text-white font-semibold py-4 px-7 rounded-2xl shadow transition-all text-sm sm:text-base"
                >
                  <Compass className="w-5 h-5 text-sky-300" />
                  Pelajari Program TAWSEC
                </Link>
              </div>
            </FadeIn>

            {/* Quick Trust Badges */}
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs sm:text-sm font-semibold text-slate-200 border-t border-white/20">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> NIB OSS &amp; Sertifikat Halal BPJPH
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-400" /> Modul &amp; Perdes Keberlanjutan
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== NEWS & ACTIVITY CAROUSEL (INDORELAWAN BENCHMARK) ===== */}
      <NewsCarousel />

      {/* ===== CAPAIAN & ANGKA DAMPAK PROGRAM ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-navy-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
                🚀 Dampak Program
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Hasil &amp; Target Pengabdian
              </h2>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Capaian pemberdayaan ekonomi pesisir UKM-F Penalaran AcSES FEB UNAIR di Desa Banyusangka.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dampakList.map((d) => (
                <div key={d.id} className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-5 text-center hover:bg-slate-800 transition-all shadow-md">
                  <div className="text-2xl mb-1 text-emerald-400">
                    {d.icon === "Package" ? <Package className="w-6 h-6 mx-auto" /> : d.icon === "Store" ? <Store className="w-6 h-6 mx-auto" /> : <Users className="w-6 h-6 mx-auto" />}
                  </div>
                  <div className="font-serif font-bold text-3xl sm:text-4xl text-white">
                    {d.angka}
                  </div>
                  <div className="text-emerald-300 text-xs font-medium">{d.satuan}</div>
                  <div className="text-white/90 text-xs font-semibold mt-1">{d.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUK UNGGULAN (KATALOG RINGKAS) ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
              🛒 Produk Khas Desa
            </span>
            <h2 className="font-serif font-bold text-navy-950 text-3xl mt-2">
              Olahan Laut Khas Banyusangka
            </h2>
            <p className="text-navy-600 text-sm mt-1">
              Dibuat higienis dari ikan segar tangkapan nelayan lokal oleh ibu-ibu UMKM binaan TAWSEC.
            </p>
          </div>

          <Link
            href="/katalog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-800 bg-primary-50 hover:bg-primary-100 px-4 py-2.5 rounded-xl transition-all"
          >
            Lihat Semua Produk <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Main Product Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {produkData.map((prod) => (
            <StaggerItem key={prod.id}>
              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full">
                <div>
                  <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={prod.foto[0] || "/images/galeri/display-1.png"}
                      alt={prod.nama}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {prod.kategori}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif font-bold text-navy-950 text-xl group-hover:text-primary-600 transition-colors mb-1">
                      {prod.nama}
                    </h3>
                    <p className="text-navy-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {prod.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prod.varian.map((v) => (
                        <span key={v.ukuran} className="bg-gray-100 text-navy-700 text-[10px] font-medium px-2 py-0.5 rounded-md">
                          {v.ukuran}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-50 mt-2">
                  <div>
                    <span className="text-[10px] text-navy-400 block font-medium">Mulai dari</span>
                    <span className="font-serif font-bold text-primary-700 text-lg">
                      Rp {prod.varian[0].harga.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <Link
                    href={`/katalog/${prod.id}`}
                    className="inline-flex items-center gap-1 bg-sunset-500 hover:bg-sunset-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Pesan
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ===== TESTIMONI KEPALA DESA ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-primary-50 to-emerald-50 border border-primary-100 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-primary-600 flex items-center justify-center text-white text-3xl font-serif font-bold shadow-lg flex-shrink-0">
              “
            </div>
            <div className="flex-1 space-y-3 text-center md:text-left">
              <blockquote className="font-serif italic text-navy-900 text-base sm:text-lg leading-relaxed">
                &ldquo;Kami menyambut baik dan mendukung penuh program TAWSEC dari Ormawa AcSES FEB UNAIR. Pelatihan olahan ikan ini terbukti memberikan keterampilan nyata bagi masyarakat Banyusangka untuk mengolah hasil laut mandiri.&rdquo;
              </blockquote>
              <div>
                <strong className="text-navy-950 font-bold text-sm block">H. Abd. Syukur</strong>
                <span className="text-navy-500 text-xs">Kepala Desa Banyusangka, Kecamatan Tanjungbumi, Bangkalan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION BANNER ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-sunset-500 to-orange-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-3">
            Dukung Kemandirian Ekonomi Perempuan Pesisir Banyusangka
          </h2>
          <p className="text-white/90 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Dapatkan produk olahan laut segar tanpa pengawet berkualitas tinggi, langsung dari hasil tangkapan nelayan lokal.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/katalog"
              className="bg-white text-sunset-600 hover:bg-gray-100 font-bold py-3.5 px-8 rounded-2xl shadow-lg transition-all text-sm"
            >
              Beli Produk Sekarang 🛍️
            </Link>
            <Link
              href="/kontak"
              className="bg-sunset-700/60 hover:bg-sunset-700 text-white font-semibold py-3.5 px-6 rounded-2xl border border-white/30 transition-all text-sm"
            >
              Hubungi Tim TAWSEC
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
