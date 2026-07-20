"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dokumentasiData from "@/data/dokumentasi.json";
import { ExternalLink, LogOut, Folder, Calendar, ShieldCheck, ArrowLeft, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const categories = ["Semua", "Pilar 1", "Pilar 2", "Pilar 3", "Pilar 4", "Peluncuran Website", "Lainnya"];

export default function DokumentasiPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/dokumentasi/login");
      router.refresh();
    } catch {
      alert("Gagal melakukan logout.");
      setLoggingOut(false);
    }
  };

  const filteredData =
    selectedCategory === "Semua"
      ? dokumentasiData
      : dokumentasiData.filter((item) => item.kategori === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white text-xl shadow-md">
              📂
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-white leading-tight">
                Gudang Dokumentasi Internal
              </h1>
              <p className="text-xs text-sky-400 font-medium">
                UKM-F Penalaran AcSES FEB UNAIR — TAWSEC 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Beranda Publik
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            >
              <LogOut className="w-4 h-4" />
              {loggingOut ? "Keluar..." : "Keluar"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Notice Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-white text-base">Arsip Dokumen &amp; Media Kegiatan Internal</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                Halaman ini memuat visual preview dan tautan folder Google Drive untuk setiap kegiatan. Hak akses folder Drive diset ke <strong className="text-orange-400">Terbatas</strong> (di-share khusus ke email anggota).
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-sky-500 text-white shadow-lg"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-3xl overflow-hidden flex flex-col justify-between hover:bg-slate-850 transition-all shadow-xl group"
            >
              <div>
                {/* Visual Cover Image Preview */}
                <div className="relative aspect-[16/9] w-full bg-slate-800 overflow-hidden">
                  <Image
                    src={item.foto_cover}
                    alt={item.nama_kegiatan}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Category Badge & Date Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="bg-sky-950/90 backdrop-blur-md text-sky-300 border border-sky-700/60 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {item.kategori}
                    </span>
                    <span className="bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3 text-sky-400" />
                      {item.tanggal}
                    </span>
                  </div>

                  {/* Stat Badges Overlay at Bottom of Cover */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {item.statistik.map((stat, sIdx) => (
                      <span key={sIdx} className="bg-slate-900/90 backdrop-blur-md text-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-lg border border-slate-700">
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6">
                  <h3 className="font-serif font-bold text-white text-lg group-hover:text-sky-300 transition-colors mb-2 leading-snug">
                    {item.nama_kegiatan}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed mb-5">
                    {item.deskripsi}
                  </p>

                  {/* Folder Contents Preview List */}
                  <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-sky-400">
                      <FileText className="w-3.5 h-3.5" />
                      Pratinjau Isi Folder Drive:
                    </div>
                    <ul className="space-y-1.5">
                      {item.isi_folder.map((file, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{file}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-0">
                <a
                  href={item.link_gdrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-95"
                >
                  <Folder className="w-4 h-4" />
                  Buka Folder Google Drive
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-3xl mb-2">📁</p>
            <p className="text-sm">Belum ada dokumentasi untuk kategori ini.</p>
          </div>
        )}
      </main>
    </div>
  );
}
