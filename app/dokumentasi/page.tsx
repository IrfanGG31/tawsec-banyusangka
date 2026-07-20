"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dokumentasiData from "@/data/dokumentasi.json";
import { ExternalLink, LogOut, Folder, Calendar, ShieldCheck, ArrowLeft } from "lucide-react";
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
                Halaman ini memuat tautan folder Google Drive untuk setiap sesi pelatihan, pendampingan, dan peluncuran program. Pastikan hak akses folder Drive diset ke <strong className="text-orange-400">Terbatas</strong> dan di-share ke email anggota tim.
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

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 flex flex-col justify-between hover:bg-slate-850 transition-all shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-sky-950 text-sky-300 border border-sky-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {item.kategori}
                  </span>
                  <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.tanggal}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-white text-lg group-hover:text-sky-300 transition-colors mb-2">
                  {item.nama_kegiatan}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                  {item.deskripsi}
                </p>
              </div>

              <a
                href={item.link_gdrive}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95"
              >
                <Folder className="w-4 h-4" />
                Buka Folder Drive
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
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
