import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import timData from "@/data/tim.json";
import anggotaData from "@/data/anggota.json";
import { Users, Anchor, Star, Building, Briefcase, Landmark, Camera, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Tim & Mitra",
  description:
    "Tim pelaksana program TAWSEC Banyusangka: mahasiswa Universitas Airlangga, dosen pembimbing, dan kelembagaan mitra desa.",
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
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              ACSES &amp; UNAIR Sustainability Program
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">Tim &amp; Mitra</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              15 mahasiswa Universitas Airlangga yang turun langsung ke lapangan bersama
              mitra kelembagaan Desa Banyusangka.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* === FOTO GRUP TEAM === */}
        <FadeIn>
          <section>
            <div className="text-center mb-8">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Foto Tim</span>
              <h2 className="font-serif font-bold text-navy-900 text-3xl mt-1">Bersama di Lapangan</h2>
              <p className="text-navy-500 mt-2">Tim TAWSEC yang terjun langsung ke Desa Banyusangka</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Foto 1 - TAWSEC Company shoot */}
              <div className="relative group overflow-hidden rounded-3xl shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/anggota/tim-group-1.jpg"
                    alt="Tim TAWSEC — Sesi foto tim bersama sign TAWSEC Company"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-4 h-4 text-white/70" />
                      <span className="text-white/70 text-xs">TAWSEC Company</span>
                    </div>
                    <p className="text-white font-serif font-bold text-lg leading-tight">
                      Tim TAWSEC — Building Ideas, Creating Impact
                    </p>
                  </div>
                </div>
              </div>

              {/* Foto 2 - Pasar Ikan Banyusangka */}
              <div className="relative group overflow-hidden rounded-3xl shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/anggota/tim-group-2.jpg"
                    alt="Tim TAWSEC di Pasar Ikan Desa Banyusangka Bangkalan"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-white/70" />
                      <span className="text-white/70 text-xs">Pasar Ikan Desa Banyusangka, Bangkalan</span>
                    </div>
                    <p className="text-white font-serif font-bold text-lg leading-tight">
                      Terjun Langsung ke Pasar Ikan Banyusangka
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* === GRID 15 ANGGOTA === */}
        <section>
          <FadeIn>
            <div className="mb-8">
              <span className="text-sunset-500 font-semibold text-sm uppercase tracking-widest">Pelaksana</span>
              <h2 className="font-serif font-bold text-navy-900 text-3xl mt-1">15 Anggota Tim</h2>
              <p className="text-navy-500 mt-2">Mahasiswa lintas fakultas Universitas Airlangga yang menjalankan program di lapangan.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {anggotaData.map((a, i) => (
              <StaggerItem key={i}>
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center group">
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    {a.foto && a.foto !== "/images/anggota/placeholder-member.png" ? (
                      <Image
                        src={a.foto}
                        alt={a.nama}
                        fill
                        className="object-cover rounded-2xl"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {i % 2 === 0 ? "👩‍🎓" : "👨‍🎓"}
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-navy-900 text-xs leading-snug mb-0.5">{a.nama}</h3>
                  <p className="text-navy-400 text-[9px] font-medium mb-1">{a.prodi}</p>
                  <p className="text-primary-600 text-[10px] font-semibold leading-tight">{a.peran}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Dosen Pembimbing */}
        <FadeIn>
          <section>
            <div className="mb-8 text-center">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Supervisi Akademik</span>
              <h2 className="font-serif font-bold text-navy-900 text-3xl mt-1">Dosen Pembimbing</h2>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {timData.dosen_pembimbing.map((d, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md text-center max-w-md w-full hover:shadow-xl transition-shadow">
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

        {/* Mitra Program (2 Kategori) */}
        <section className="space-y-12">
          {/* Kategori 1: Sasaran Program */}
          <FadeIn>
            <div>
              <div className="mb-6">
                <span className="text-sunset-500 font-semibold text-xs uppercase tracking-widest bg-sunset-50 px-3 py-1 rounded-full border border-sunset-100">
                  Kategori 1
                </span>
                <h2 className="font-serif font-bold text-navy-900 text-2xl mt-2">Mitra Sasaran Program</h2>
                <p className="text-navy-500 text-sm">Kelompok masyarakat pesisir yang menjadi fokus utama penguatan kapasitas.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timData.mitra_sasaran.map((m, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-sunset-100 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 text-sunset-600">
                      {iconMap[m.icon] ?? <Users className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-serif font-bold text-navy-900 text-base">{m.nama}</p>
                      <p className="text-navy-500 text-xs mt-1">{m.peran}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Kategori 2: Fasilitator & Mitra Eksternal */}
          <FadeIn>
            <div>
              <div className="mb-6">
                <span className="text-emerald-600 font-semibold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Kategori 2
                </span>
                <h2 className="font-serif font-bold text-navy-900 text-2xl mt-2">Fasilitator &amp; Kemitraan Eksternal</h2>
                <p className="text-navy-500 text-sm">Instansi pemerintah, akademisi, dan lembaga perbankan penunjang keberlanjutan usaha.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {timData.mitra_fasilitator.map((m, i) => (
                  <div key={i} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-3">
                        {iconMap[m.icon] ?? <Building className="w-5 h-5" />}
                      </div>
                      <p className="font-serif font-bold text-navy-900 text-sm leading-snug mb-1">{m.nama}</p>
                      <p className="text-navy-500 text-xs leading-relaxed">{m.peran}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Institusi Banner */}
        <FadeIn>
          <div className="bg-gradient-ocean rounded-3xl p-8 sm:p-10 text-white text-center relative overflow-hidden shadow-xl">
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
                <h3 className="font-serif font-bold text-2xl mb-2">UKM-F Penalaran AcSES FEB Universitas Airlangga</h3>
                <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed">
                  Program TAWSEC diselenggarakan melalui skema hibah pengabdian <strong>UNAIR SUSTAINACTION 2026</strong> oleh UKM-F Penalaran AcSES FEB Universitas Airlangga sebagai aksi nyata pemberdayaan ekonomi pesisir di Desa Banyusangka.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
