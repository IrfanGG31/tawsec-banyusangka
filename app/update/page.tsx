import type { Metadata } from "next";
import Image from "next/image";
import updatesData from "@/data/updates.json";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import { Calendar, Tag, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Perkembangan & News",
  description: "Update berita dan perkembangan berkala program TAWSEC Banyusangka oleh AcSES FEB UNAIR.",
};

export default function UpdatePage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-900 via-primary-900 to-navy-950 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-6">
              <Newspaper className="w-4 h-4 text-sunset-400" />
              Kabar &amp; Perkembangan Program
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Update TAWSEC Banyusangka
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Posting berkala kegiatan pelatihan, pendampingan, dan capaian UMKM olahan laut pesisir Madura.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <StaggerContainer className="space-y-8">
          {updatesData.map((item) => (
            <StaggerItem key={item.id}>
              <article className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
                <div className="md:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={item.foto_url}
                    alt={item.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="md:col-span-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-full border border-primary-100">
                      <Tag className="w-3 h-3" />
                      {item.kategori}
                    </span>
                    <span className="text-navy-400 text-xs flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.tanggal}
                    </span>
                  </div>

                  <h2 className="font-serif font-bold text-navy-950 text-xl sm:text-2xl leading-snug">
                    {item.judul}
                  </h2>

                  <p className="text-navy-600 text-sm leading-relaxed">
                    {item.isi_singkat}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
