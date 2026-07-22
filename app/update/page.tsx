"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import updatesData from "@/data/updates.json";
import { Calendar, Tag, Sparkles, Newspaper, ArrowRight, Loader2, UserCheck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/Animations";

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
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        if (supabase) {
          const { data, error } = await supabase
            .from("updates")
            .select("*")
            .order("urutan", { ascending: true })
            .order("created_at", { ascending: false });

          if (!error && data && data.length > 0) {
            setUpdates(data as UpdateItem[]);
            return;
          }
        }
        setUpdates(updatesData as UpdateItem[]);
      } catch {
        setUpdates(updatesData as UpdateItem[]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-20">
      {/* ===== MAJESTIC GRAND HERO BANNER: UPDATE & WARTA ===== */}
      <section className="relative min-h-[420px] sm:min-h-[460px] flex items-center justify-center overflow-hidden bg-navy-950 text-white border-b border-slate-800 mb-14">
        {/* Background HD Ocean Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banyusangka-hd.png"
            alt="Kegiatan Pengabdian TAWSEC Banyusangka"
            fill
            className="object-cover object-center brightness-90 contrast-110 scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-black/30" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 py-16 sm:py-20 text-center space-y-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-extrabold text-sky-200 uppercase tracking-wide shadow-lg">
              <Newspaper className="w-4 h-4 text-sky-400" />
              Warta Lapangan &amp; Rekam Jejak Program TAWSEC
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white leading-tight mt-4 drop-shadow-xl">
              Update &amp; Dokumentasi <span className="text-gradient-ocean font-serif">Berita Kegiatan</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mt-4 drop-shadow font-normal">
              Jelajahi rekam jejak pelaksanaan 7 agenda utama pengabdian UKM-F Penalaran AcSES FEB UNAIR di Desa Banyusangka — dari survei awal, formulasi R&amp;D, pelatihan 4 pilar, hingga sertifikasi halal.
            </p>

            {/* Quick Feature Chips Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-bold text-sky-300 shadow">
                <Calendar className="w-4 h-4 text-sky-400" /> 7 Agenda Utama
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-300 shadow">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dokumentasi Terverifikasi
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300 shadow">
                <Sparkles className="w-4 h-4 text-amber-400" /> Halaman Detail &amp; Galeri Lightbox
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Loading Spinner or Grid Cards */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-navy-400">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            <span className="text-sm font-medium">Memuat update berita...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {updates.map((item) => {
              const detailUrl = `/update/${item.slug || item.id}`;
              return (
                <article
                  key={item.id}
                  id={item.slug || item.id}
                  className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 scroll-mt-28 group/card"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Photo Preview Column */}
                    <Link href={detailUrl} className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto bg-gray-100 overflow-hidden block">
                      <Image
                        src={item.foto_url || "/images/galeri/pelatihan-1.png"}
                        alt={item.judul}
                        fill
                        className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-navy-950/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-white/20 flex items-center gap-1 shadow">
                          <Tag className="w-3 h-3 text-sunset-400" />
                          {item.kategori}
                        </span>
                      </div>
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
                    </Link>

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

                        <h2 className="font-serif font-bold text-navy-950 text-xl sm:text-2xl leading-snug mb-3 group-hover/card:text-sky-600 transition-colors">
                          <Link href={detailUrl}>
                            {item.judul}
                          </Link>
                        </h2>

                        <p className="text-navy-700 text-xs sm:text-sm font-medium leading-relaxed mb-5">
                          {item.isi_singkat}
                        </p>

                        {item.pic && (
                          <p className="text-xs text-navy-500 mb-4 flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                            <span>PIC: <strong className="text-navy-800">{item.pic}</strong></span>
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="inline-flex items-center gap-1 text-navy-500 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-sunset-500" /> UKM-F Penalaran AcSES FEB UNAIR
                        </span>

                        <Link
                          href={detailUrl}
                          className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-xl shadow-md transition-all active:scale-95 text-xs"
                        >
                          <span>Baca Penjelasan Lengkap Acara</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
                        </Link>
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
