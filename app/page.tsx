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

interface HeroData {
  judul: string;
  subtitle: string;
  cta1_label: string;
  cta1_href: string;
  cta2_label: string;
  cta2_href: string;
  bg_image: string;
}

interface TestimonialData {
  quote: string;
  nama: string;
  jabatan: string;
  foto: string;
}

const defaultDampak: DampakItem[] = [
  { id: "1", label: "Kemasan Siap Pemasaran", angka: "500+", satuan: "Pcs", icon: "Package" },
  { id: "2", label: "Kelompok Usaha Bersama (KUB)", angka: "10", satuan: "Unit Usaha", icon: "Store" },
  { id: "3", label: "Warga Pesisir Terlatih", angka: "45+", satuan: "Orang", icon: "Users" },
];

const defaultHero: HeroData = {
  judul: "Transformasi Olahan Laut & Ekonomi Pesisir Banyusangka",
  subtitle: "Inovasi Zero Waste pengolahan ikan layang & tongkol oleh perempuan nelayan Desa Banyusangka. Mengubah sisa tangkapan melimpah menjadi produk olahan bernilai tambah tinggi.",
  cta1_label: "Lihat Katalog Produk",
  cta1_href: "/katalog",
  cta2_label: "Tentang Program TAWSEC",
  cta2_href: "/program-tawsec",
  bg_image: "/images/hero-banyusangka-hd.png",
};

const defaultTestimonial: TestimonialData = {
  quote: "Pendampingan dari mahasiswa Universitas Airlangga ini sangat membantu ibu-ibu nelayan kami mengolah hasil laut menjadi produk bernilai tinggi yang siap bersaing.",
  nama: "H. Abd. Syukur",
  jabatan: "Kepala Desa Banyusangka, Kec. Tanjung Bumi, Bangkalan",
  foto: "/images/galeri/hero_desa_1784057776565.png",
};

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
  const [hero, setHero] = useState<HeroData>(defaultHero);
  const [testimonial, setTestimonial] = useState<TestimonialData>(defaultTestimonial);

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

      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const settings = await res.json();
          if (settings.hero) setHero({ ...defaultHero, ...settings.hero });
          if (settings.testimonial) setTestimonial({ ...defaultTestimonial, ...settings.testimonial });
        }
      } catch {
        // Fallback to default
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
            src={hero.bg_image || "/images/hero-banyusangka-hd.png"}
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
                {hero.judul}
              </h1>

              <p className="text-slate-100 text-base sm:text-lg leading-relaxed max-w-2xl mt-4 drop-shadow font-normal">
                {hero.subtitle}
              </p>
            </FadeIn>

            {/* Action Buttons */}
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={hero.cta1_href || "/katalog"}
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-sunset-500 to-orange-600 hover:from-sunset-600 hover:to-orange-700 text-white font-bold py-3.5 px-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 text-sm sm:text-base"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {hero.cta1_label || "Lihat Katalog Produk"}
                </Link>

                <Link
                  href={hero.cta2_href || "/program-tawsec"}
                  className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md hover:bg-white/25 border border-white/40 text-white font-semibold py-3.5 px-6 rounded-2xl shadow transition-all text-sm sm:text-base"
                >
                  <Compass className="w-5 h-5 text-sky-300" />
                  {hero.cta2_label || "Tentang Program TAWSEC"}
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
                  <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-gray-200 text-[10px] font-bold text-navy-800 flex items-center gap-1 shadow-sm">
                      {card.icon}
                      <span>{card.tag}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-serif font-bold text-navy-900 text-base group-hover:text-primary-600 transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-navy-500 text-xs leading-relaxed line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-1 flex items-center gap-1 text-primary-600 text-xs font-bold group-hover:translate-x-1 transition-transform">
                  <span>Jelajahi Halaman</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ===== SECTION 4: ANGKA DAMPAK UTAMA ===== */}
      <section className="bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 text-white py-12 sm:py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400 bg-sky-950/80 px-3.5 py-1 rounded-full border border-sky-800">
              Metrik Keberhasilan
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-2">
              Dampak Program di Lapangan
            </h2>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dampakList.map((item, idx) => (
              <StaggerItem key={item.id || idx}>
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 text-center hover:border-sky-500/40 transition-all shadow-xl">
                  <p className="font-mono text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                    {item.angka}
                  </p>
                  <p className="text-sky-300 font-bold text-xs uppercase tracking-wider mt-1">
                    {item.satuan}
                  </p>
                  <p className="text-slate-300 text-sm font-semibold mt-2">
                    {item.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== SECTION 5: KARTU PRODUK UNGGULAN SAMPLING ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Olahan Laut Higienis
            </span>
            <h2 className="font-serif font-bold text-navy-950 text-2xl sm:text-3xl mt-2">
              Produk Unggulan KUB Banyusangka
            </h2>
          </div>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-1.5 text-primary-600 font-bold text-sm hover:underline"
          >
            <span>Lihat Semua Katalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {produkData.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={p.foto[0] || "/images/produk/abon-ikan-1.png"}
                    alt={p.nama}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    {p.kategori}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-navy-900 text-lg leading-snug">
                    {p.nama}
                  </h3>
                  <p className="text-navy-500 text-xs leading-relaxed line-clamp-2">
                    {p.deskripsi}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-4">
                <div>
                  <span className="text-[10px] text-navy-400 block font-medium">Mulai dari</span>
                  <span className="font-mono font-bold text-primary-600 text-lg">
                    Rp {p.varian[0].harga.toLocaleString("id-ID")}
                  </span>
                </div>
                <Link
                  href={`/katalog/${p.id}`}
                  className="inline-flex items-center gap-1.5 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-all"
                >
                  <span>Detail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 6: TOKOH DESA TESTIMONIAL ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-sky-900 via-navy-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-sky-800/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-300 bg-sky-950/80 px-3.5 py-1 rounded-full border border-sky-800">
                Apresiasi Pemerintah Desa
              </span>
              <blockquote className="font-serif text-lg sm:text-2xl font-semibold leading-relaxed text-slate-100 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-serif font-bold text-white text-lg">{testimonial.nama}</p>
                <p className="text-sky-300 text-xs sm:text-sm">{testimonial.jabatan}</p>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-slate-900">
                <Image
                  src={testimonial.foto || "/images/galeri/hero_desa_1784057776565.png"}
                  alt={testimonial.nama}
                  fill
                  className="object-cover object-top"
                  sizes="192px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
