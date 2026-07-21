"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import updatesData from "@/data/updates.json";
import { createClient } from "@/lib/supabase/client";
import { Calendar, Tag, Sparkles, Newspaper, BookOpen } from "lucide-react";

interface UpdateItem {
  id: string;
  tanggal: string;
  judul: string;
  isi_singkat: string;
  deskripsi_lengkap?: string;
  foto_url: string;
  kategori: string;
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<UpdateItem[]>(updatesData as UpdateItem[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      const supabase = createClient();
      if (supabase) {
        try {
          const { data, error } = await supabase.from("updates").select("*").order("created_at", { ascending: false });
          if (!error && data && data.length > 0) {
            setUpdates(data as UpdateItem[]);
            setLoading(false);
            return;
          }
        } catch {
          // Fallback to static JSON
        }
      }
      setUpdates(updatesData as UpdateItem[]);
      setLoading(false);
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

        {/* Updates List */}
        <div className="space-y-8">
          {updates.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 scroll-mt-28"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Photo Preview Column */}
                <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto bg-gray-100 overflow-hidden">
                  <Image
                    src={item.foto_url || "/images/galeri/pelatihan-1.png"}
                    alt={item.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-navy-950/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-white/20 flex items-center gap-1 shadow">
                      <Tag className="w-3 h-3 text-sunset-400" />
                      {item.kategori}
                    </span>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-primary-700 font-semibold mb-3">
                      <Calendar className="w-3.5 h-3.5 text-sunset-500" />
                      <span>{item.tanggal}</span>
                    </div>

                    <h2 className="font-serif font-bold text-navy-950 text-xl sm:text-2xl leading-snug mb-3">
                      {item.judul}
                    </h2>

                    <p className="text-navy-700 text-xs sm:text-sm font-medium leading-relaxed mb-3">
                      {item.isi_singkat}
                    </p>

                    {item.deskripsi_lengkap && (
                      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-navy-600 leading-relaxed mb-4">
                        <span className="font-bold text-navy-900 block mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-primary-700">
                          <BookOpen className="w-3.5 h-3.5" /> Penjelasan Lengkap Acara:
                        </span>
                        {item.deskripsi_lengkap}
                      </div>
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
          ))}
        </div>

        {loading && (
          <div className="text-center py-12 text-gray-400 text-xs">
            Memuat update berita...
          </div>
        )}
      </div>
    </div>
  );
}
