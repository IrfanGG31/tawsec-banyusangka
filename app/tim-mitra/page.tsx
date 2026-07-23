import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import timData from "@/data/tim.json";
import { getSiteSettings } from "@/lib/supabase/settings";
import {
  Users, Anchor, Star, Building, Briefcase, Landmark, Camera, MapPin,
  MessageCircle, ShoppingBag, Clock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tim & Kontak",
  description:
    "Tim pelaksana program TAWSEC Banyusangka (mahasiswa Universitas Airlangga, dosen pembimbing, mitra desa) serta informasi kontak & lokasi produksi.",
};

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-6 h-6" />,
  anchor: <Anchor className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
  building: <Building className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  landmark: <Landmark className="w-6 h-6" />,
};

export default async function TimMitraPage() {
  const settings = await getSiteSettings();
  const { foto_tim, anggota, identitas, social_media } = settings;

  const waNumber = identitas.wa_number || "6285852278026";
  const waTemplate = encodeURIComponent(identitas.wa_template || "Halo, saya ingin memesan produk TAWSEC Banyusangka.");
  const waUrl = `https://wa.me/${waNumber}?text=${waTemplate}`;

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-900 via-primary-900 to-emerald-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              ACSES &amp; UNAIR Sustainability Program
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">Tim &amp; Kontak TAWSEC</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Kenali {anggota.length} mahasiswa Universitas Airlangga, dosen pembimbing, mitra kelembagaan, serta cara menghubungi kami langsung.
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
                    src={foto_tim.foto1_url || "/images/anggota/tim-group-1.jpg"}
                    alt={foto_tim.foto1_caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-4 h-4 text-white/70" />
                      <span className="text-white/70 text-xs">{foto_tim.foto1_tag || "TAWSEC Company"}</span>
                    </div>
                    <p className="text-white font-serif font-bold text-lg leading-tight">
                      {foto_tim.foto1_caption}
                    </p>
                  </div>
                </div>
              </div>

              {/* Foto 2 - Pasar Ikan Banyusangka */}
              <div className="relative group overflow-hidden rounded-3xl shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={foto_tim.foto2_url || "/images/anggota/tim-group-2.jpg"}
                    alt={foto_tim.foto2_caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-white/70" />
                      <span className="text-white/70 text-xs">{foto_tim.foto2_tag || "Pasar Ikan Desa Banyusangka, Bangkalan"}</span>
                    </div>
                    <p className="text-white font-serif font-bold text-lg leading-tight">
                      {foto_tim.foto2_caption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* === GRID ANGGOTA === */}
        <section>
          <FadeIn>
            <div className="mb-8">
              <span className="text-sunset-500 font-semibold text-sm uppercase tracking-widest">Pelaksana</span>
              <h2 className="font-serif font-bold text-navy-900 text-3xl mt-1">{anggota.length} Anggota Tim</h2>
              <p className="text-navy-500 mt-2">Mahasiswa lintas fakultas Universitas Airlangga yang menjalankan program di lapangan.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {anggota.map((a, i) => (
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

        {/* === SECTION BARU: KONTAK & PEMESANAN (id="kontak") === */}
        <section id="kontak" className="pt-8 border-t border-gray-200 scroll-mt-24">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> Hubungi Kami
              </span>
              <h2 className="font-serif font-bold text-navy-950 text-3xl sm:text-4xl">
                Kontak, Pemesanan &amp; Lokasi
              </h2>
              <p className="text-navy-600 text-sm mt-2">
                Tertarik membeli produk olahan laut UMKM atau ingin berkolaborasi? Hubungi tim TAWSEC langsung via WhatsApp atau kunjungi lokasi produksi kami.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Opsi Kontak */}
            <div className="space-y-5">
              {/* WhatsApp */}
              <FadeIn delay={0.1}>
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-navy-800 text-lg mb-1">WhatsApp (Utama)</h3>
                      <p className="text-navy-600 text-sm mb-4">
                        Cara tercepat untuk memesan produk, meminta penawaran B2B, dan bertanya stok.
                      </p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="kontak-wa-button"
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow hover:shadow-lg text-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat WhatsApp Sekarang
                      </a>
                      <p className="text-navy-400 text-xs mt-3 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Respons cepat jam kerja (08.00–17.00 WIB)
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Instagram */}
              <FadeIn delay={0.2}>
                <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-800 text-lg mb-1">Instagram Resmi</h3>
                      <p className="text-navy-600 text-sm mb-3">Update dokumentasi kegiatan &amp; info produk terbaru di media sosial.</p>
                      <a
                        href={social_media.instagram || "https://instagram.com/tawsec.banyusangka"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-navy-700 font-semibold px-4 py-2 rounded-xl text-xs border border-pink-200 shadow-sm hover:bg-pink-100 transition-colors"
                      >
                        📸 @tawsec.banyusangka
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Marketplace */}
              <FadeIn delay={0.3}>
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-800 text-lg mb-1">Marketplace Online</h3>
                      <p className="text-navy-600 text-sm mb-3">Toko resmi di platform e-commerce.</p>
                      <div className="flex flex-wrap gap-2">
                        {social_media.shopee ? (
                          <a href={social_media.shopee} target="_blank" rel="noreferrer" className="bg-white text-navy-700 text-xs font-medium px-3 py-1.5 rounded-full border border-orange-200 shadow-sm hover:bg-orange-100">
                            🛒 Shopee Store
                          </a>
                        ) : (
                          <span className="bg-white text-navy-700 text-xs font-medium px-3 py-1.5 rounded-full border border-orange-200 shadow-sm">
                            🛒 Shopee (Onboarding)
                          </span>
                        )}
                        {social_media.tiktok ? (
                          <a href={social_media.tiktok} target="_blank" rel="noreferrer" className="bg-white text-navy-700 text-xs font-medium px-3 py-1.5 rounded-full border border-orange-200 shadow-sm hover:bg-orange-100">
                            🎵 TikTok Shop
                          </a>
                        ) : (
                          <span className="bg-white text-navy-700 text-xs font-medium px-3 py-1.5 rounded-full border border-orange-200 shadow-sm">
                            🎵 TikTok Shop (Onboarding)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Lokasi PPI */}
              <FadeIn delay={0.4}>
                <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-800 text-lg mb-1">Lokasi Produksi</h3>
                      <p className="text-navy-700 font-medium text-sm">Desa Banyusangka, Kec. Tanjung Bumi</p>
                      <p className="text-navy-500 text-sm">Kab. Bangkalan, Pulau Madura, Jawa Timur</p>
                      <p className="text-primary-600 text-xs mt-2 font-semibold">
                        📍 Dekat PPI Banyusangka (Pangkalan Pendaratan Ikan Tipe D)
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Google Maps Embed */}
            <FadeIn direction="right">
              <div>
                <h3 className="font-serif font-bold text-navy-900 text-xl mb-4">Peta Lokasi Desa Banyusangka</h3>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.5!2d113.02702!3d-6.88498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7d0c6a8a4e7d1%3A0x1234567890abcdef!2sBanyusangka%2C%20Tanjung%20Bumi%2C%20Bangkalan%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1720000000000!5m2!1sen!2sid"
                    width="100%"
                    height="360"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Lokasi Desa Banyusangka"
                  />
                </div>
                <p className="text-navy-500 text-xs text-center mb-6">
                  📍 6°53&apos;5.70&quot; LS, 113°1&apos;44.50&quot; BT — Desa Banyusangka, Bangkalan, Madura
                </p>

                {/* Info Box Program */}
                <div className="bg-navy-950 rounded-2xl p-6 text-white shadow-md">
                  <h4 className="font-semibold text-sm mb-3 text-sky-400">Tentang Program TAWSEC</h4>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <span className="flex-shrink-0">🏛️</span>
                      <span>{identitas.penyelenggara || "UKM-F Penalaran AcSES FEB Universitas Airlangga"}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="flex-shrink-0">📍</span>
                      <span>Desa Banyusangka, Kec. Tanjung Bumi, Kab. Bangkalan</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="flex-shrink-0">📅</span>
                      <span>Program Aktif Pengabdian Masyarakat Tahun {identitas.tahun || "2026"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </div>
  );
}
