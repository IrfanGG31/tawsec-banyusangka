"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import galeriData from "@/data/galeri.json";
import { X, ZoomIn, Loader2, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface GaleriItem {
  id: string;
  judul: string;
  kategori: string;
  foto: string;
  tanggal?: string;
  deskripsi?: string;
  link_gdrive?: string;
}

const kategoriList = ["Semua", "Pelatihan", "Produksi", "Desa", "Produk", "RND", "Lainnya"];

export default function GaleriPage() {
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [aktif, setAktif] = useState("Semua");
  const [lightbox, setLightbox] = useState<GaleriItem | null>(null);

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const supabase = createClient();
        if (supabase) {
          // Fetch from Supabase table 'dokumentasi'
          const { data, error } = await supabase.from("dokumentasi").select("*");
          if (!error && data && data.length > 0) {
            const mapped: GaleriItem[] = data.map((d: Record<string, unknown>) => ({
              id: d.id as string,
              judul: (d.nama_kegiatan as string) || (d.judul as string) || "Dokumentasi Kegiatan",
              kategori: (d.kategori as string) || "Lainnya",
              foto: (d.foto_url as string) || (d.foto as string) || "/images/galeri/pelatihan-1.png",
              tanggal: (d.tanggal as string) || "",
              deskripsi: (d.deskripsi as string) || "",
              link_gdrive: (d.link_gdrive as string) || "",
            }));
            setItems(mapped);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Fallback
      }

      const defaultMapped = galeriData.map((g) => ({
        id: g.id,
        judul: g.judul,
        kategori: g.kategori,
        foto: g.foto,
        tanggal: g.tanggal,
      }));
      setItems(defaultMapped);
      setLoading(false);
    };

    fetchGaleri();
  }, []);

  const filtered =
    aktif === "Semua"
      ? items
      : items.filter(
          (g) =>
            g.kategori.toLowerCase().includes(aktif.toLowerCase()) ||
            (aktif === "Pelatihan" && g.kategori.includes("Pilar"))
        );

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-sky-950 text-white py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">Galeri Kegiatan</h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Arsip dokumentasi foto visual kegiatan pengabdian TAWSEC — dari survei lapangan, pelatihan 4 pilar, produksi higienis, hingga pameran produk UMKM Banyusangka.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Filter */}
        <FadeIn>
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {kategoriList.map((k) => (
              <button
                key={k}
                id={`galeri-filter-${k.toLowerCase()}`}
                onClick={() => setAktif(k)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  aktif === k
                    ? "bg-sky-600 text-white shadow-lg scale-105"
                    : "bg-white text-navy-600 border border-gray-200 hover:border-sky-300 hover:text-sky-700"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </FadeIn>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
            <span className="text-sm font-medium">Memuat galeri dokumentasi...</span>
          </div>
        ) : (
          /* Grid */
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {filtered.map((item) => (
              <StaggerItem key={item.id}>
                <button
                  className="group relative w-full aspect-[4/3] bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer border border-slate-200 text-left"
                  onClick={() => setLightbox(item)}
                  id={`galeri-item-${item.id}`}
                  aria-label={`Buka foto: ${item.judul}`}
                >
                  <Image
                    src={item.foto}
                    alt={item.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/40">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <span className="inline-block bg-sky-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 border border-white/20">
                      {item.kategori}
                    </span>
                    <p className="text-white font-serif font-bold text-lg leading-snug drop-shadow">{item.judul}</p>
                    {item.tanggal && <p className="text-sky-300 text-xs mt-1">{item.tanggal}</p>}
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-navy-400">
            <p className="text-4xl mb-3">📷</p>
            <p className="font-medium text-slate-600">Belum ada foto untuk kategori "{aktif}".</p>
          </div>
        )}

        <FadeIn delay={0.3}>
          <div className="mt-12 bg-sky-50 border border-sky-200 rounded-2xl p-6 text-center shadow-sm">
            <p className="text-navy-700 text-sm font-medium">
              📷 Galeri dapat dikelola langsung dari Dashboard Admin. Foto baru dari sesi pelatihan dan kegiatan produksi dapat diunggah kapan saja.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Tutup lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[65vh] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightbox.foto}
                  alt={lightbox.judul}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                    {lightbox.kategori} {lightbox.tanggal && `· ${lightbox.tanggal}`}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-white">{lightbox.judul}</h3>
                  {lightbox.deskripsi && <p className="text-slate-300 text-xs mt-1 max-w-xl">{lightbox.deskripsi}</p>}
                </div>

                {lightbox.link_gdrive && (
                  <a
                    href={lightbox.link_gdrive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md flex-shrink-0"
                  >
                    <span>Buka Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
