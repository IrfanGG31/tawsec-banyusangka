import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import ProductCard from "@/components/katalog/ProductCard";
import produkData from "@/data/produk.json";
import {
  ArrowRight,
  Fish,
  TrendingUp,
  Users,
  MapPin,
  ShoppingBag,
  AlertTriangle,
  Zap,
  ChevronDown,
} from "lucide-react";

const stats = [
  { label: "Jiwa Penduduk", value: "2.628", icon: "👥", suffix: "" },
  { label: "Nelayan Aktif", value: "621", icon: "🎣", suffix: "+" },
  { label: "Kg Ikan/Hari", value: "300", icon: "🐟", suffix: "+" },
  { label: "Pilar Program", value: "4", icon: "🏛️", suffix: "" },
];

const whyItems = [
  {
    icon: <AlertTriangle className="w-7 h-7 text-red-400" />,
    label: "Masalah",
    color: "from-red-50 to-orange-50 border-red-200",
    title: "85% Dijual Mentah",
    desc: "Ikan layang & tongkol hasil tangkapan dijual langsung tanpa diolah, sehingga nilai ekonominya sangat rendah.",
  },
  {
    icon: <AlertTriangle className="w-7 h-7 text-orange-400" />,
    label: "Masalah",
    color: "from-orange-50 to-yellow-50 border-orange-200",
    title: "Food Loss 20–35%",
    desc: "Saat panen raya, ikan melimpah tapi tidak bisa diserap pasar — banyak terbuang sia-sia saat bisa jadi produk bernilai.",
  },
  {
    icon: <Zap className="w-7 h-7 text-emerald-500" />,
    label: "Solusi TAWSEC",
    color: "from-emerald-50 to-teal-50 border-emerald-200",
    title: "Nilai Naik 10–50x",
    desc: "Ikan Rp 1.000–3.000/kg → Abon kemasan 250g Rp 55.000. Olahan mengubah sisa tangkapan jadi produk bernilai tinggi.",
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-primary-500" />,
    label: "Solusi TAWSEC",
    color: "from-primary-50 to-blue-50 border-primary-200",
    title: "4 Pilar Pemberdayaan",
    desc: "Kewirausahaan, Produksi Higienis, Digitalisasi & Branding, dan Legalitas Usaha — mendampingi perempuan pelaku ngojur.",
  },
];

const testimonials = [
  {
    nama: "Ibu [Peserta 1]",
    peran: "Pelaku Ngojur, Dusun Timur",
    isi: "Dulu saya cuma jual ikan segar, sekarang sudah bisa bikin abon dan jual online. Penghasilan lebih stabil.",
    foto: "👩",
  },
  {
    nama: "Ibu [Peserta 2]",
    peran: "Ketua KUB Perempuan Banyusangka",
    isi: "Program TAWSEC benar-benar membuka mata kami tentang potensi hasil laut yang selama ini kami sia-siakan.",
    foto: "👩‍🦳",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-desa.png"
            alt="Desa Banyusangka"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
          <FadeIn delay={0.1}>
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 bg-white/95 backdrop-blur-md p-3 rounded-3xl shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logos/logo-tawsec.png"
                  alt="Logo TAWSEC"
                  fill
                  className="object-contain p-2.5"
                />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              ACSES &amp; UNAIR Sustainability Program · Desa Banyusangka 2026
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Dari Laut,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-emerald-300">
                Untuk Bangsa
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
              TAWSEC mendampingi perempuan pelaku <em>ngojur</em> Desa Banyusangka mengolah
              hasil laut menjadi produk UMKM bernilai jual{" "}
              <strong className="text-emerald-300">10–50 kali lipat</strong> lebih tinggi.
            </p>
            <p className="text-white/60 text-base mb-10">
              📍 Desa Banyusangka, Tanjung Bumi, Bangkalan, Madura
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/katalog"
                id="hero-cta-katalog"
                className="flex items-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-200 hover:shadow-2xl hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                Lihat Katalog Produk
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/program-tawsec"
                id="hero-cta-program"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all duration-200 backdrop-blur-sm"
              >
                Tentang Program
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-white py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">{s.icon}</div>
                  <div className="font-serif font-bold text-3xl text-primary-700">
                    {s.value}
                    <span className="text-sunset-500">{s.suffix}</span>
                  </div>
                  <div className="text-navy-500 text-sm mt-1">{s.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== KOMITMEN SDGs & UNAIR ===== */}
      <section className="bg-gradient-to-br from-primary-900 to-navy-950 text-white py-16 overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-primary-200 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full">
                  🌍 Tri Dharma &amp; Global Goals
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3 leading-tight">
                  Bagian dari Komitmen SDGs Universitas Airlangga
                </h2>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mt-4">
                  Program TAWSEC merupakan wujud nyata kontribusi UNAIR — peringkat <strong>#15 dunia</strong> &amp; <strong>nomor 1 Indonesia</strong> dalam <em>THE Sustainability Impact Rankings 2026</em> — untuk pemberdayaan ekonomi pesisir berkelanjutan di Desa Banyusangka.
                </p>
              </FadeIn>

              {/* Grid 4 SDG Cards */}
              <StaggerContainer className="grid grid-cols-2 gap-4">
                {[
                  {
                    num: 1,
                    judul: "Tanpa Kemiskinan",
                    color: "bg-[#E5243B]",
                    textColor: "text-[#E5243B]",
                    desc: "Peningkatan pendapatan perempuan nelayan lewat produk olahan laut bernilai tinggi.",
                  },
                  {
                    num: 5,
                    judul: "Kesetaraan Gender",
                    color: "bg-[#FF3A21]",
                    textColor: "text-[#FF3A21]",
                    desc: "Pemberdayaan ekonomi perempuan pelaku ngojur menjadi wirausaha mandiri.",
                  },
                  {
                    num: 8,
                    judul: "Pekerjaan Layak",
                    color: "bg-[#A21942]",
                    textColor: "text-[#A21942]",
                    desc: "Formalisasi kerja informal menjadi usaha berlegalitas (NIB & Halal).",
                  },
                  {
                    num: 14,
                    judul: "Ekosistem Laut",
                    color: "bg-[#0A97D9]",
                    textColor: "text-[#0A97D9]",
                    desc: "Mengurangi food loss hasil tangkapan ikan layang & tongkol sebesar 20-35%.",
                  },
                ].map((sdg) => (
                  <StaggerItem key={sdg.num}>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors group">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 ${sdg.color} text-white font-bold rounded-lg flex items-center justify-center text-sm shadow-md`}>
                          {sdg.num}
                        </div>
                        <span className="font-bold text-xs sm:text-sm tracking-tight text-white/90">
                          {sdg.judul}
                        </span>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed group-hover:text-white/80 transition-colors">
                        {sdg.desc}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <FadeIn>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/program-tawsec"
                    id="sdgs-pelajari-lebih-lanjut"
                    className="inline-flex items-center gap-2 bg-white text-navy-900 font-bold px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all text-sm"
                  >
                    Pelajari Selengkapnya
                    <ArrowRight className="w-4 h-4 text-primary-600" />
                  </Link>
                  <span className="text-[10px] text-white/40 italic">
                    * Sumber: THE Sustainability Impact Rankings 2026
                  </span>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Visual Supporting Image */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <FadeIn direction="right" className="relative w-full max-w-[340px] aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-full h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-6 shadow-2xl hover:border-white/20 transition-all">
                  <div className="relative w-full aspect-[1.914] max-w-[260px]">
                    <Image
                      src="/images/logos/logo-sdgs-color-wheel-unair-branding.png"
                      alt="SDGs UNAIR Colour Wheel"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-primary-200 tracking-widest uppercase">
                      Sustainable Development Goals
                    </p>
                    <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
                      Universitas Airlangga berkomitmen penuh mendukung pencapaian SDGs global melalui pengabdian masyarakat pesisir.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUK UNGGULAN ===== */}
      <section className="bg-gradient-to-b from-white to-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Produk Unggulan
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
                Olahan Laut Khas Banyusangka
              </h2>
              <p className="text-navy-500 max-w-xl mx-auto">
                Dibuat dari ikan segar hasil tangkapan nelayan lokal, diolah secara higienis
                oleh ibu-ibu UMKM dampingan program TAWSEC.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {produkData.map((produk) => (
              <StaggerItem key={produk.id}>
                <ProductCard produk={produk} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn>
            <div className="text-center">
              <Link
                href="/katalog"
                id="home-lihat-semua-produk"
                className="inline-flex items-center gap-2 border-2 border-primary-500 text-primary-700 hover:bg-primary-500 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200"
              >
                Lihat Semua Produk
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== KENAPA TAWSEC ===== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-sunset-500 font-semibold text-sm uppercase tracking-widest mb-3">
                Kenapa TAWSEC?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
                Mengubah Masalah Jadi Peluang
              </h2>
              <p className="text-navy-500 max-w-xl mx-auto">
                Potensi laut yang besar belum dimanfaatkan optimal. TAWSEC hadir untuk menutup gap itu.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyItems.map((item, i) => (
              <StaggerItem key={i}>
                <div
                  className={`rounded-2xl border p-6 bg-gradient-to-br ${item.color} hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          item.label === "Masalah" ? "text-red-500" : "text-emerald-600"
                        }`}
                      >
                        {item.label}
                      </span>
                      <h3 className="font-serif font-bold text-navy-900 text-xl mt-0.5 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-navy-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <div className="mt-10 text-center">
              <Link
                href="/program-tawsec"
                id="home-lihat-program"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-800 transition-colors"
              >
                Pelajari 4 Pilar Program TAWSEC
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      <section className="bg-gradient-to-br from-primary-900 to-navy-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-300 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">
                Suara Peserta
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                Dampak Nyata TAWSEC
              </h2>
              <p className="text-white/60 text-sm italic">
                * Testimoni akan diperbarui seiring berjalannya program
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="glass rounded-2xl p-6">
                  <div className="text-4xl mb-4">{t.foto}</div>
                  <p className="text-white/90 italic text-base leading-relaxed mb-4">
                    &ldquo;{t.isi}&rdquo;
                  </p>
                  <div>
                    <p className="text-white font-semibold">{t.nama}</p>
                    <p className="text-primary-300 text-sm">{t.peran}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="bg-gradient-sunset py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Dukung UMKM Pesisir Banyusangka
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Setiap pembelian produk TAWSEC berarti ikut serta membangun kemandirian ekonomi
              perempuan nelayan Madura. 🌊
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/katalog"
                id="home-cta-beli-sekarang"
                className="flex items-center gap-2 bg-white text-sunset-600 font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                <ShoppingBag className="w-5 h-5" />
                Beli Produk Sekarang
              </Link>
              <a
                href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20memesan%20produk%20TAWSEC%20Banyusangka."
                target="_blank"
                rel="noopener noreferrer"
                id="home-cta-wa"
                className="flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors"
              >
                📱 Tanya via WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
