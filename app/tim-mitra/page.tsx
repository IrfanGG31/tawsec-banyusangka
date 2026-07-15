import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import timData from "@/data/tim.json";
import { Users, Anchor, Star, Building, Briefcase, Landmark, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Tim & Mitra",
  description:
    "Tim pelaksana program TAWSEC Banyusangka: mahasiswa KKN Universitas Airlangga, dosen pembimbing, dan kelembagaan mitra desa.",
};

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-6 h-6" />,
  anchor: <Anchor className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
  building: <Building className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  landmark: <Landmark className="w-6 h-6" />,
};

export default function TimMitraPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-900 to-primary-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">Tim &amp; Mitra</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Program TAWSEC dijalankan oleh tim mahasiswa KKN Universitas Airlangga
              bersama kelembagaan desa Banyusangka.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* Dosen Pembimbing */}
        <FadeIn>
          <section>
            <div className="mb-8">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Supervisi</span>
              <h2 className="font-serif font-bold text-navy-900 text-3xl mt-1">Dosen Pembimbing</h2>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {timData.dosen_pembimbing.map((d, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md text-center max-w-xs w-full">
                  <div className="relative w-24 h-24 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 p-4 shadow-inner">
                    <Image
                      src="/images/logos/logo-unair-biru.png"
                      alt="Logo UNAIR"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <h3 className="font-serif font-bold text-navy-900 text-xl mb-1">{d.nama}</h3>
                  <p className="text-primary-600 font-semibold text-sm mb-1">{d.jabatan}</p>
                  <p className="text-navy-500 text-sm">{d.institusi}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Mahasiswa KKN */}
        <section>
          <FadeIn>
            <div className="mb-8">
              <span className="text-sunset-500 font-semibold text-sm uppercase tracking-widest">Pelaksana</span>
              <h2 className="font-serif font-bold text-navy-900 text-3xl mt-1">Mahasiswa KKN</h2>
              <p className="text-navy-500 mt-2">Tim lintas fakultas Universitas Airlangga yang menjalankan program di lapangan.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {timData.mahasiswa_kkn.map((m, i) => (
              <StaggerItem key={i}>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
                    👩‍🎓
                  </div>
                  <h3 className="font-serif font-bold text-navy-900 text-lg mb-1">{m.nama}</h3>
                  <p className="text-primary-600 text-xs font-semibold uppercase tracking-wider mb-2">{m.fakultas}</p>
                  <div className="bg-primary-50 rounded-xl px-3 py-2">
                    <p className="text-navy-700 text-sm">{m.peran}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Mitra Desa */}
        <FadeIn>
          <section>
            <div className="mb-8">
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">Kolaborasi</span>
              <h2 className="font-serif font-bold text-navy-900 text-3xl mt-1">Kelembagaan Mitra Desa</h2>
              <p className="text-navy-500 mt-2">TAWSEC berkolaborasi dengan berbagai kelembagaan lokal Desa Banyusangka.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {timData.mitra_desa.map((m, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-emerald-600">{iconMap[m.icon] ?? <Building className="w-6 h-6" />}</div>
                  </div>
                  <div>
                    <p className="font-serif font-bold text-navy-800">{m.nama}</p>
                    <p className="text-navy-500 text-sm mt-0.5">{m.peran}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Institusi */}
        <FadeIn>
          <div className="bg-gradient-ocean rounded-3xl p-8 text-white text-center relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="flex gap-6 items-center">
                <div className="relative w-20 h-20 bg-white p-2.5 rounded-2xl shadow-md">
                  <Image
                    src="/images/logos/logo-unair-biru.png"
                    alt="Logo UNAIR"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="relative w-20 h-20 bg-white p-2 rounded-2xl shadow-md">
                  <Image
                    src="/images/logos/logo-acses.png"
                    alt="Logo ACSES"
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-serif font-bold text-2xl mb-2">LPMB Universitas Airlangga &amp; ACSES</h3>
                <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed">
                  Program TAWSEC diselenggarakan oleh Lembaga Pengabdian Masyarakat Berkelanjutan (LPMB) Universitas Airlangga berkolaborasi dengan ACSES (Association of Certified Sustainability Practitioners) sebagai aksi nyata pemecahan kemiskinan dan keberlanjutan wilayah pesisir.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
