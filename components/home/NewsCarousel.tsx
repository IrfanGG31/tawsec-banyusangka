"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Tag, ArrowUpRight, Sparkles, Newspaper } from "lucide-react";
import updatesData from "@/data/updates.json";
import { createClient } from "@/lib/supabase/client";

interface UpdateItem {
  id: string;
  slug?: string;
  tanggal: string;
  judul: string;
  isi_singkat: string;
  foto_url: string;
  kategori: string;
}

export default function NewsCarousel() {
  const [updates, setUpdates] = useState<UpdateItem[]>(updatesData as UpdateItem[]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchUpdates = async () => {
      const supabase = createClient();
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from("updates")
            .select("*")
            .order("urutan", { ascending: true })
            .order("created_at", { ascending: true });

          if (!error && data && data.length > 0) {
            setUpdates(data as UpdateItem[]);
          }
        } catch {
          // Fallback to static updates
        }
      }
    };
    fetchUpdates();
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (isPaused || updates.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % updates.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, updates.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % updates.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + updates.length) % updates.length);
  };

  if (updates.length === 0) return null;

  const currentItem = updates[currentIndex];
  const itemAnchor = `/update/${currentItem.slug || currentItem.id}`;

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 my-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bg-gradient-to-br from-slate-900 via-navy-950 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        {/* Background Subtle Gradient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-3.5 py-1 rounded-full border border-sky-800">
              <Newspaper className="w-3.5 h-3.5" /> Warta &amp; Update Kegiatan Terkini
            </span>
            <h2 className="font-serif font-bold text-white text-2xl sm:text-3xl mt-2">
              Kabar Terbaru Pengabdian TAWSEC
            </h2>
          </div>

          {/* Navigation Controls (Indorelawan Benchmark) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all active:scale-95 shadow"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-slate-400 font-medium">
              {currentIndex + 1} / {updates.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all active:scale-95 shadow"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider Content Frame */}
        <div className="relative min-h-[300px] sm:min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id || currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Photo Preview Column */}
              <Link href={itemAnchor} className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-700 bg-slate-800 group">
                <Image
                  src={currentItem.foto_url || "/images/galeri/display-1.png"}
                  alt={currentItem.judul}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-sky-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow border border-sky-400/30 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {currentItem.kategori}
                  </span>
                </div>
              </Link>

              {/* Text Info Column */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2 text-xs text-sky-400 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  <span>{currentItem.tanggal}</span>
                </div>

                <h3 className="font-serif font-bold text-white text-2xl sm:text-3xl leading-snug hover:text-sky-300 transition-colors">
                  <Link href={itemAnchor}>
                    {currentItem.judul}
                  </Link>
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {currentItem.isi_singkat}
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href={itemAnchor}
                    className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold py-3 px-5 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <span>Baca Berita Selengkapnya</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" /> Ormawa AcSES FEB UNAIR
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-slate-800/80">
          {updates.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx ? "w-8 bg-sky-500" : "w-2 bg-slate-700 hover:bg-slate-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
