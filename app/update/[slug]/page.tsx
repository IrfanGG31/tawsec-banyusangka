"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar, Tag, Sparkles, Newspaper, BookOpen, ArrowLeft,
  UserCheck, ShieldCheck, Maximize2, X, ChevronRight, ChevronLeft,
  ArrowUpRight, Loader2, Grid, SlidersHorizontal, Image as ImageIcon
} from "lucide-react";
import updatesData from "@/data/updates.json";
import { createClient } from "@/lib/supabase/client";

interface UpdateItem {
  id: string;
  slug?: string;
  tanggal: string;
  judul: string;
  isi_singkat: string;
  deskripsi_lengkap?: string;
  foto_url: string;
  kategori: string;
  periode?: string;
  pic?: string;
  status_kegiatan?: string;
  is_timeline?: boolean;
}

interface GaleriFoto {
  id: string;
  update_id: string;
  foto_url: string;
  caption?: string;
  urutan: number;
}

export default function UpdateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [updateItem, setUpdateItem] = useState<UpdateItem | null>(null);
  const [galeriList, setGaleriList] = useState<GaleriFoto[]>([]);
  const [relatedList, setRelatedList] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Gallery Carousel & Lightbox State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchDetailData = async () => {
      setLoading(true);

      try {
        const supabase = createClient();
        if (supabase) {
          // 1. Fetch update by slug (or id if slug is UUID)
          const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
          let query = supabase.from("updates").select("*");
          if (isUuid) {
            query = query.or(`id.eq.${slug},slug.eq.${slug}`);
          } else {
            query = query.eq("slug", slug);
          }

          const { data: updateData } = await query.maybeSingle();

          if (updateData) {
            setUpdateItem(updateData as UpdateItem);

            // 2. Fetch gallery photos for this update
            const { data: galeriData } = await supabase
              .from("updates_galeri")
              .select("*")
              .eq("update_id", updateData.id)
              .order("urutan", { ascending: true });

            if (galeriData && galeriData.length > 0) {
              setGaleriList(galeriData as GaleriFoto[]);
            } else {
              setGaleriList([
                {
                  id: "main-cover",
                  update_id: updateData.id,
                  foto_url: updateData.foto_url || "/images/galeri/pelatihan-1.png",
                  caption: updateData.judul,
                  urutan: 1,
                },
              ]);
            }

            // 3. Fetch related updates (excluding current)
            const { data: relData } = await supabase
              .from("updates")
              .select("*")
              .neq("id", updateData.id)
              .limit(3);

            if (relData && relData.length > 0) {
              setRelatedList(relData as UpdateItem[]);
            }
            setLoading(false);
            return;
          }
        }
      } catch {
        // Fall through to static fallback
      }

      // Fallback: match from updatesData JSON
      const found = (updatesData as UpdateItem[]).find(
        (item) => (item.slug || item.id) === slug || item.id === slug
      );

      if (found) {
        setUpdateItem(found);

        // Fallback gallery items
        const defaultGaleri: GaleriFoto[] = [
          {
            id: "fallback-1",
            update_id: found.id,
            foto_url: found.foto_url || "/images/galeri/display-1.png",
            caption: found.judul,
            urutan: 1,
          },
        ];
        setGaleriList(defaultGaleri);

        // Fallback related
        const rel = (updatesData as UpdateItem[]).filter((u) => u.id !== found.id).slice(0, 3);
        setRelatedList(rel);
      }
      setLoading(false);
    };

    fetchDetailData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
        <p className="text-sm font-medium text-slate-500">Memuat dokumentasi kegiatan...</p>
      </div>
    );
  }

  if (!updateItem) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="font-serif font-bold text-3xl text-navy-950 mb-3">Berita Tidak Ditemukan</h1>
        <p className="text-slate-600 text-sm mb-6">
          Dokumentasi kegiatan yang Anda cari mungkin telah dipindahkan atau dihapus.
        </p>
        <Link
          href="/update"
          className="inline-flex items-center gap-2 bg-sky-600 text-white font-bold px-6 py-3 rounded-2xl shadow"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Semua Update
        </Link>
      </div>
    );
  }

  const mainPhoto = updateItem.foto_url || galeriList[0]?.foto_url || "/images/galeri/pelatihan-1.png";

  const nextSlide = () => {
    if (galeriList.length === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % galeriList.length);
  };

  const prevSlide = () => {
    if (galeriList.length === 0) return;
    setCurrentSlideIndex((prev) => (prev - 1 + galeriList.length) % galeriList.length);
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null || galeriList.length === 0) return;
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % galeriList.length : 0));
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null || galeriList.length === 0) return;
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev - 1 + galeriList.length) % galeriList.length : 0));
  };

  const activeSlide = galeriList[currentSlideIndex] || galeriList[0];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Navigation Back Button */}
        <div className="mb-6">
          <Link
            href="/update"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 px-4 py-2 rounded-xl shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Update &amp; Berita
          </Link>
        </div>

        {/* Main Article Container */}
        <article className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl mb-12">
          {/* Main Hero Photo */}
          <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
            <Image
              src={mainPhoto}
              alt={updateItem.judul}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="bg-sky-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow border border-sky-400/30 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {updateItem.kategori}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                <span>{updateItem.tanggal}</span>
                {updateItem.periode && updateItem.periode !== updateItem.tanggal && (
                  <span className="text-slate-300 font-normal">· {updateItem.periode}</span>
                )}
              </div>
              <h1 className="font-serif font-extrabold text-2xl sm:text-4xl text-white leading-tight drop-shadow-md">
                {updateItem.judul}
              </h1>
            </div>
          </div>

          {/* Metadata Bar (PIC & Verification Badge) */}
          <div className="px-6 sm:px-8 py-4 bg-slate-100/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <UserCheck className="w-4 h-4 text-sky-600" />
              <span>PIC Kegiatan:</span>
              <strong className="text-navy-950 font-bold">{updateItem.pic || "Tim Ormawa AcSES FEB UNAIR"}</strong>
            </div>

            <span className="inline-flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Dokumentasi Terverifikasi
            </span>
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-10 space-y-8">

            {/* Short Ringkasan Box */}
            <div className="p-5 bg-sky-50/80 border border-sky-200/80 rounded-2xl text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block mb-1">
                Ringkasan Singkat Acara:
              </span>
              {updateItem.isi_singkat}
            </div>

            {/* Penjelasan Lengkap (Full Paragraf Text) */}
            {updateItem.deskripsi_lengkap && (
              <div className="space-y-4 text-slate-800 leading-relaxed text-sm sm:text-base border-b border-slate-100 pb-8">
                <h3 className="font-serif font-bold text-navy-950 text-xl flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sky-600" />
                  Penjelasan &amp; Pelaksanaan Acara
                </h3>
                <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                  {updateItem.deskripsi_lengkap}
                </p>
              </div>
            )}

            {/* ===== INTERACTIVE GALERI FOTO SLIDER CAROUSEL ===== */}
            <div className="pt-2">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-serif font-bold text-navy-950 text-xl flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-emerald-600" />
                    Galeri Foto Kegiatan ({galeriList.length} Foto)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {galeriList.length > 1
                      ? "Geser slide atau klik foto untuk memperbesar layar penuh"
                      : "Foto dokumentasi kegiatan"}
                  </p>
                </div>

                {/* View Mode Toggle Buttons */}
                {galeriList.length > 1 && (
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                    <button
                      onClick={() => setViewMode("slider")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                        viewMode === "slider"
                          ? "bg-sky-600 text-white shadow-sm"
                          : "text-slate-600 hover:text-navy-950"
                      }`}
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Mode Slide</span>
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                        viewMode === "grid"
                          ? "bg-sky-600 text-white shadow-sm"
                          : "text-slate-600 hover:text-navy-950"
                      }`}
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span>Mode Grid</span>
                    </button>
                  </div>
                )}
              </div>

              {/* SLIDER VIEW MODE */}
              {viewMode === "slider" && galeriList.length > 0 && (
                <div className="space-y-4">
                  {/* Main Slider Display Stage */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-xl group">
                    <Image
                      src={activeSlide?.foto_url || mainPhoto}
                      alt={activeSlide?.caption || updateItem.judul}
                      fill
                      className="object-cover transition-all duration-500"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-black/20" />

                    {/* Expand Zoom Trigger Button */}
                    <button
                      onClick={() => setSelectedPhotoIndex(currentSlideIndex)}
                      className="absolute top-4 right-4 p-3 bg-slate-900/80 hover:bg-sky-600 text-white rounded-full backdrop-blur-md shadow-lg border border-white/20 transition-all hover:scale-110 active:scale-95"
                      title="Perbesar Layar Penuh"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    {/* Counter Badge */}
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3.5 py-1 rounded-full shadow">
                      Foto {currentSlideIndex + 1} dari {galeriList.length}
                    </div>

                    {/* Previous Slide Navigation Arrow */}
                    {galeriList.length > 1 && (
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-slate-900/70 hover:bg-sky-600 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl transition-all hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-90"
                        aria-label="Slide Sebelumya"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                    )}

                    {/* Next Slide Navigation Arrow */}
                    {galeriList.length > 1 && (
                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-slate-900/70 hover:bg-sky-600 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl transition-all hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-90"
                        aria-label="Slide Selanjutnya"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    )}

                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="font-semibold text-sm sm:text-base drop-shadow-md">
                        {activeSlide?.caption || updateItem.judul}
                      </p>
                    </div>
                  </div>

                  {/* Thumbnail Navigation Strip */}
                  {galeriList.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                      {galeriList.map((foto, idx) => (
                        <button
                          key={foto.id || idx}
                          onClick={() => setCurrentSlideIndex(idx)}
                          className={`relative aspect-[4/3] w-24 sm:w-28 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            currentSlideIndex === idx
                              ? "border-sky-500 ring-2 ring-sky-300 scale-105 shadow-md"
                              : "border-slate-200 opacity-65 hover:opacity-100 hover:border-slate-400"
                          }`}
                        >
                          <Image
                            src={foto.foto_url}
                            alt={foto.caption || `Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* GRID VIEW MODE */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galeriList.map((foto, idx) => (
                    <div
                      key={foto.id || idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer shadow-sm hover:shadow-xl transition-all"
                    >
                      <Image
                        src={foto.foto_url}
                        alt={foto.caption || updateItem.judul}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="p-2.5 rounded-full bg-white/90 text-navy-950 shadow-lg">
                          <Maximize2 className="w-5 h-5" />
                        </span>
                      </div>
                      {foto.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-slate-950/80 backdrop-blur-md text-[11px] text-white truncate">
                          {foto.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5 text-sky-700">
                <Sparkles className="w-4 h-4 text-orange-500" /> UKM-F Penalaran AcSES FEB Universitas Airlangga
              </span>
              <span>Desa Banyusangka · 2026</span>
            </div>
          </div>
        </article>

        {/* ===== SECTION KEGIATAN LAINNYA (3 RELATED CARDS) ===== */}
        {relatedList.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-serif font-bold text-navy-950 text-2xl">
                Dokumentasi Kegiatan Lainnya
              </h3>
              <Link
                href="/update"
                className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1"
              >
                Lihat Semua Update <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedList.map((rel) => {
                const relAnchor = `/update/${rel.slug || rel.id}`;
                return (
                  <Link
                    key={rel.id}
                    href={relAnchor}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                        <Image
                          src={rel.foto_url || "/images/galeri/pelatihan-1.png"}
                          alt={rel.judul}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-navy-950/80 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/20">
                            {rel.kategori}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <span className="text-[10px] text-sky-700 font-semibold block mb-1">
                          {rel.tanggal}
                        </span>
                        <h4 className="font-serif font-bold text-navy-950 text-base leading-snug line-clamp-2 group-hover:text-sky-600 transition-colors">
                          {rel.judul}
                        </h4>
                        <p className="text-slate-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                          {rel.isi_singkat}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs font-bold text-sky-700 group-hover:text-sky-800">
                      <span>Baca Detail</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* ===== LIGHTBOX MODAL FULLSCREEN WITH CAROUSEL CONTROLS ===== */}
      {selectedPhotoIndex !== null && galeriList[selectedPhotoIndex] && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
          >
            {/* Close Lightbox Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-full transition-all"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter Tag */}
            <div className="absolute -top-12 left-0 text-white text-xs font-bold bg-slate-800/80 px-3 py-1 rounded-full border border-white/20">
              Foto {selectedPhotoIndex + 1} dari {galeriList.length}
            </div>

            {/* Main Fullscreen Image Stage */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galeriList[selectedPhotoIndex].foto_url}
                alt={galeriList[selectedPhotoIndex].caption || "Foto Kegiatan"}
                className="w-full h-full object-contain"
              />

              {/* Prev Arrow in Lightbox */}
              {galeriList.length > 1 && (
                <button
                  onClick={prevLightbox}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-sky-600 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 transition-all hover:scale-110 active:scale-95"
                  aria-label="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
              )}

              {/* Next Arrow in Lightbox */}
              {galeriList.length > 1 && (
                <button
                  onClick={nextLightbox}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-sky-600 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 transition-all hover:scale-110 active:scale-95"
                  aria-label="Foto Selanjutnya"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              )}
            </div>

            {galeriList[selectedPhotoIndex].caption && (
              <p className="mt-4 text-center text-white text-sm sm:text-base font-medium max-w-2xl bg-slate-900/90 border border-slate-800 px-6 py-2.5 rounded-2xl shadow">
                {galeriList[selectedPhotoIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
