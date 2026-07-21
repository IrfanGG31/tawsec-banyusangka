"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Animations";
import { CheckCircle2, Clock, Calendar, UserCheck, ArrowUpRight, BookOpen } from "lucide-react";

interface TimelineStep {
  id: string;
  periode: string;
  judul: string;
  deskripsi: string;
  status: "Selesai" | "Berjalan" | "Belum Mulai";
  pic: string;
  foto: string;
}

const timelineData: TimelineStep[] = [
  {
    id: "t1",
    periode: "April 2026",
    judul: "Survei Kebutuhan & Pemetaan Potensi Desa",
    deskripsi: "Pengumpulan data awal perikanan PPI Banyusangka, identifikasi 45+ pelaku ngojur, dan koordinasi dengan Pemdes & PKK.",
    status: "Selesai",
    pic: "Puguh Muqoddam & Tim Field Ops",
    foto: "/images/galeri/nelayan-1.png",
  },
  {
    id: "t2",
    periode: "Mei–Juni 2026",
    judul: "Pelatihan Pilar 1 (Kewirausahaan) & Pilar 2 (Produksi Higienis)",
    deskripsi: "Pelatihan HPP, modal awal, BEP, serta SOP produksi higienis Abon Ikan Tongkol, Kerupuk Kulit Ikan, dan Tepung Tulang Ikan.",
    status: "Selesai",
    pic: "Ririn R. & Aisyah N. F.",
    foto: "/images/galeri/produksi-1.png",
  },
  {
    id: "t3",
    periode: "Juni–Juli 2026",
    judul: "Pelatihan Pilar 3 (Digitalisasi & Branding) & Pilar 4 (Legalitas)",
    deskripsi: "Desain logo & kemasan, fotografi produk HP, pendaftaran Toko Shopee/WA Business, pengajuan NIB OSS, dan Sertifikasi Halal BPJPH.",
    status: "Selesai",
    pic: "Cynthia S. P. & M. Izar Alfatih",
    foto: "/images/galeri/display-1.png",
  },
  {
    id: "t4",
    periode: "15 Juli 2026",
    judul: "Peluncuran Website Resmi & Etalase Digital TAWSEC",
    deskripsi: "Rilis platform web e-katalog beralamat resmi untuk publikasi produk olahan laut dan profil keberlanjutan Desa Banyusangka.",
    status: "Selesai",
    pic: "Tim Ormawa AcSES FEB UNAIR",
    foto: "/images/galeri/display-1.png",
  },
  {
    id: "t5",
    periode: "Juli–Agustus 2026",
    judul: "Pendampingan Pemasaran, Ritel, & Draf Perdes Keberlanjutan",
    deskripsi: "Pemasyaratan produk ke 3 gerai ritel Bangkalan, pendampingan transaksi e-commerce, dan perumusan draf Peraturan Desa (Perdes).",
    status: "Berjalan",
    pic: "Puguh M. & Wahdatil Izzah",
    foto: "/images/galeri/pelatihan-1.png",
  },
];

export default function Timeline() {
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
        {timelineData.map((step, idx) => (
          <FadeIn key={step.id} delay={idx * 0.1}>
            <div className="relative group">
              {/* Timeline Bullet Indicator */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center shadow-md z-10">
                {step.status === "Selesai" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : step.status === "Berjalan" ? (
                  <span className="w-3 h-3 rounded-full bg-sunset-500 animate-ping" />
                ) : (
                  <Clock className="w-4 h-4 text-navy-300" />
                )}
              </div>

              {/* Visual Interactive Card Container */}
              <Link
                href={`/update#${step.id}`}
                className="block bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 group/card"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  {/* Photo Preview Column */}
                  <div className="md:col-span-4 relative aspect-[16/10] md:aspect-auto bg-gray-100 overflow-hidden">
                    <Image
                      src={step.foto}
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
                            step.status === "Selesai"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : step.status === "Berjalan"
                              ? "bg-sunset-50 text-sunset-700 border border-sunset-200"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {step.status === "Selesai" ? "✓ Selesai" : step.status === "Berjalan" ? "⚡ Sedang Berjalan" : "⏳ Belum Mulai"}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-navy-950 text-xl leading-snug mb-2 group-hover/card:text-primary-600 transition-colors">
                        {step.judul}
                      </h3>

                      <p className="text-navy-600 text-xs sm:text-sm leading-relaxed mb-5">
                        {step.deskripsi}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-navy-500">
                      <span className="flex items-center gap-1 font-medium text-navy-600">
                        <UserCheck className="w-3.5 h-3.5 text-primary-600" />
                        PIC: <strong className="text-navy-800">{step.pic}</strong>
                      </span>

                      {/* Direct Link Button to /update */}
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
        ))}
      </div>
    </section>
  );
}
