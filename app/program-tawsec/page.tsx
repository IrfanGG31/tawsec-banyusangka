"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import modulData from "@/data/modul.json";
import { ProgressTracker } from "@/components/ProgressTracker";
import Timeline from "@/components/program/Timeline";
import LuaranProgram from "@/components/program/LuaranProgram";
import {
  TrendingUp, Leaf, Smartphone, Shield,
  Recycle, Sparkles, CheckCircle2, Award, Target, BookOpen
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Leaf: <Leaf className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
};

const sdgsList = [
  { num: 1, name: "Tanpa Kemiskinan", badge: "UNAIR #1 Indonesia (SDG 1)" },
  { num: 5, name: "Kesetaraan Gender", badge: "UNAIR Top-36 Dunia (SDG 5)" },
  { num: 8, name: "Pekerjaan Layak & Pertumbuhan Ekonomi", badge: "Formalisasi NIB/Halal" },
  { num: 14, name: "Ekosistem Laut", badge: "Zero Waste 20-35%" },
];

export default function ProgramTawsecPage() {
  const [activePilarNomor, setActivePilarNomor] = useState(1);
  const activePilar = modulData.find((m) => m.nomor === activePilarNomor) || modulData[0];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 pt-24">
      {/* ===== HERO PROGRAM HEADER ===== */}
      <section className="bg-gradient-to-b from-primary-50 via-white to-white py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-100 border border-primary-200 text-xs font-bold text-primary-800 uppercase tracking-wider mb-3">
              <Award className="w-4 h-4 text-sunset-500" /> UNAIR SUSTAINACTION 2026
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-navy-950 leading-tight">
              Program TAWSEC Banyusangka
            </h1>
            <p className="text-navy-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Program Hibah Pengabdian Masyarakat oleh <strong>UKM-F Penalaran AcSES FEB Universitas Airlangga</strong> untuk pemberdayaan ekonomi perempuan pesisir berbasis pengolahan hasil laut.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== 4 PILAR PROGRAM (INTERACTIVE TABS VIEW) ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
            🎯 Pendekatan Komprehensif
          </span>
          <h2 className="font-serif font-bold text-navy-950 text-3xl mt-2">
            4 Pilar Utama Pemberdayaan
          </h2>
          <p className="text-navy-600 text-sm mt-1">
            Pilih pilar di bawah untuk melihat rincian materi &amp; kapasitas yang diajarkan.
          </p>
        </div>

        {/* Pilar Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {modulData.map((p) => {
            const isActive = activePilarNomor === p.nomor;
            return (
              <button
                key={p.nomor}
                onClick={() => setActivePilarNomor(p.nomor)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? "bg-navy-900 text-white border-navy-900 shadow-lg scale-[1.02]"
                    : "bg-white text-navy-800 border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${isActive ? "bg-primary-500 text-white" : "bg-primary-50 text-primary-700"}`}>
                    Pilar {p.nomor}
                  </span>
                  <div className={isActive ? "text-primary-300" : "text-primary-600"}>
                    {iconMap[p.ikon]}
                  </div>
                </div>
                <h3 className="font-serif font-bold text-sm leading-tight">{p.judul}</h3>
              </button>
            );
          })}
        </div>

        {/* Selected Pilar Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePilar.nomor}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-md"
          >
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                  Detail Materi Pilar {activePilar.nomor}
                </span>
                <h3 className="font-serif font-bold text-navy-950 text-2xl mt-2">{activePilar.judul}</h3>
                <p className="text-navy-600 text-sm mt-1 leading-relaxed max-w-2xl">{activePilar.ringkasan}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {activePilar.materi.map((m, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 text-sm">{m.judul}</h4>
                    <p className="text-navy-600 text-xs mt-1 leading-relaxed">{m.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ===== INOVASI ZERO WASTE ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Recycle className="w-6 h-6 text-emerald-200" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Prinsip Keberlanjutan</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            Inovasi Zero Waste: Pengolahan Ikan Tanpa Sisa
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-3xl mb-8">
            Setiap bagian hasil tangkapan diolah secara produktif untuk memaksimalkan nilai tambah dan meniadakan limbah perikanan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
              <div className="text-2xl mb-2">🐟 Daging Ikan</div>
              <h3 className="font-serif font-bold text-base text-white">Abon Ikan Tongkol</h3>
              <p className="text-emerald-100 text-xs mt-1">Olahan siap saji gurih &amp; bernutrisi tinggi (Rp 25.000 / 100g).</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
              <div className="text-2xl mb-2">✨ Kulit Ikan</div>
              <h3 className="font-serif font-bold text-base text-white">Kerupuk Kulit Ikan</h3>
              <p className="text-emerald-100 text-xs mt-1">Camilan krispi kaya rasa khas laut (Rp 15.000 / 100g).</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
              <div className="text-2xl mb-2">🦴 Tulang Ikan</div>
              <h3 className="font-serif font-bold text-base text-white">Tepung Tulang Ikan</h3>
              <p className="text-emerald-100 text-xs mt-1">Tepung pakan kalsium tinggi dari pengolahan sisa (Rp 20.000 / 250g).</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE PELAKSANAAN ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <Timeline />
      </section>

      {/* ===== TARGET LUARAN PROGRAM ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <LuaranProgram />
      </section>

      {/* ===== DASHBOARD 9 KPI INDICATORS ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-lg">
          <ProgressTracker />
        </div>
      </section>

      {/* ===== COMPACT SDGS SUMMARY BADGES ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">🌍 Kontribusi Global</span>
              <h3 className="font-serif font-bold text-navy-950 text-xl mt-1">SDGs &amp; Reputasi Global UNAIR</h3>
            </div>
            <span className="text-xs font-semibold text-navy-600 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              UNAIR #15 Dunia THE Impact Rankings 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sdgsList.map((s) => (
              <div key={s.num} className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow flex-shrink-0">
                  <Image src={`/images/sdgs/sdg-${s.num}.svg`} alt={s.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-900 text-xs">{s.name}</h4>
                  <span className="text-[10px] text-primary-700 font-semibold">{s.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
