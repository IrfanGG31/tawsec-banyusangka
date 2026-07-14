"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import galeriData from "@/data/galeri.json";
import { X, ZoomIn } from "lucide-react";

const kategori = ["Semua", "Pelatihan", "Produksi", "Desa", "Produk"];

export default function GaleriPage() {
  const [aktif, setAktif] = useState("Semua");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxJudul, setLightboxJudul] = useState("");

  const filtered =
    aktif === "Semua" ? galeriData : galeriData.filter((g) => g.kategori === aktif);

  const openLightbox = (foto: string, judul: string) => {
    setLightbox(foto);
    setLightboxJudul(judul);
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-800 to-primary-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">Galeri Kegiatan</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Dokumentasi perjalanan program TAWSEC — dari pelatihan, produksi, hingga
              pameran produk UMKM Banyusangka.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Filter */}
        <FadeIn>
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {kategori.map((k) => (
              <button
                key={k}
                id={`galeri-filter-${k.toLowerCase()}`}
                onClick={() => setAktif(k)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  aktif === k
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-white text-navy-600 border border-gray-200 hover:border-primary-300 hover:text-primary-700"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <StaggerItem key={item.id}>
              <button
                className="group relative w-full aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                onClick={() => openLightbox(item.foto, item.judul)}
                id={`galeri-item-${item.id}`}
                aria-label={`Buka foto: ${item.judul}`}
              >
                <Image
                  src={item.foto}
                  alt={item.judul}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full mb-1">
                    {item.kategori}
                  </span>
                  <p className="text-white font-semibold text-sm">{item.judul}</p>
                  <p className="text-white/70 text-xs">{item.tanggal}</p>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-navy-400">
            <p className="text-4xl mb-3">📷</p>
            <p className="font-medium">Belum ada foto untuk kategori ini.</p>
          </div>
        )}

        <FadeIn delay={0.3}>
          <div className="mt-10 bg-primary-50 border border-primary-200 rounded-2xl p-6 text-center">
            <p className="text-navy-600 text-sm">
              📸 Galeri akan terus diperbarui seiring berjalannya program TAWSEC.
              Foto akan ditambahkan dari setiap sesi pelatihan dan kegiatan produksi.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
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
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt={lightboxJudul}
                width={1200}
                height={900}
                className="w-full h-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white font-semibold">{lightboxJudul}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
