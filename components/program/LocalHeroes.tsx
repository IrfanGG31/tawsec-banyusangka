"use client";

import Image from "next/image";
import { Heart, Sparkles, Anchor, Award } from "lucide-react";
import { FadeIn } from "@/components/ui/Animations";

const heroes = [
  {
    nama: "Ibu Nurhayati",
    peran: "Ketua KUB Olahan Laut Banyusangka",
    lokasi: "Dusun Pesisir, Banyusangka",
    kisah: "Sebelumnya menjual sisa tangkapan mentah dengan harga murah saat musim panen. Kini memimpin 10+ ibu-ibu dalam memproduksi Abon Ikan Tongkol higienis bernilai jual tinggi.",
    foto: "/images/galeri/pelatihan-1.png",
    dampak: "Omzet UMKM Naik & Mandiri",
  },
  {
    nama: "Ibu Mariyam",
    peran: "Spesialis Pengolahan Zero Waste (Kerupuk & Tepung)",
    lokasi: "PPI Banyusangka",
    kisah: "Menguasai teknik pemisahan duri, pengeringan kulit, dan penepungan tulang ikan layang. Memastikan 0% sisa tangkapan terbuang percuma.",
    foto: "/images/galeri/produksi-1.png",
    dampak: "Pengolah Zero Waste Pertama",
  },
];

export default function LocalHeroes() {
  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 via-primary-50/30 to-white rounded-3xl p-8 sm:p-12 border border-gray-100 my-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-100 px-3.5 py-1 rounded-full border border-primary-200">
          <Anchor className="w-3.5 h-3.5 text-sunset-500" /> Local Heroes Pesisir Banyusangka
        </span>
        <h2 className="font-serif font-bold text-navy-950 text-3xl sm:text-4xl mt-3">
          Sosok Utama Dibalik Olahan Laut TAWSEC
        </h2>
        <p className="text-navy-600 text-sm mt-2 leading-relaxed">
          Kisah perjuangan dan daya tangguh perempuan nelayan (*pelaku ngojur*) yang bertransformasi menjadi wirausaha mandiri di Desa Banyusangka.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {heroes.map((hero, idx) => (
          <FadeIn key={hero.nama} delay={idx * 0.15}>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full">
              <div>
                <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={hero.foto}
                    alt={hero.nama}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-1 inline-block">
                      🏆 {hero.dampak}
                    </span>
                    <h3 className="font-serif font-bold text-lg leading-tight">{hero.nama}</h3>
                    <p className="text-white/80 text-xs">{hero.peran}</p>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-primary-700 font-semibold">
                    <Award className="w-3.5 h-3.5 text-sunset-500" />
                    <span>Lokasi: {hero.lokasi}</span>
                  </div>

                  <p className="text-navy-600 text-xs sm:text-sm leading-relaxed italic">
                    &ldquo;{hero.kisah}&rdquo;
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-50 mt-2 flex items-center justify-between text-xs font-semibold text-emerald-700">
                <span className="inline-flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Didampingi UKM-F Penalaran AcSES FEB UNAIR
                </span>
                <span className="text-primary-600">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
