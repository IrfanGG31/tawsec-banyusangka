"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Animations";
import { CheckCircle2, Clock, Calendar, UserCheck, ArrowUpRight, BookOpen } from "lucide-react";
import updatesData from "@/data/updates.json";

interface TimelineStep {
  id: string;
  slug: string;
  periode: string;
  judul: string;
  isi_singkat: string;
  status_kegiatan: "Selesai" | "Berjalan" | "Belum Mulai";
  pic: string;
  foto_url: string;
}

export default function Timeline() {
  const [steps, setSteps] = useState<TimelineStep[]>([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        if (supabase) {
          const { data, error } = await supabase
            .from("updates")
            .select("id, slug, periode, judul, isi_singkat, status_kegiatan, pic, foto_url")
            .eq("is_timeline", true)
            .order("urutan", { ascending: true });

          if (!error && data && data.length > 0) {
            setSteps(data as TimelineStep[]);
            return;
          }
        }
        // Fallback to static JSON (filter only timeline items, sorted by urutan)
        const fallback = (updatesData as TimelineStep[])
          .filter((u) => (u as unknown as { is_timeline?: boolean }).is_timeline !== false)
          .sort((a, b) => {
            const ua = a as unknown as { urutan?: number };
            const ub = b as unknown as { urutan?: number };
            return (ua.urutan ?? 99) - (ub.urutan ?? 99);
          });
        setSteps(fallback);
      } catch {
        // Any error → use static JSON fallback
        const fallback = (updatesData as TimelineStep[]).sort((a, b) => {
          const ua = a as unknown as { urutan?: number };
          const ub = b as unknown as { urutan?: number };
          return (ua.urutan ?? 99) - (ub.urutan ?? 99);
        });
        setSteps(fallback);
      }
    };

    fetchTimeline();
  }, []);

  return (
    <section className="py-12">
      <div className="mb-10 text-center">
        <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest bg-primary-50 px-3.5 py-1 rounded-full border border-primary-100">
          📅 Jadwal &amp; Dokumentasi Visual Program
        </span>
        <h2 className="font-serif font-bold text-navy-950 text-3xl sm:text-4xl mt-3">
          Timeline Pelaksanaan Program TAWSEC
        </h2>
        <p className="text-navy-600 text-sm mt-2 max-w-xl mx-auto">
          Klik pada setiap kartu agenda di bawah untuk membuka berita kegiatan lengkap dan dokumentasi foto acara di menu <strong>Update</strong>.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto pl-6 sm:pl-8 border-l-2 border-primary-200 space-y-10">
        {steps.map((step, idx) => {
          // Anchor target: slug takes priority over id (slug is permanent & semantic)
          const anchor = step.slug || step.id;
          return (
            <FadeIn key={step.id} delay={idx * 0.1}>
              <div className="relative group">
                {/* Timeline Bullet Indicator */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center shadow-md z-10">
                  {step.status_kegiatan === "Selesai" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : step.status_kegiatan === "Berjalan" ? (
                    <span className="w-3 h-3 rounded-full bg-sunset-500 animate-ping" />
                  ) : (
                    <Clock className="w-4 h-4 text-navy-300" />
                  )}
                </div>

                {/* Interactive Card → navigates to /update#[slug] */}
                <Link
                  href={`/update#${anchor}`}
                  className="block bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 group/card"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                    {/* Photo Preview Column */}
                    <div className="md:col-span-4 relative aspect-[16/10] md:aspect-auto bg-gray-100 overflow-hidden">
                      <Image
                        src={step.foto_url || "/images/galeri/pelatihan-1.png"}
                        alt={step.judul}
                        fill
                        className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
                    </div>

                    {/* Content Column */}
                    <div className="md:col-span-8 p-6 sm:p-7 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                            <Calendar className="w-3.5 h-3.5 text-primary-600" />
                            {step.periode}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              step.status_kegiatan === "Selesai"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : step.status_kegiatan === "Berjalan"
                                ? "bg-sunset-50 text-sunset-700 border border-sunset-200"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {step.status_kegiatan === "Selesai"
                              ? "✓ Selesai"
                              : step.status_kegiatan === "Berjalan"
                              ? "⚡ Sedang Berjalan"
                              : "⏳ Belum Mulai"}
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-navy-950 text-xl leading-snug mb-2 group-hover/card:text-primary-600 transition-colors">
                          {step.judul}
                        </h3>

                        <p className="text-navy-600 text-xs sm:text-sm leading-relaxed mb-5">
                          {step.isi_singkat}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-navy-500">
                        <span className="flex items-center gap-1 font-medium text-navy-600">
                          <UserCheck className="w-3.5 h-3.5 text-primary-600" />
                          PIC: <strong className="text-navy-800">{step.pic}</strong>
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 group-hover/card:text-sky-800 bg-sky-50 group-hover/card:bg-sky-100 px-3 py-1.5 rounded-xl border border-sky-100 transition-all">
                          <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                          Lihat Dokumentasi &amp; Acara
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
