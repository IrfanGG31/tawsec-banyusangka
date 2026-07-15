import type { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import modulData from "@/data/modul.json";
import { TrendingUp, Leaf, Smartphone, Shield, BookOpen, Download, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Modul & Pelatihan",
  description:
    "Modul pelatihan program TAWSEC Banyusangka: kewirausahaan, produksi berkelanjutan, digitalisasi branding, dan legalitas usaha untuk UMKM olahan laut.",
};

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Leaf: <Leaf className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
};

const colorMap: Record<string, { bg: string; icon: string; num: string; bar: string }> = {
  blue: { bg: "bg-primary-50 border-primary-200", icon: "bg-primary-600 text-white", num: "text-primary-700", bar: "bg-primary-500" },
  green: { bg: "bg-emerald-50 border-emerald-200", icon: "bg-emerald-600 text-white", num: "text-emerald-700", bar: "bg-emerald-500" },
  purple: { bg: "bg-purple-50 border-purple-200", icon: "bg-purple-600 text-white", num: "text-purple-700", bar: "bg-purple-500" },
  orange: { bg: "bg-orange-50 border-orange-200", icon: "bg-orange-600 text-white", num: "text-orange-700", bar: "bg-orange-500" },
};

export default function ModulPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-800 to-primary-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sm px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-4 h-4" />
              Pusat Referensi Materi
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">Modul &amp; Pelatihan</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Materi lengkap 4 pilar program TAWSEC — dapat diakses ulang oleh peserta kapan
              saja sebagai referensi dalam menjalankan usaha.
            </p>
            <div className="flex justify-center">
              <a
                href="/modul/Modul-Lengkap-TAWSEC.pdf"
                download
                className="inline-flex items-center gap-2.5 bg-sunset-500 hover:bg-sunset-600 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Unduh Buku Modul Lengkap (PDF)
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Overview cards */}
        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {modulData.map((m) => {
              const c = colorMap[m.warna];
              return (
                <div key={m.id} className={`rounded-2xl border p-4 text-center ${c.bg}`}>
                  <div className={`w-10 h-10 ${c.icon} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    {iconMap[m.ikon]}
                  </div>
                  <p className={`font-bold text-sm ${c.num}`}>Pilar {m.nomor}</p>
                  <p className="text-navy-700 text-xs leading-tight mt-0.5">{m.judul}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* Modul detail */}
        <div className="space-y-12">
          {modulData.map((pilar, pi) => {
            const c = colorMap[pilar.warna];
            return (
              <FadeIn key={pilar.id} delay={pi * 0.1}>
                <section id={pilar.id}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 ${c.icon} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      {iconMap[pilar.ikon]}
                    </div>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${c.num}`}>Pilar {pilar.nomor}</span>
                      <h2 className="font-serif font-bold text-navy-900 text-2xl">{pilar.judul}</h2>
                    </div>
                  </div>
                  <p className="text-navy-600 mb-6 leading-relaxed">{pilar.ringkasan}</p>

                  <div className="space-y-3">
                    {pilar.materi.map((m, mi) => (
                      <div
                        key={mi}
                        className={`flex items-start gap-4 p-5 rounded-2xl border ${c.bg} hover:shadow-sm transition-shadow`}
                      >
                        <div className={`w-8 h-8 ${c.bar} text-white rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold`}>
                          {mi + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-navy-800">{m.judul}</p>
                          <p className="text-navy-500 text-sm mt-0.5 leading-relaxed">{m.deskripsi}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-navy-300 flex-shrink-0 mt-0.5" />
                      </div>
                    ))}
                  </div>

                </section>
              </FadeIn>
            );
          })}
        </div>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-16 bg-gradient-ocean rounded-3xl p-8 text-white text-center">
            <h3 className="font-serif font-bold text-2xl mb-3">Ingin Bergabung sebagai Peserta?</h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Hubungi tim program TAWSEC untuk informasi pendaftaran dan jadwal pelatihan berikutnya.
            </p>
            <Link
              href="/kontak"
              id="modul-cta-kontak"
              className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-2xl hover:shadow-xl hover:scale-105 transition-all"
            >
              📞 Hubungi Kami
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
