"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dokumentasiData from "@/data/dokumentasi.json";
import { ExternalLink, LogOut, Folder, Calendar, ShieldCheck, Filter } from "lucide-react";

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
    <div className="min-h-screen bg-navy-950 pb-20">
      {/* Header Bar */}
      <header className="bg-navy-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold">
              📂
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-white leading-tight">
                Gudang Dokumentasi Internal
              </h1>
              <p className="text-xs text-primary-200">UKM-F Penalaran AcSES FEB UNAIR — TAWSEC 2026</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            {loggingOut ? "Keluar..." : "Keluar"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {/* Notice Card */}
        <div className="bg-gradient-to-r from-sunset-900/40 to-primary-900/40 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-sunset-400 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-white text-base">Arsip Dokumen &amp; Media Kegiatan Internal</h2>
              <p className="text-white/70 text-xs sm:text-sm mt-1 leading-relaxed">
                Halaman ini memuat tautan folder Google Drive untuk setiap sesi pelatihan, pendampingan, dan peluncuran program. Pastikan hak akses folder Drive diset ke <strong>Terbatas</strong> dan di-share ke email anggota tim.
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
                  ? "bg-primary-500 text-white shadow-lg"
                  : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
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
              className="bg-white/5 border border-white/10 hover:border-primary-500/40 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-primary-500/20 text-primary-300 border border-primary-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {item.kategori}
                  </span>
                  <span className="text-white/50 text-xs flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.tanggal}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-white text-lg group-hover:text-primary-300 transition-colors mb-2">
                  {item.nama_kegiatan}
                </h3>

                <p className="text-white/60 text-xs leading-relaxed mb-6">
                  {item.deskripsi}
                </p>
              </div>

              <a
                href={item.link_gdrive}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-lg transition-all"
              >
                <Folder className="w-4 h-4" />
                Buka Folder Drive
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-20 text-white/50">
            <p className="text-3xl mb-2">📁</p>
            <p className="text-sm">Belum ada dokumentasi untuk kategori ini.</p>
          </div>
        )}
      </main>
    </div>
  );
}
