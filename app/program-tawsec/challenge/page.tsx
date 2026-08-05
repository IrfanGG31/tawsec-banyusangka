import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Palette, 
  Video, 
  Tag, 
  MessageSquare, 
  Sparkles, 
  Camera, 
  FileText, 
  Share2, 
  Trophy, 
  Banknote, 
  Flame, 
  Users, 
  Star,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  ExternalLink,
  Clock,
  Target,
  Zap,
  Award,
  BookOpen,
  CheckCircle2,
  Play,
  Megaphone,
  PenTool,
  Eye,
  MapPin,
  ImageIcon,
  Bot,
  Copy,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';
import { getSiteSettings } from '@/lib/supabase/settings';

export const metadata: Metadata = {
  title: "Challenge Digitalisasi & Branding — Pilar 3 TAWSEC",
  description: "Media panduan instruksi praktik langsung Challenge Digitalisasi & Branding Pilar 3 TAWSEC — Brand Make Over dan Video Promosi produk olahan laut Desa Banyusangka menggunakan Google Gemini AI.",
};

const brandSteps = [
  {
    num: "01",
    icon: Tag,
    title: "Tentukan Nama Merek (Brand Name)",
    subtitle: "Inovasi Identitas Produk Olahan Laut",
    desc: "Buat konsep ide nama brand khas olahan laut milik kelompokmu, lalu gunakan Google Gemini AI untuk memberikan ide variasi nama yang unik dan berkesan modern.",
    tips: [
      "Coba kombinasi kata: daerah/bahasa Madura + nama produk (misal: \"BanyuBon\", \"SangkaRasa\")",
      "Pastikan nama mudah diucapkan, dieja, dan tidak berkonotasi negatif",
      "Cek di Google apakah nama tersebut sudah digunakan oleh brand lain",
    ],
    example: "\"Sari Laut Nusantara\" • \"Crispy Pesisir\" • \"TulangMas\"",
    refLabel: "Panduan Memilih Nama Merek (Canva)",
    refUrl: "https://www.canva.com/id_id/belajar/cara-membuat-nama-brand/",
    promptRumus: "[Jenis Produk Olahan] + [Bahan Dasar/Keunggulan] + [Nuansa Kesan: Lokal / Modern / Gurih / Mewah]",
    promptExample: "Berikan 5 ide nama brand yang unik dan berkesan modern untuk produk [Abon Ikan Tongkol / Kerupuk Kulit Ikan] khas Desa Banyusangka. Nama harus singkat, mudah diingat, bernuansa [lokal & profesional], dan belum pernah dipakai.",
  },
  {
    num: "02",
    icon: MessageSquare,
    title: "Buat Slogan / Tagline yang Menarik",
    subtitle: "Pesan Utama yang Menggugah Pembeli",
    desc: "Susun pesan utama produkmu, lalu gunakan Google Gemini AI untuk memformulasikan slogan pendek yang berkesan dan persuasif.",
    tips: [
      "Maksimal 5-8 kata, gampang diingat dalam sekali dengar",
      "Tonjolkan manfaat utama: \"Dari Laut Banyusangka, Untuk Keluarga Indonesia\"",
      "Gunakan teknik rima atau pengulangan bunyi yang menyenangkan",
    ],
    example: "\"Renyah Alami dari Pesisir\" • \"Gurih Tanpa Pengawet\" • \"Olahan Laut, Rasa Rumahan\"",
    refLabel: "Tips Menulis Tagline Persuasif",
    refUrl: "https://www.canva.com/id_id/belajar/tagline-adalah/",
    promptRumus: "[Nama Brand] + [Produk] + [Keunggulan Utama: Tanpa Pengawet / Kalsium Tinggi / Gurih Alami] + [Kesan untuk Pembeli]",
    promptExample: "Buatkan 5 pilihan slogan/tagline pendek dan catchy (maksimal 6 kata) untuk brand '[Nama Brand]' yang menjual [Kerupuk Kulit Ikan Crispy]. Keunggulan utama produk kami: [renyah alami, tanpa pengawet, hasil nelayan Banyusangka].",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Desain Logo Menggunakan Google Gemini AI",
    subtitle: "Visualisasi Draf Logo & Ikonik Merek",
    desc: "Tentukan konsep visual (elemen laut, warna, dan gaya), lalu minta Google Gemini AI (gemini.google.com) membuatkan draf gambar logo visual.",
    tips: [
      "Buka gemini.google.com, gunakan prompt deskriptif warna dan ikon secara mendetail",
      "Sebutkan gaya desain: minimalis, vektor modern, atau ilustrasi mascot",
      "Hasil gambar bisa di-download dan dirapikan kembali menggunakan aplikasi Canva",
    ],
    example: "Prompt Gemini: \"Logo modern untuk abon ikan 'SariLaut', warna navy dan oranye, bentuk bulat dengan ikon ikan\"",
    refLabel: "Buka Google Gemini AI (gemini.google.com)",
    refUrl: "https://gemini.google.com/",
    promptRumus: "Logo [Gaya Desain] + [Ikon Utama: Ikan / Laut / Mangkok] + [Nama Brand] + [Kombinasi Warna] + [Background Putih Clean]",
    promptExample: "Buatkan gambar logo minimalis dan modern untuk brand olahan laut bernama '[Nama Brand]'. Gunakan ikon [ikan tongkol / gelombang laut / kemasan], warna utama [biru navy dan oranye emas], latar belakang putih bersih, gaya vektor profesional tanpa teks yang terlalu rumit.",
  },
  {
    num: "04",
    icon: Camera,
    title: "Foto Produk & Styling Visual HP",
    subtitle: "Pengambilan Gambar Menggiurkan & Propesional",
    desc: "Gunakan HP untuk memfoto kemasan produk. Gunakan Google Gemini AI untuk mendapatkan ide penataan alas (styling), properti, dan sudut foto terbaik.",
    tips: [
      "Gunakan cahaya alami matahari (dekat jendela, jam 8-10 pagi)",
      "Latar belakang putih polos, alas kayu, atau kain berserat bersih",
      "Ambil minimal 3 angle: 90° Flat Lay (atas), 45° Eye Level (depan), & Close-up tekstur produk",
    ],
    example: "3 Angle Wajib: Tampak Atas (Flat lay), Tampak Depan, & Detail Tekstur Produk",
    refLabel: "Tutorial Foto Produk Makanan di HP (YouTube)",
    refUrl: "https://www.youtube.com/results?search_query=tutorial+foto+produk+makanan+hp",
    promptRumus: "[Jenis Produk] + [Kemasan: Pouch/Toples] + [Properti Latar] + [Lighting Alami] + [Rekomendasi 3 Angle Kamera HP]",
    promptExample: "Berikan ide konsep food styling dan susunan foto produk jualan untuk [Abon Ikan / Kerupuk Ikan] dalam [pouch transparan]. Jelaskan latar belakang yang cocok, properti pendukung (seperti daun salam, piring kayu, potongan cabai), serta 3 sudut pengambilan foto HP yang paling terlihat lezat.",
  },
  {
    num: "05",
    icon: FileText,
    title: "Susun Caption Medsos Penjualan",
    subtitle: "Naskah Promosi Penjualan Membakar Minat Beli",
    desc: "Gabungkan keunggulan produk dan kontak pemesanan, lalu minta Google Gemini AI merangkai caption promosi yang membakar minat beli.",
    tips: [
      "Baris 1 (Hook): Kalimat pembuka yang memancing rasa ingin tahu atau selera",
      "Baris 2-3 (Value): Keunggulan nutrisi & kelezatan khas Banyusangka",
      "Baris Akhir (CTA): Ajakan pemesanan langsung via WhatsApp / Marketplace",
    ],
    example: "\"Gurih, renyah, bikin nagih! Kerupuk kulit ikan asli Banyusangka — tanpa MSG. Pesan WA 08xx\"",
    refLabel: "Contoh Caption Penjualan Makanan (Canva)",
    refUrl: "https://www.canva.com/id_id/belajar/caption-jualan-makanan/",
    promptRumus: "[Hook Penasaran] + [Keunggulan Produk] + [Harga/Promo] + [Call to Action WA + 5 Hashtag Relevan]",
    promptExample: "Buatkan caption Instagram dan TikTok yang menjual untuk produk [Kerupuk Kulit Ikan / Abon Ikan]. Mulai dengan kalimat pembuka (hook) yang memancing rasa lapar, sebutkan keunggulan [tanpa pengawet & kaya kalsium], lalu beri ajakan beli via WhatsApp [Nomor WA]. Tambahkan 5 hashtag jualan populer.",
  },
  {
    num: "06",
    icon: Share2,
    title: "Posting & Presentasi Hasil Karya",
    subtitle: "Uji Publikasi & Umpan Balik Tim",
    desc: "Unggah karya kelompok ke media sosial (IG/TikTok) dan presentasikan konsep branding yang telah dibuat kepada peserta pelatihan & panitia.",
    tips: [
      "Unggah postingan dengan hashtag resmi #TAWSECBanyusangka #DigitalisasiPesisir",
      "Siapkan presentasi singkat (2-3 menit) tentang perjalanan konsep brand kelompokmu",
      "Tunjukkan: Nama Brand, Slogan, Gambar Logo AI, Foto Produk HP, dan Caption Jualan",
    ],
    example: "Alur Presentasi: Nama Brand → Slogan → Logo AI → Foto Produk → Caption WA",
    refLabel: "Tips Presentasi Singkat Produk UMKM",
    refUrl: "https://www.youtube.com/results?search_query=tips+presentasi+singkat+produk+umkm",
    promptRumus: "[Nama Brand] + [Konsep Branding] + [Target Pembeli] + [Minta Feedback Perbaikan dari Gemini AI]",
    promptExample: "Saya telah membuat konsep brand '[Nama Brand]' untuk [Abon Ikan Tongkol] dengan slogan '[Slogan]'. Target pembeli kami adalah [ibu rumah tangga & anak muda]. Berikan masukan perbaikan singkat untuk strategi pemasaran online kami.",
  },
];

const videoAnalysis = [
  { num: "01", question: "Siapa Target Pembeli Produk Ini?", hint: "Ibu rumah tangga? Anak muda? Wisatawan toko oleh-oleh?" },
  { num: "02", question: "Apa Keunggulan Utama Dibanding Produk Lain?", hint: "100% bahan alami, tanpa pengawet buatan, gurih khas Madura?" },
  { num: "03", question: "Apa Pesan Utama yang Ingin Disampaikan?", hint: "Kualitas higienis, nutrisi tinggi kalsium, harga terjangkau?" },
  { num: "04", question: "Platform Media Sosial Mana yang Dituju?", hint: "Instagram Reels, TikTok, WhatsApp Status, YouTube Shorts?" },
];

const videoSteps = [
  { num: "01", icon: BookOpen, title: "Isi Lembar Analisis Produk", desc: "Jawab 4 pertanyaan analisis dasar untuk menentukan arah pesan & karakter video" },
  { num: "02", icon: PenTool, title: "Susun Script & Storyboard", desc: "Tulis alur naskah singkat (3 dtk Opening → 7 dtk Solusi/Keunggulan → 5 dtk Call to Action Beli)" },
  { num: "03", icon: Play, title: "Rekam Video Vertikal (9:16)", desc: "Ambil gambar dengan HP (15-30 detik), pastikan pencahayaan terang & suara jelas" },
  { num: "04", icon: Megaphone, title: "Edit & Posting Medsos", desc: "Edit di CapCut/Canva, tambahkan teks pendukung, dan unggah ke media sosial" },
];

const winners = [
  { icon: Eye, title: "Visual Konten Terbaik", desc: "Desain branding & estetika foto produk paling menawan", color: "sky" },
  { icon: Banknote, title: "Ajakan Beli Paling Persuasif", desc: "Formulasi CTA & caption paling membakar minat pembeli", color: "amber" },
  { icon: Flame, title: "Potensi Viral Terbaik", desc: "Konten video yang paling menarik & berpotensi fyp", color: "rose" },
  { icon: Users, title: "Kolaborasi Tim Terbaik", desc: "Kekompakan tim paling solid dari awal hingga presentasi", color: "emerald" },
  { icon: Star, title: "Konten Promosi Terbaik", desc: "Kombinasi nilai tertinggi dari seluruh aspek challenge", color: "violet" },
];

const colorMap: Record<string, { bg: string; iconBg: string; text: string; border: string }> = {
  sky: { bg: "bg-sky-50", iconBg: "bg-sky-100", text: "text-sky-600", border: "border-sky-200" },
  amber: { bg: "bg-amber-50", iconBg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200" },
  rose: { bg: "bg-rose-50", iconBg: "bg-rose-100", text: "text-rose-600", border: "border-rose-200" },
  emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
  violet: { bg: "bg-violet-50", iconBg: "bg-violet-100", text: "text-violet-600", border: "border-violet-200" },
};

export default async function ChallengePage() {
  const settings = await getSiteSettings();
  const challenge = settings.challenge || {
    judul_challenge: "Challenge Digitalisasi & Branding",
    sub_judul: "Media Panduan Praktik Lapangan (Offline)",
    deskripsi_challenge: "Tunjukkan kreativitas timmu dalam membangun brand dan membuat konten promosi produk olahan laut Desa Banyusangka secara langsung di lapangan!",
    info_praktik: "Praktik langsung (offline) dilaksanakan di Balai Desa Banyusangka didampingi oleh Fasilitator TAWSEC. Setiap tim mengolah 1 produk studi kasus.",
    kontak_fasilitator: "6285852278026",
    ref_brand_image: "/images/challenge/brand-makeover-ref.jpg",
    ref_video_image: "/images/challenge/video-promosi-ref.jpg",
  };

  const waFasilitatorLink = `https://wa.me/${challenge.kontak_fasilitator || "6285852278026"}?text=Halo%20Fasilitator%20TAWSEC,%20saya%20ingin%20bertanya%20mengenai%20instruksi%20Challenge%20Digitalisasi%20%26%20Branding.`;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* ================ HERO BANNER (ATTRACTIVE & PROMINENT TYPOGRAPHY) ================ */}
      <section className="relative pt-24 pb-24 sm:pt-32 sm:pb-32 overflow-hidden text-white">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/galeri/pelatihan-1.png"
            alt="Pelatihan Pemberdayaan TAWSEC Banyusangka"
            fill
            className="object-cover object-center brightness-[0.25] scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-indigo-950/90 to-navy-950/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
        </div>

        {/* Dynamic Glow Accents */}
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn>
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center text-sm font-medium text-slate-400 mb-8 gap-2">
              <Link href="/program-tawsec" className="hover:text-white transition-colors">Program TAWSEC</Link>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <span>Pilar 3</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <span className="text-amber-400 font-semibold">Challenge Branding &amp; AI</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column (Main Title & Sub-heading) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 backdrop-blur-md px-4 py-1.5 rounded-full">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest">{challenge.sub_judul}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-white leading-[1.08] tracking-tight">
                  {challenge.judul_challenge}
                </h1>

                <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-xl font-normal">
                  {challenge.deskripsi_challenge}
                </p>

                {/* Badges & Direct AI Hub Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <div className="inline-flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md px-5 py-3.5 rounded-2xl text-emerald-200 text-xs sm:text-sm font-semibold">
                    <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>
                      <strong>Praktik Lapangan Direct:</strong> Pendampingan oleh Fasilitator TAWSEC.
                    </span>
                  </div>

                  <a
                    href="https://gemini.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all active:scale-95 border border-blue-300/30 shrink-0"
                  >
                    <Sparkles className="w-4.5 h-4.5 text-sky-200" />
                    Buka Google Gemini AI ↗
                  </a>
                </div>
              </div>

              {/* Right Column (Info Card & Quick Specs) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white/[0.07] backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/15">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-white text-xl">Modul Praktik Kelompok</h3>
                      <p className="text-slate-300 text-xs">Acuan kerja peserta pelatihan</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-slate-200 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                      <span className="flex items-center gap-2 font-medium">
                        <Users className="w-4.5 h-4.5 text-sky-400" /> Format Kelompok
                      </span>
                      <span className="font-bold text-white bg-sky-500/20 text-sky-300 px-3 py-1 rounded-xl">5 Tim Peserta</span>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm text-slate-200 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                      <span className="flex items-center gap-2 font-medium">
                        <UserIcon className="w-4.5 h-4.5 text-emerald-400" /> Komposisi Tim
                      </span>
                      <span className="font-bold text-white bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-xl">3 Peserta + 1 Fasilitator</span>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm text-slate-200 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                      <span className="flex items-center gap-2 font-medium">
                        <Sparkles className="w-4.5 h-4.5 text-blue-400" /> Engine AI Utama
                      </span>
                      <span className="font-bold text-blue-300 bg-blue-500/20 px-3 py-1 rounded-xl">Google Gemini AI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================ NOTICE BANNER: PRAKTIK OFFLINE FIELDWORK ================ */}
      <section className="-mt-10 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="bg-gradient-to-r from-navy-900 via-indigo-900 to-sky-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-sky-600/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/50 flex items-center justify-center shrink-0 text-sky-300 mt-1 shadow-inner">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 bg-sky-400/20 text-sky-300 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 border border-sky-400/30">
                  Praktik Langsung di Lapangan (Offline)
                </div>
                <h3 className="font-serif font-black text-white text-xl sm:text-2xl">
                  Challenge Diuji &amp; Dipraktikkan Langsung di Lapangan
                </h3>
                <p className="text-slate-300 text-xs sm:text-base mt-1.5 leading-relaxed max-w-2xl font-normal">
                  {challenge.info_praktik}
                </p>
              </div>
            </div>

            <a
              href={waFasilitatorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-extrabold px-7 py-4 rounded-2xl text-xs sm:text-sm shadow-xl transition-all shrink-0 whitespace-nowrap active:scale-95"
            >
              <MessageSquare className="w-5 h-5" />
              Tanya Fasilitator TAWSEC
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ================ SECTION: 2 CHALLENGE, 1 TUJUAN ================ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Main Section Header */}
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-sky-700 font-extrabold text-xs uppercase tracking-widest bg-sky-100 px-4 py-1.5 rounded-full border border-sky-200">
                Panduan Praktik Kelompok &amp; AI Scripting
              </span>
              <h2 className="font-serif font-black text-navy-950 text-3xl sm:text-5xl mt-3 tracking-tight">
                2 Challenge Utama, 1 Tujuan Pemberdayaan
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto mt-3 leading-relaxed">
                Bantu UMKM lokal meningkatkan daya saing produk olahan laut melalui branding yang kuat, desain visual modern, dan naskah promosi digital yang efektif.
              </p>
            </div>
          </FadeIn>

          {/* ================ GOOGLE GEMINI AI HUB BANNER ================ */}
          <FadeIn delay={0.08}>
            <div className="mb-16 bg-gradient-to-r from-blue-950 via-indigo-900 to-navy-950 text-white rounded-3xl p-7 sm:p-10 border border-blue-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shrink-0 shadow-xl text-white mt-1">
                  <Sparkles className="w-8 h-8 text-sky-200" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-500/25 text-blue-300 border border-blue-400/40 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
                    Mesin Utama AI: Google Gemini AI (gemini.google.com)
                  </div>
                  <h3 className="font-serif font-black text-white text-2xl sm:text-3xl">
                    Panduan &amp; Formulasi Prompt Google Gemini AI
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-base mt-2 leading-relaxed max-w-2xl">
                    Seluruh formulasi prompt di bawah ini dirancang khusus dan paling optimal digunakan pada <strong>Google Gemini AI</strong> (gratis &amp; tanpa perlu install aplikasi). Salin template prompt dan langsung praktikkan di Google Gemini!
                  </p>
                </div>
              </div>

              <a
                href="https://gemini.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-700 text-white font-extrabold px-7 py-4 rounded-2xl text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all shrink-0 active:scale-95 group relative z-10"
              >
                <Bot className="w-5 h-5 text-sky-100" />
                Buka Google Gemini AI
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </FadeIn>

          {/* ================ CHALLENGE 1: BRAND MAKE OVER ================ */}
          <div className="mb-24">
            
            {/* Header Challenge 1 */}
            <FadeIn>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-5 border-b-2 border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-lg">
                    <Palette className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="inline-block bg-sky-100 text-sky-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-sky-300">
                      CHALLENGE 1
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-serif font-black text-navy-950">Brand Make Over</h3>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-700 bg-white border border-slate-300 px-4 py-2 rounded-2xl shadow-sm">
                  🎯 Studi Kasus: Abon Ikan / Amplang / Tepung Tulang
                </span>
              </div>
            </FadeIn>

            {/* Visual Reference Photo Showcase Card */}
            <FadeIn delay={0.1}>
              <div className="mb-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <ImageIcon className="w-6 h-6 text-sky-600" />
                  <h4 className="font-serif font-black text-navy-950 text-lg sm:text-xl">Visualisasi Referensi Packaging &amp; Brand Make Over</h4>
                </div>
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-inner">
                  <Image
                    src={challenge.ref_brand_image || "/images/challenge/brand-makeover-ref.jpg"}
                    alt="Visualisasi Referensi Brand Make Over"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white text-xs sm:text-base font-semibold drop-shadow-md">
                    📸 <strong>Visual Reference Guide:</strong> Contoh mockup stiker logo modern, kemasan pouch higienis, dan foto produk flatlay pencahayaan alami.
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ================ STEPPER INSTRUCTIONS (PROMINENT TYPOGRAPHY & CARD HIERARCHY) ================ */}
            <div className="space-y-8">
              {brandSteps.map((step, idx) => {
                const IconComp = step.icon;
                return (
                  <FadeIn key={step.num} delay={idx * 0.05}>
                    <div className="bg-white border-2 border-slate-200 hover:border-sky-300 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                      
                      {/* Top Bar: Number Badge + Step Title */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-700 text-white flex items-center justify-center font-black text-xl shadow-lg shrink-0">
                            {step.num}
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-sky-600 uppercase tracking-widest mb-0.5">
                              {step.subtitle}
                            </div>
                            <h4 className="font-serif font-black text-navy-950 text-xl sm:text-2xl leading-snug">
                              {step.title}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl">
                          <IconComp className="w-4 h-4 text-sky-600" />
                          <span>Tahap {step.num} / 06</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                        {step.desc}
                      </p>

                      {/* Formulasi Prompt Google Gemini AI Box */}
                      {step.promptRumus && (
                        <div className="bg-slate-950 text-white rounded-2xl p-5 sm:p-6 mb-6 border border-slate-800 shadow-xl">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                                <Bot className="w-5 h-5" />
                              </div>
                              <span className="text-sky-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                                Formulasi Prompt Google Gemini AI
                              </span>
                            </div>
                            
                            <a
                              href="https://gemini.google.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-xl transition-all shadow-md w-fit"
                            >
                              <span>Buka Google Gemini</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          {/* Rumus Formulasi */}
                          <div className="text-xs sm:text-sm text-slate-200 font-mono bg-slate-900 p-3.5 rounded-xl border border-slate-800 mb-3 leading-relaxed">
                            <strong className="text-amber-400 uppercase tracking-wider font-sans block mb-1">📌 RUMUS FORMULASI:</strong>
                            {step.promptRumus}
                          </div>

                          {/* Prompt Siap Pakai */}
                          <div className="text-sm sm:text-base text-emerald-300 bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/60 leading-relaxed">
                            <strong className="text-emerald-400 font-bold block mb-1">💬 PROMPT SIAP PAKAI DI GOOGLE GEMINI:</strong>
                            &ldquo;{step.promptExample}&rdquo;
                          </div>
                        </div>
                      )}

                      {/* Tips & Instructions List */}
                      <div className="bg-sky-50/80 border border-sky-150 rounded-2xl p-5 mb-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="w-5 h-5 text-sky-600" />
                          <span className="text-sky-900 font-extrabold text-xs uppercase tracking-wider">Tips &amp; Panduan Praktis</span>
                        </div>
                        <ul className="space-y-2">
                          {step.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-navy-900 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-sky-600 mt-1 shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Concrete Example */}
                      <div className="bg-amber-50/80 border border-amber-200 rounded-xl px-4 py-3 mb-4">
                        <p className="text-xs sm:text-sm text-amber-900 font-medium">
                          <strong className="text-amber-950 font-bold">Contoh Konkrit Hasil: </strong>{step.example}
                        </p>
                      </div>

                      {/* External Reference Button */}
                      <a
                        href={step.refUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-sky-600 hover:text-sky-800 transition-colors group pt-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {step.refLabel}
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* ================ CHALLENGE 2: VIDEO PROMOSI ================ */}
          <div>
            
            {/* Header Challenge 2 */}
            <FadeIn>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-5 border-b-2 border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg">
                    <Video className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-amber-300">
                      CHALLENGE 2
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-serif font-black text-navy-950">Video Promosi Produk</h3>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-amber-900 bg-amber-50 border border-amber-300 px-4 py-2 rounded-2xl shadow-sm">
                  🎥 Format Shorts / Reels (15-30 Detik)
                </span>
              </div>
            </FadeIn>

            {/* Visual Reference Photo Showcase Card for Video */}
            <FadeIn delay={0.1}>
              <div className="mb-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <ImageIcon className="w-6 h-6 text-amber-600" />
                  <h4 className="font-serif font-black text-navy-950 text-lg sm:text-xl">Visualisasi Referensi Produksi Video Promosi (9:16)</h4>
                </div>
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-inner">
                  <Image
                    src={challenge.ref_video_image || "/images/challenge/video-promosi-ref.jpg"}
                    alt="Visualisasi Referensi Video Promosi"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white text-xs sm:text-base font-semibold drop-shadow-md">
                    🎥 <strong>Visual Video Guide:</strong> Pengambilan gambar vertikal 9:16 menggunakan tripod HP, pencahayaan terang, dan penataan alur adegan yang menarik selera.
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 4 Step Flow Cards */}
            <FadeIn delay={0.15}>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
                {videoSteps.map((vs, idx) => {
                  const VIcon = vs.icon;
                  return (
                    <StaggerItem key={idx}>
                      <div className="bg-gradient-to-b from-amber-50 to-orange-50/60 border-2 border-amber-200 rounded-3xl p-6 h-full relative hover:shadow-lg transition-all">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-base mb-4 shadow-md">
                          {vs.num}
                        </div>
                        <VIcon className="w-6 h-6 text-amber-600 mb-3" />
                        <h4 className="font-serif font-black text-navy-950 text-lg mb-2">{vs.title}</h4>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{vs.desc}</p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </FadeIn>

            {/* Formulasi Prompt AI Scripting Video */}
            <FadeIn delay={0.18}>
              <div className="bg-slate-950 text-white rounded-3xl p-7 sm:p-10 mb-14 border border-slate-800 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <Bot className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-white text-xl sm:text-2xl">
                        Formulasi Prompt Google Gemini AI — Naskah Video Promosi
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                        Gunakan Google Gemini AI untuk menyusun naskah &amp; ide alur adegan video 15-30 detik secara otomatis
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://gemini.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0 w-fit"
                  >
                    <span>Buka Google Gemini AI</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="text-xs sm:text-sm text-slate-200 font-mono bg-slate-900 p-4 rounded-xl border border-slate-800 mb-4 leading-relaxed">
                  <strong className="text-amber-400 uppercase tracking-wider font-sans block mb-1">📌 RUMUS NASKAH VIDEO:</strong>
                  [Durasi 15-30 Detik] + [Produk] + [Target Pembeli] + [Struktur: 3 dtk Hook → 7 dtk Solusi/Keunggulan → 5 dtk Call to Action Beli]
                </div>

                <div className="text-sm sm:text-base text-emerald-300 bg-emerald-950/40 p-5 rounded-xl border border-emerald-800/60 leading-relaxed font-sans">
                  <strong className="text-emerald-400 font-bold block mb-1">💬 PROMPT SCRIPT VIDEO SIAP PAKAI DI GOOGLE GEMINI:</strong>
                  &ldquo;Buatkan naskah dan alur adegan video pendek 15 detik (format Reels/TikTok) untuk promosi produk [Abon Ikan Tongkol / Kerupuk Kulit Ikan]. Struktur video: 3 detik pertama hook pembuka yang memancing selera makan, 7 detik penjelasan keunggulan rasa &amp; gizi, dan 5 detik ajakan pesan via WhatsApp [Nomor WA]. Sertakan juga ide visual adegan per detiknya.&rdquo;
                </div>
              </div>
            </FadeIn>

            {/* Lembar Analisis Produk */}
            <FadeIn delay={0.2}>
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-amber-500" />
                  <h3 className="font-serif font-black text-navy-950 text-xl sm:text-2xl">Lembar Analisis Produk</h3>
                  <span className="text-slate-500 text-xs font-semibold">( Isi sebelum rekam video )</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {videoAnalysis.map((q) => (
                    <div key={q.num} className="bg-amber-50/80 border-2 border-amber-200 rounded-3xl p-6 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm mb-4 shadow-md">
                        {q.num}
                      </div>
                      <h4 className="font-serif font-black text-navy-950 text-base sm:text-lg mb-2">
                        {q.question}
                      </h4>
                      <p className="text-amber-900 text-xs sm:text-sm italic font-medium bg-amber-100/60 p-2.5 rounded-xl border border-amber-200/60">
                        💡 Hint: {q.hint}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Spesifikasi Video & Link Referensi */}
            <FadeIn delay={0.25}>
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300 rounded-3xl p-7 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                  <h3 className="font-serif font-black text-navy-950 text-xl sm:text-2xl">Spesifikasi &amp; Tutorial Pengeditan Video</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="bg-white rounded-2xl p-5 border border-amber-200 text-center shadow-sm">
                    <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <div className="font-serif font-black text-navy-950 text-xl">15-30 Detik</div>
                    <p className="text-slate-500 text-xs mt-0.5">Durasi ideal Reels / Shorts</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-amber-200 text-center shadow-sm">
                    <Camera className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <div className="font-serif font-black text-navy-950 text-xl">Vertikal 9:16</div>
                    <p className="text-slate-500 text-xs mt-0.5">Rasio penuh layar HP</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-amber-200 text-center shadow-sm">
                    <Megaphone className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <div className="font-serif font-black text-navy-950 text-xl">Wajib CTA Beli</div>
                    <p className="text-slate-500 text-xs mt-0.5">Ajakan pesan WhatsApp</p>
                  </div>
                </div>

                {/* Tutorial Links */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://gemini.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-blue-950 bg-blue-100 hover:bg-blue-200 px-4 py-2.5 rounded-xl transition-colors border border-blue-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Buat Naskah Video via Google Gemini AI
                  </a>
                  <a
                    href="https://www.youtube.com/results?search_query=tutorial+video+promosi+produk+makanan+hp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-950 bg-amber-100 hover:bg-amber-200 px-4 py-2.5 rounded-xl transition-colors border border-amber-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Tutorial Video Promosi di HP (YouTube)
                  </a>
                  <a
                    href="https://www.capcut.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-950 bg-amber-100 hover:bg-amber-200 px-4 py-2.5 rounded-xl transition-colors border border-amber-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Unduh CapCut (Aplikasi Edit Gratis)
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ================ 5 KATEGORI JUARA ================ */}
      <section className="py-20 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                <Trophy className="w-4 h-4 text-amber-600" />
                Apresiasi &amp; Penghargaan
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-navy-950 mb-3">
                5 Kategori Juara Praktik Kelompok
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
                Setiap kelompok peserta memiliki kesempatan memenangkan penghargaan sesuai dengan aspek keunggulan karya masing-masing.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {winners.map((w, idx) => {
              const WIcon = w.icon;
              const c = colorMap[w.color];
              return (
                <StaggerItem key={idx}>
                  <div className={`${c.bg} border-2 ${c.border} rounded-3xl p-6 text-center hover:shadow-xl hover:-translate-y-1.5 transition-all h-full`}>
                    <div className={`w-16 h-16 rounded-2xl ${c.iconBg} flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                      <WIcon className={`w-8 h-8 ${c.text}`} />
                    </div>
                    <h3 className="font-serif font-black text-navy-950 text-base sm:text-lg mb-2">{w.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ================ BOTTOM: HASIL KARYA ================ */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-3xl p-8 sm:p-10 text-center border border-slate-300 shadow-md">
              <h4 className="font-serif font-black text-navy-950 text-xl sm:text-2xl mb-2">
                Dokumentasi &amp; Hasil Karya Peserta
              </h4>
              <p className="text-slate-600 mb-6 text-sm sm:text-base">
                Ingin melihat publikasi kegiatan &amp; galeri hasil karya peserta challenge sebelumnya?
              </p>
              <Link 
                href="/update"
                className="inline-flex items-center gap-2.5 text-sky-700 font-extrabold hover:text-sky-800 transition-colors text-sm sm:text-base bg-white px-6 py-3.5 rounded-2xl border border-sky-200 shadow-md hover:shadow-lg"
              >
                Lihat di Halaman Update &amp; Berita
                <ChevronRight className="w-5 h-5 text-sky-600" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
