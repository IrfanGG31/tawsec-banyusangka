"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import updatesData from "@/data/updates.json";
import { createClient } from "@/lib/supabase/client";
import { Calendar, Tag, Sparkles, Newspaper } from "lucide-react";

interface UpdateItem {
  id: string;
  tanggal: string;
  judul: string;
  isi_singkat: string;
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
            <Newspaper className="w-4 h-4 text-primary-600" /> Warta &amp; Perkembangan Program
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-navy-900 leading-tight">
            Kabar Terkini Banyusangka
          </h1>
          <p className="text-navy-600 text-sm sm:text-base mt-3 leading-relaxed">
            Ikuti perjalanan pengabdian tim UKM-F Penalaran AcSES FEB UNAIR dalam mentransformasi potensi perikanan Desa Banyusangka.
          </p>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updates.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Preview */}
                <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={item.foto_url || "/images/galeri/pelatihan-1.png"}
                    alt={item.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-sunset-400" />
                      {item.kategori}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-navy-400 font-medium mb-2">
                    <Calendar className="w-3.5 h-3.5 text-primary-600" />
                    <span>{item.tanggal}</span>
                  </div>

                  <h2 className="font-serif font-bold text-navy-900 text-lg group-hover:text-primary-600 transition-colors mb-3 leading-snug">
                    {item.judul}
                  </h2>

                  <p className="text-navy-600 text-xs sm:text-sm leading-relaxed">
                    {item.isi_singkat}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-50 mt-4 flex items-center justify-between text-xs font-semibold text-primary-600">
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-sunset-500" /> Program TAWSEC 2026
                </span>
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
