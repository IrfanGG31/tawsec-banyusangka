"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import updatesData from "@/data/updates.json";
import { Calendar, Tag, Sparkles, Newspaper, BookOpen, Loader2 } from "lucide-react";

interface UpdateItem {
  id: string;
  tanggal: string;
  judul: string;
  isi_singkat: string;
  deskripsi_lengkap?: string;
  foto_url: string;
  kategori: string;
  slug?: string;
  periode?: string;
  pic?: string;
  status_kegiatan?: string;
  urutan?: number;
  is_timeline?: boolean;
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        // createClient() is inside try so any constructor error also hits finally
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        if (supabase) {
          const { data, error } = await supabase
            .from("updates")
            .select("*")
            .order("urutan", { ascending: true })
            .order("created_at", { ascending: false });

          // Use Supabase data only when there are no errors AND rows exist
          // Empty table (data.length === 0) falls through to JSON fallback below
          if (!error && data && data.length > 0) {
            setUpdates(data as UpdateItem[]);
            return; // ✅ early-return; finally still runs
          }
        }
        // Fallback: Supabase null | error | empty table → use static JSON
        setUpdates(updatesData as UpdateItem[]);
      } catch {
        // Any throw (network, createClient, query) → JSON fallback
        setUpdates(updatesData as UpdateItem[]);
      } finally {
        // ✅ ALWAYS reached regardless of success / error / throw
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-xs font-semibold text-primary-700 uppercase tracking-wider mb-3">
            <Newspaper className="w-4 h-4 text-primary-600" /> Warta, Dokumentasi &amp; Penjelasan Acara
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-navy-950 leading-tight">
            Dokumentasi Berita Kegiatan TAWSEC
          </h1>
          <p className="text-navy-600 text-sm sm:text-base mt-3 leading-relaxed">
            Arsip penjelasan lengkap acara dan foto dokumentasi kegiatan pengabdian UKM-F Penalaran AcSES FEB UNAIR di Desa Banyusangka.
          </p>
        </div>

        {/* ── Bug A Fix: show spinner INSTEAD OF list while loading ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-navy-400">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            <span className="text-sm font-medium">Memuat update berita...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {updates.map((item) => {
              // Anchor ID: prefer slug, fall back to id for backward-compat
              const anchorId = item.slug || item.id;
              return (
                <article
                  key={item.id}
                  id={anchorId}
                  className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 scroll-mt-28"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Photo Preview Column */}
                    <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto bg-gray-100 overflow-hidden">
                      <Image
                        src={item.foto_url || "/images/galeri/pelatihan-1.png"}
                        alt={item.judul}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-navy-950/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-white/20 flex items-center gap-1 shadow">
                          <Tag className="w-3 h-3 text-sunset-400" />
                          {item.kategori}
                        </span>
                      </div>
                      {/* Status badge for timeline items */}
                      {item.is_timeline && item.status_kegiatan && (
                        <div className="absolute bottom-4 left-4">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border ${
                              item.status_kegiatan === "Selesai"
                                ? "bg-emerald-500/80 text-white border-emerald-400/30"
                                : item.status_kegiatan === "Berjalan"
                                ? "bg-sunset-500/80 text-white border-sunset-400/30"
                                : "bg-slate-700/80 text-slate-200 border-slate-500/30"
                            }`}
                          >
                            {item.status_kegiatan === "Selesai"
                              ? "✓ Selesai"
                              : item.status_kegiatan === "Berjalan"
                              ? "⚡ Sedang Berjalan"
                              : "⏳ Belum Mulai"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-primary-700 font-semibold mb-3">
                          <Calendar className="w-3.5 h-3.5 text-sunset-500" />
                          <span>{item.tanggal}</span>
                          {item.periode && item.periode !== item.tanggal && (
                            <span className="text-navy-400 font-normal">· {item.periode}</span>
                          )}
                        </div>

                        <h2 className="font-serif font-bold text-navy-950 text-xl sm:text-2xl leading-snug mb-3">
                          {item.judul}
                        </h2>

                        <p className="text-navy-700 text-xs sm:text-sm font-medium leading-relaxed mb-3">
                          {item.isi_singkat}
                        </p>

                        {item.deskripsi_lengkap && (
                          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-navy-600 leading-relaxed mb-4">
                            <span className="font-bold text-navy-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-primary-700 mb-1">
                              <BookOpen className="w-3.5 h-3.5" /> Penjelasan Lengkap Acara:
                            </span>
                            {item.deskripsi_lengkap}
                          </div>
                        )}

                        {/* PIC row — only for timeline items */}
                        {item.pic && (
                          <p className="text-xs text-navy-500 mb-2">
                            <span className="font-semibold text-navy-700">PIC:</span> {item.pic}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary-600">
                        <span className="inline-flex items-center gap-1 text-navy-500">
                          <Sparkles className="w-3.5 h-3.5 text-sunset-500" /> UKM-F Penalaran AcSES FEB UNAIR
                        </span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          ✓ Dokumentasi Terverifikasi
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
