"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import modulData from "@/data/modul.json";
import visiMisiData from "@/data/visi-misi.json";
import { ProgressTracker } from "@/components/ProgressTracker";
import {
  TrendingUp, Leaf, Smartphone, Shield,
  ChevronDown, ChevronUp, Target, Eye
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-7 h-7" />,
  Leaf: <Leaf className="w-7 h-7" />,
  Smartphone: <Smartphone className="w-7 h-7" />,
  Shield: <Shield className="w-7 h-7" />,
};

const colorMap: Record<string, { bg: string; border: string; badge: string; pill: string; icon: string }> = {
  blue: {
    bg: "from-primary-50 to-blue-50",
    border: "border-primary-200",
    badge: "bg-primary-100 text-primary-700",
    pill: "bg-primary-600",
    icon: "bg-primary-600 text-white",
  },
  green: {
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    pill: "bg-emerald-600",
    icon: "bg-emerald-600 text-white",
  },
  purple: {
    bg: "from-purple-50 to-violet-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    pill: "bg-purple-600",
    icon: "bg-purple-600 text-white",
  },
  orange: {
    bg: "from-orange-50 to-amber-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    pill: "bg-orange-600",
    icon: "bg-orange-600 text-white",
  },
};

const sdgsData = [
  {
    num: 1,
    judul: "Tanpa Kemiskinan",
    fokusGlobal: "Mengakhiri kemiskinan dalam segala bentuk",
    pemetaanLokal: "Meningkatkan pendapatan ibu-ibu ngojur lewat produk olahan bernilai tambah (abon, kerupuk, tepung tulang ikan) — dari harga ikan mentah Rp1.000–3.000/kg jadi produk Rp25.000–50.000",
    color: "#E5243B",
    badge: "UNAIR Peringkat 1 Nasional (SDG 1)",
  },
  {
    num: 5,
    judul: "Kesetaraan Gender",
    fokusGlobal: "Kesetaraan gender & pemberdayaan perempuan",
    pemetaanLokal: "Sasaran utama program adalah perempuan pelaku ngojur — pelatihan kewirausahaan, manajemen usaha, dan akses digital agar perempuan pesisir naik kelas jadi pelaku UMKM mandiri",
    color: "#FF3A21",
    badge: "UNAIR Top-36 Dunia (SDG 5)",
  },
  {
    num: 8,
    judul: "Pekerjaan Layak & Pertumbuhan Ekonomi",
    fokusGlobal: "Pekerjaan layak & pertumbuhan ekonomi inklusif",
    pemetaanLokal: "Transformasi kerja informal (jual sisa tangkapan) menjadi usaha formal dengan legalitas (NIB, sertifikasi halal) dan manajemen usaha yang layak",
    color: "#A21942",
    badge: null,
  },
  {
    num: 14,
    judul: "Ekosistem Laut",
    fokusGlobal: "Konservasi & pemanfaatan berkelanjutan sumberdaya laut",
    pemetaanLokal: "Mengurangi food loss 20–35% saat panen raya lewat pengolahan, sehingga hasil laut termanfaatkan optimal, bukan terbuang",
    color: "#0A97D9",
    badge: null,
  },
];

function SdgCard({ sdg }: { sdg: typeof sdgsData[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`rounded-2xl border border-gray-100 p-5 bg-white shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 ${
        isOpen ? "ring-2 ring-primary-500" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md flex-shrink-0">
            <Image
              src={`/images/sdgs/sdg-${sdg.num}.svg`}
              alt={`SDG ${sdg.num} Icon`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-serif font-bold text-navy-950 text-base leading-snug">
              {sdg.judul}
            </h3>
            {sdg.badge && (
              <span className="inline-block bg-primary-50 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 border border-primary-100">
                🏆 {sdg.badge}
              </span>
            )}
          </div>
        </div>
        <div className="text-navy-400 mt-1 flex-shrink-0">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 text-xs sm:text-sm">
              <div>
                <p className="font-semibold text-navy-400 uppercase tracking-wider text-[10px]">Fokus Global</p>
                <p className="text-navy-600 mt-0.5">{sdg.fokusGlobal}</p>
              </div>
              <div>
                <p className="font-semibold text-primary-600 uppercase tracking-wider text-[10px]">Relevansi di Banyusangka</p>
                <p className="text-navy-800 font-medium mt-0.5 leading-relaxed">{sdg.pemetaanLokal}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PilarCard({ pilar }: { pilar: (typeof modulData)[0] }) {
  const [open, setOpen] = useState(false);
  const c = colorMap[pilar.warna];

  return (
    <div className={`rounded-2xl border ${c.border} bg-gradient-to-br ${c.bg} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex items-start gap-4 hover:brightness-95 transition-all"
        id={`pilar-toggle-${pilar.nomor}`}
      >
        <div className={`w-14 h-14 ${c.icon} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}>
          {iconMap[pilar.ikon]}
        </div>
        <div className="flex-1">
          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${c.badge} mb-2 inline-block`}>
            Pilar {pilar.nomor}
          </span>
          <h3 className="font-serif font-bold text-navy-900 text-xl mb-1">{pilar.judul}</h3>
          <p className="text-navy-600 text-sm leading-relaxed">{pilar.ringkasan}</p>
        </div>
        <div className="flex-shrink-0 mt-1 text-navy-400">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/50">
              <p className="text-navy-500 text-sm mt-4 mb-4">Materi dalam pilar ini:</p>
              <div className="space-y-3">
                {pilar.materi.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/60 rounded-xl p-4">
                    <div className={`w-7 h-7 ${c.pill} text-white rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-800 text-sm">{m.judul}</p>
                      <p className="text-navy-500 text-xs mt-0.5 leading-relaxed">{m.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProgramTawsecPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              ACSES & UNAIR Sustainability Program • Desa Banyusangka 2026
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Program TAWSEC
            </h1>
            <p className="text-primary-200 font-medium text-lg mb-2">
              Transformasi Ekonomi Pesisir melalui Sinergi Aksi Mandiri
            </p>
            <p className="text-white/70 max-w-2xl mx-auto">
              Sebuah program pemberdayaan ekonomi perempuan pesisir yang mendampingi
              ibu-ibu pelaku <em>ngojur</em> mengolah hasil laut menjadi produk UMKM bernilai tinggi.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* Visi & Misi */}
        <FadeIn>
          <section>
            <div className="text-center mb-10">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Fondasi Program</span>
              <h2 className="font-serif text-3xl font-bold text-navy-900 mt-2">Visi &amp; Misi TAWSEC</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Visi */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                  <div className="w-48 h-48 bg-white rounded-full -translate-y-12 translate-x-12" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-200 mb-3">Visi</p>
                  <p className="font-serif font-bold text-xl leading-relaxed">{visiMisiData.visi}</p>
                </div>
              </div>
              {/* Misi */}
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">Misi</p>
                <ol className="space-y-3">
                  {visiMisiData.misi.map((m, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-navy-700 text-sm leading-relaxed">{m}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Latar Belakang */}
        <FadeIn>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Latar Belakang</span>
              <h2 className="font-serif text-3xl font-bold text-navy-900 mt-2 mb-4">
                Potensi Besar yang Belum Tersentuh
              </h2>
              <p className="text-navy-600 leading-relaxed mb-4">
                Desa Banyusangka memiliki sumber daya laut yang luar biasa — ikan layang dan tongkol
                mendarat 100–300 kg per hari di PPI Banyusangka. Namun, <strong>85% dijual mentah</strong> tanpa
                pengolahan, dan hingga <strong>35% terbuang</strong> saat musim puncak.
              </p>
              <p className="text-navy-600 leading-relaxed">
                Perempuan pelaku <em>ngojur</em> — pengambil dan penjual eceran sisa hasil tangkapan —
                sudah punya pengalaman dagang, tapi belum memiliki keterampilan mengolah, manajemen usaha,
                akses pasar, dan kemampuan digital.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "85%", l: "Dijual mentah tanpa olah", c: "from-red-50 to-orange-50 border-red-200 text-red-600" },
                { v: "20–35%", l: "Food loss saat panen raya", c: "from-orange-50 to-yellow-50 border-orange-200 text-orange-600" },
                { v: "10–50x", l: "Kenaikan nilai jual setelah diolah", c: "from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700" },
                { v: "4 Pilar", l: "Program pemberdayaan komprehensif", c: "from-primary-50 to-blue-50 border-primary-200 text-primary-700" },
              ].map((s) => (
                <div key={s.l} className={`rounded-2xl border bg-gradient-to-br ${s.c} p-5 text-center`}>
                  <p className={`font-serif font-bold text-3xl ${s.c.split(" ").pop()}`}>{s.v}</p>
                  <p className="text-navy-600 text-xs mt-1 leading-tight">{s.l}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* 4 Pilar */}
        <section>
          <FadeIn>
            <div className="text-center mb-10">
              <span className="text-sunset-500 font-semibold text-sm uppercase tracking-widest">Pendekatan Program</span>
              <h2 className="font-serif text-3xl font-bold text-navy-900 mt-2 mb-3">4 Pilar Program TAWSEC</h2>
              <p className="text-navy-500 max-w-xl mx-auto">
                Klik pada setiap pilar untuk melihat detail materi yang diajarkan kepada peserta.
              </p>
            </div>
          </FadeIn>
          <div className="space-y-4">
            {modulData.map((pilar) => (
              <FadeIn key={pilar.id} delay={pilar.nomor * 0.1}>
                <PilarCard pilar={pilar} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* SDGs */}
        <section>
          <FadeIn>
            <div className="text-center mb-10">
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">Kontribusi Global</span>
              <h2 className="font-serif text-3xl font-bold text-navy-900 mt-2 mb-3">Kaitan dengan SDGs &amp; Komitmen UNAIR</h2>
              <p className="text-navy-500 max-w-xl mx-auto">
                Program TAWSEC berkontribusi nyata pada 4 Tujuan Pembangunan Berkelanjutan PBB (SDGs) yang sejalan dengan kompetensi global Universitas Airlangga.
              </p>
            </div>
          </FadeIn>

          {/* Banner Capaian UNAIR */}
          <FadeIn>
            <div className="bg-gradient-to-r from-primary-900 to-navy-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl mb-8">
              <div className="absolute top-0 right-0 opacity-10 translate-x-10 -translate-y-10 pointer-events-none">
                <div className="w-80 h-80 bg-white rounded-full blur-2xl" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-8 space-y-4">
                  <span className="inline-block bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    THE Sustainability Impact Rankings 2026
                  </span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl">
                    Universitas Airlangga: Rekor Dunia untuk Keberlanjutan
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Berdasarkan pemeringkatan Times Higher Education (THE) 2026, UNAIR menempati peringkat <strong>#15 dunia</strong> dan <strong>#1 di Indonesia</strong>. Kontribusi ini diimplementasikan nyata di Banyusangka, khususnya pada SDG 1 (No Poverty - Peringkat 1 Nasional) dan SDG 5 (Gender Equality - Top 36 Dunia).
                  </p>
                </div>
                <div className="md:col-span-4 grid grid-cols-3 gap-2 text-center border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-6">
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-extrabold text-primary-300 font-serif">#15</p>
                    <p className="text-[9px] text-white/60 font-semibold uppercase">Dunia</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-serif">#1</p>
                    <p className="text-[9px] text-white/60 font-semibold uppercase">Indonesia</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-extrabold text-yellow-300 font-serif">95.7</p>
                    <p className="text-[9px] text-white/60 font-semibold uppercase">Skor THE</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Grid 4 Kartu SDG */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sdgsData.map((s) => (
              <FadeIn key={s.num}>
                <SdgCard sdg={s} />
              </FadeIn>
            ))}
          </div>

          {/* Footer Section: LPMB/UNAIR Logo */}
          <FadeIn>
            <div className="mt-8 bg-gray-50 border border-gray-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="/images/logos/logo-unair-biru.png"
                    alt="Logo UNAIR"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-36 h-12 flex-shrink-0">
                  <Image
                    src="/images/logos/logo-sdgs-unair.png"
                    alt="Logo SDGs UNAIR"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs text-navy-500 font-medium leading-relaxed">
                  Program pengabdian masyarakat berkelanjutan TAWSEC di bawah naungan
                </p>
                <p className="text-xs font-bold text-navy-950">
                  LPMB (Lembaga Pengabdian Masyarakat Berkelanjutan) Universitas Airlangga
                </p>
                <p className="text-[9px] text-navy-400 mt-1 italic">
                  * Sumber data pemeringkatan resmi Times Higher Education (THE) rilis 24 Juni 2026.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Progress Tracker Live */}
        <FadeIn>
          <section>
            <div className="text-center mb-10">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Tahapan Program</span>
              <h2 className="font-serif text-3xl font-bold text-navy-900 mt-2">Progress TAWSEC 2026</h2>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8">
              <ProgressTracker />
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
