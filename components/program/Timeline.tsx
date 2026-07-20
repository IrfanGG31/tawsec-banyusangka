"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import { CheckCircle2, Clock, Calendar, ChevronRight } from "lucide-react";

interface TimelineStep {
  id: string;
  periode: string;
  judul: string;
  deskripsi: string;
  status: "Selesai" | "Berjalan" | "Belum Mulai";
  pic: string;
}

const timelineData: TimelineStep[] = [
  {
    id: "t1",
    periode: "April 2026",
    judul: "Survei Kebutuhan & Pemetaan Potensi Desab",
    deskripsi: "Pengumpulan data awal perikanan PPI Banyusangka, identifikasi 45+ pelaku ngojur, dan koordinasi dengan Pemdes & PKK.",
    status: "Selesai",
    pic: "Puguh Muqoddam & Tim Field Ops",
  },
  {
    id: "t2",
    periode: "Mei–Juni 2026",
    judul: "Pelatihan Pilar 1 (Kewirausahaan) & Pilar 2 (Produksi Higienis)",
    deskripsi: "Pelatihan HPP, modal awal, BEP, serta SOP produksi higienis Abon Ikan Tongkol, Kerupuk Kulit Ikan, dan Tepung Tulang Ikan.",
    status: "Selesai",
    pic: "Ririn R. & Aisyah N. F.",
  },
  {
    id: "t3",
    periode: "Juni–Juli 2026",
    judul: "Pelatihan Pilar 3 (Digitalisasi & Branding) & Pilar 4 (Legalitas)",
    deskripsi: "Desain logo & kemasan, fotografi produk HP, pendaftaran Toko Shopee/WA Business, pengajuan NIB OSS, dan Sertifikasi Halal BPJPH.",
    status: "Selesai",
    pic: "Cynthia S. P. & M. Izar Alfatih",
  },
  {
    id: "t4",
    periode: "15 Juli 2026",
    judul: "Peluncuran Website Resmi & Etalase Digital TAWSEC",
    deskripsi: "Rilis platform web e-katalog beralamat resmi untuk publikasi produk olahan laut dan profil keberlanjutan Desa Banyusangka.",
    status: "Selesai",
    pic: "Tim Ormawa AcSES FEB UNAIR",
  },
  {
    id: "t5",
    periode: "Juli–Agustus 2026",
    judul: "Pendampingan Pemasaran, Ritel, & Draf Perdes Keberlanjutan",
    deskripsi: "Pemasyaratan produk ke 3 gerai ritel Bangkalan, pendampingan transaksi e-commerce, dan perumusan draf Peraturan Desa (Perdes).",
    status: "Berjalan",
    pic: "Puguh M. & Wahdatil Izzah",
  },
];

export default function Timeline() {
  return (
    <section className="py-12">
      <div className="mb-10 text-center">
        <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
          📅 Jadwal Resmi Program
        </span>
        <h2 className="font-serif font-bold text-navy-950 text-3xl mt-3">Timeline Pelaksanaan Program TAWSEC</h2>
        <p className="text-navy-600 text-sm mt-2 max-w-xl mx-auto">
          Alur kegiatan berkelanjutan dari April hingga Agustus 2026 yang dilaksanakan oleh UKM-F Penalaran AcSES FEB UNAIR.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 border-l-2 border-primary-200 space-y-8">
        {timelineData.map((step, idx) => (
          <FadeIn key={step.id} delay={idx * 0.1}>
            <div className="relative group">
              {/* Timeline Bullet Indicator */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center shadow-md">
                {step.status === "Selesai" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : step.status === "Berjalan" ? (
                  <span className="w-3 h-3 rounded-full bg-sunset-500 animate-ping" />
                ) : (
                  <Clock className="w-4 h-4 text-navy-300" />
                )}
              </div>

              {/* Card Container */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-100">
                    <Calendar className="w-3 h-3" />
                    {step.periode}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
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

                <h3 className="font-serif font-bold text-navy-950 text-lg leading-snug mb-2">
                  {step.judul}
                </h3>

                <p className="text-navy-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {step.deskripsi}
                </p>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-navy-400">
                  <span>PIC: <strong className="text-navy-700">{step.pic}</strong></span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
