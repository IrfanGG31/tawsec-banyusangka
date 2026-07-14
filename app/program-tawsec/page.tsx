"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import modulData from "@/data/modul.json";
import {
  TrendingUp, Leaf, Smartphone, Shield,
  ChevronDown, ChevronUp, ExternalLink
} from "lucide-react";
import type { Metadata } from "next";

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

const sdgs = [
  {
    num: 1,
    judul: "Tanpa Kemiskinan",
    desc: "Meningkatkan pendapatan perempuan nelayan melalui nilai tambah produk olahan laut.",
    color: "#e5243b",
  },
  {
    num: 5,
    judul: "Kesetaraan Gender",
    desc: "Memberdayakan perempuan pelaku ngojur agar memiliki akses ekonomi dan kemandirian usaha.",
    color: "#ef402d",
  },
  {
    num: 8,
    judul: "Pekerjaan Layak & Pertumbuhan Ekonomi",
    desc: "Menciptakan lapangan kerja produktif berbasis pengolahan hasil laut di desa pesisir.",
    color: "#a21942",
  },
  {
    num: 14,
    judul: "Ekosistem Laut",
    desc: "Mendorong pemanfaatan ikan secara bijak dan mengurangi food loss melalui pengolahan total.",
    color: "#0a97d9",
  },
];

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
              Program KKN LPMB Universitas Airlangga • Desa Banyusangka 2026
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
        <FadeIn>
          <section>
            <div className="text-center mb-10">
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">Kontribusi Global</span>
              <h2 className="font-serif text-3xl font-bold text-navy-900 mt-2 mb-3">Kaitan dengan SDGs</h2>
              <p className="text-navy-500 max-w-xl mx-auto">
                Program TAWSEC berkontribusi pada 4 Tujuan Pembangunan Berkelanjutan PBB.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sdgs.map((s) => (
                <div
                  key={s.num}
                  className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div
                    className="text-white p-4 text-center"
                    style={{ backgroundColor: s.color }}
                  >
                    <div className="font-bold text-4xl mb-1">{s.num}</div>
                    <div className="text-sm font-semibold leading-tight">{s.judul}</div>
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-navy-600 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Progress */}
        <FadeIn>
          <section>
            <div className="text-center mb-10">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Tahapan Program</span>
              <h2 className="font-serif text-3xl font-bold text-navy-900 mt-2">Progress TAWSEC 2026</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "Identifikasi kebutuhan & pemetaan potensi desa", done: true },
                { label: "Pembentukan Kelompok Usaha Bersama (KUB)", done: true },
                { label: "Pelatihan Pilar 1: Kewirausahaan & Manajemen", done: true },
                { label: "Pelatihan Pilar 2: Produksi Berkelanjutan (SOP Abon, Kerupuk, Tepung Tulang)", done: true },
                { label: "Pelatihan Pilar 3: Digitalisasi & Branding", done: false },
                { label: "Pendampingan pembuatan akun marketplace", done: false },
                { label: "Pelatihan Pilar 4: Legalitas Usaha & Sertifikasi Halal/NIB", done: false },
                { label: "Peluncuran website & katalog digital UMKM", done: false },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${
                    step.done
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      step.done ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.done ? "✓" : i + 1}
                  </div>
                  <span className={`text-sm font-medium ${step.done ? "text-emerald-800" : "text-gray-600"}`}>
                    {step.label}
                  </span>
                  {step.done && (
                    <span className="ml-auto text-xs bg-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full font-semibold flex-shrink-0">
                      Selesai
                    </span>
                  )}
                  {!step.done && (
                    <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold flex-shrink-0">
                      Dalam proses
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
