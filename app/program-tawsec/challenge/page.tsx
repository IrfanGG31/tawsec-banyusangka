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
  HelpCircle,
  ImageIcon,
  Bot,
  Terminal
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';
import { getSiteSettings } from '@/lib/supabase/settings';

export const metadata: Metadata = {
  title: "Challenge Digitalisasi & Branding — Pilar 3 TAWSEC",
  description: "Media panduan instruksi praktik langsung Challenge Digitalisasi & Branding Pilar 3 TAWSEC — Brand Make Over dan Video Promosi produk olahan laut Desa Banyusangka menggunakan Google Gemini AI.",
};

const brandSteps = [
  {
    num: 1,
    icon: Tag,
    title: "Tentukan Nama Merek (Brand Name)",
    desc: "Buat konsep ide nama brand khas olahan laut milik kelompokmu, lalu gunakan Google Gemini AI untuk memberikan ide variasi nama yang unik dan berkesan modern.",
    tips: [
      "Coba kombinasi kata: daerah/bahasa Madura + nama produk (misal: \"BanyuBon\", \"SangkaRasa\")",
      "Pastikan nama mudah diucapkan, dieja, dan tidak berkonotasi negatif",
      "Cek di Google apakah nama tersebut sudah digunakan oleh brand lain",
    ],
    example: "Contoh nama merek: \"Sari Laut Nusantara\", \"Crispy Pesisir\", \"TulangMas\"",
    refLabel: "Panduan Membuat Nama Brand",
    refUrl: "https://www.canva.com/id_id/belajar/cara-membuat-nama-brand/",
    promptRumus: "[Jenis Produk Olahan] + [Bahan Dasar/Keunggulan] + [Nuansa Kesan: Lokal / Modern / Gurih / Mewah]",
    promptExample: "Berikan 5 ide nama brand yang unik dan berkesan modern untuk produk [Abon Ikan Tongkol / Kerupuk Kulit Ikan] khas Desa Banyusangka. Nama harus singkat, mudah diingat, bernuansa [lokal & profesional], dan belum pernah dipakai.",
  },
  {
    num: 2,
    icon: MessageSquare,
    title: "Buat Slogan / Tagline yang Menarik",
    desc: "Susun pesan utama produkmu, lalu gunakan Google Gemini AI untuk memformulasikan slogan pendek yang berkesan dan persuasif.",
    tips: [
      "Maksimal 5-8 kata, gampang diingat dalam sekali dengar",
      "Tonjolkan manfaat utama: \"Dari Laut Banyusangka, Untuk Keluarga Indonesia\"",
      "Gunakan teknik rima atau pengulangan bunyi yang menyenangkan",
    ],
    example: "\"Renyah Alami dari Pesisir\" — \"Gurih Tanpa Pengawet\" — \"Olahan Laut, Rasa Rumahan\"",
    refLabel: "Tips Menulis Tagline yang Menarik",
    refUrl: "https://www.canva.com/id_id/belajar/tagline-adalah/",
    promptRumus: "[Nama Brand] + [Produk] + [Keunggulan Utama: Tanpa Pengawet / Kalsium Tinggi / Gurih Alami] + [Kesan untuk Pembeli]",
    promptExample: "Buatkan 5 pilihan slogan/tagline pendek dan catchy (maksimal 6 kata) untuk brand '[Nama Brand]' yang menjual [Kerupuk Kulit Ikan Crispy]. Keunggulan utama produk kami: [renyah alami, tanpa pengawet, hasil nelayan Banyusangka].",
  },
  {
    num: 3,
    icon: Sparkles,
    title: "Desain Logo Menggunakan Google Gemini AI",
    desc: "Tentukan konsep visual (elemen laut, warna, dan gaya), lalu minta Google Gemini AI (gemini.google.com) membuatkan draf gambar logo.",
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
    num: 4,
    icon: Camera,
    title: "Foto Produk & Ide Visual (Teknik, Pencahayaan, Komposisi)",
    desc: "Gunakan HP untuk memfoto kemasan produk. Gunakan Google Gemini AI untuk mendapatkan ide penataan alas (styling), properti, dan sudut foto terbaik.",
    tips: [
      "Gunakan cahaya alami matahari (dekat jendela, jam 8-10 pagi)",
      "Latar belakang putih polos, alas kayu, atau kain berserat bersih",
      "Ambil minimal 3 angle: 90° Flat Lay (atas), 45° Eye Level (depan), & Close-up tekstur produk",
    ],
    example: "Ambil minimal 3 angle: tampak atas (flat lay), tampak depan, dan detail isi produk",
    refLabel: "Tutorial Foto Produk di HP",
    refUrl: "https://www.youtube.com/results?search_query=tutorial+foto+produk+makanan+hp",
    promptRumus: "[Jenis Produk] + [Kemasan: Pouch/Toples] + [Properti Latar] + [Lighting Alami] + [Rekomendasi 3 Angle Kamera HP]",
    promptExample: "Berikan ide konsep food styling dan susunan foto produk jualan untuk [Abon Ikan / Kerupuk Ikan] dalam [pouch transparan]. Jelaskan latar belakang yang cocok, properti pendukung (seperti daun salam, piring kayu, potongan cabai), serta 3 sudut pengambilan foto HP yang paling terlihat lezat.",
  },
  {
    num: 5,
    icon: FileText,
    title: "Susun Caption Medsos Penjualan",
    desc: "Gabungkan keunggulan produk dan kontak pemesanan, lalu minta Google Gemini AI merangkai caption promosi yang membakar minat beli.",
    tips: [
      "Baris 1 (Hook): Kalimat pembuka yang memancing rasa ingin tahu",
      "Baris 2-3 (Value): Keunggulan nutrisi & kelezatan produk",
      "Baris Akhir (CTA): Ajakan pemesanan langsung via WhatsApp / marketplace",
    ],
    example: "\"Gurih, renyah, bikin nagih! Kerupuk kulit ikan asli Banyusangka — tanpa MSG, langsung dari nelayan. Pesan sekarang! WA 08xx\"",
    refLabel: "Contoh Caption Produk Makanan",
    refUrl: "https://www.canva.com/id_id/belajar/caption-jualan-makanan/",
    promptRumus: "[Hook Penasaran] + [Keunggulan Produk] + [Harga/Promo] + [Call to Action WA + 5 Hashtag Relevan]",
    promptExample: "Buatkan caption Instagram dan TikTok yang menjual untuk produk [Kerupuk Kulit Ikan / Abon Ikan]. Mulai dengan kalimat pembuka (hook) yang memancing rasa lapar, sebutkan keunggulan [tanpa pengawet & kaya kalsium], lalu beri ajakan beli via WhatsApp [Nomor WA]. Tambahkan 5 hashtag jualan populer.",
  },
  {
    num: 6,
    icon: Share2,
    title: "Posting & Presentasi Hasil Karya",
    desc: "Unggah karya kelompok ke media sosial (IG/TikTok) dan presentasikan konsep branding yang telah dibuat kepada peserta pelatihan & panitia.",
    tips: [
      "Unggah postingan dengan hashtag resmi #TAWSECBanyusangka #DigitalisasiPesisir",
      "Siapkan presentasi singkat (2-3 menit) tentang perjalanan konsep brand kelompokmu",
      "Tunjukkan: Nama Brand, Slogan, Gambar Logo AI, Foto Produk HP, dan Caption Jualan",
    ],
    example: "Urutan Presentasi: Nama Brand → Slogan → Logo AI → Foto Produk → Caption Jualan",
    refLabel: "Tips Presentasi Singkat",
    refUrl: "https://www.youtube.com/results?search_query=tips+presentasi+singkat+produk+umkm",
    promptRumus: "[Nama Brand] + [Konsep Branding] + [Target Pembeli] + [Minta Feedback Perbaikan dari Gemini AI]",
    promptExample: "Saya telah membuat konsep brand '[Nama Brand]' untuk [Abon Ikan Tongkol] dengan slogan '[Slogan]'. Target pembeli kami adalah [ibu rumah tangga & anak muda]. Berikan masukan perbaikan singkat untuk strategi pemasaran online kami.",
  },
];

const videoAnalysis = [
  { num: 1, question: "Siapa target pembeli produk ini?", hint: "Ibu rumah tangga? Anak muda? Wisatawan?" },
  { num: 2, question: "Apa keunggulan dibanding produk lain?", hint: "Bahan alami, tanpa pengawet, rasa unik?" },
  { num: 3, question: "Apa pesan utama yang ingin disampaikan?", hint: "Kualitas, keaslian, harga terjangkau?" },
  { num: 4, question: "Platform yang dituju?", hint: "IG Reels, TikTok, WA Status, YouTube Shorts?" },
];

const videoSteps = [
  { icon: BookOpen, title: "Isi Lembar Analisis Produk", desc: "Jawab 4 pertanyaan analisis untuk menentukan arah konten video" },
  { icon: PenTool, title: "Susun Script / Storyboard Sederhana", desc: "Tulis narasi singkat & urutan adegan (opening → isi → CTA)" },
  { icon: Play, title: "Rekam Video 15-30 Detik", desc: "Gunakan HP dengan kamera terbaik, pastikan pencahayaan cukup" },
  { icon: Megaphone, title: "Posting & Presentasi", desc: "Upload ke platform pilihan dan presentasikan strategi konten" },
];

const winners = [
  { icon: Eye, title: "Visual Konten Terbaik", desc: "Desain branding & foto produk paling menarik secara visual", color: "sky" },
  { icon: Banknote, title: "Ajakan Membeli Paling Meyakinkan", desc: "CTA dan caption paling efektif mengajak pembelian", color: "amber" },
  { icon: Flame, title: "Potensi Viral Terbaik", desc: "Konten yang paling berpotensi menyebar luas di medsos", color: "rose" },
  { icon: Users, title: "Kolaborasi Tim Terbaik", desc: "Tim yang paling kompak dan saling melengkapi", color: "emerald" },
  { icon: Star, title: "Konten Promosi Terbaik", desc: "Kombinasi terbaik dari semua aspek challenge", color: "violet" },
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
    <div className="min-h-screen bg-slate-50 pb-20">

      {/* ================ HERO BANNER (ATTRACTIVE & DYNAMIC) ================ */}
      <section className="relative pt-24 pb-24 sm:pt-28 sm:pb-28 overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/galeri/pelatihan-1.png"
            alt="Pelatihan Pemberdayaan TAWSEC Banyusangka"
            fill
            className="object-cover object-center brightness-[0.3] scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-indigo-950/85 to-navy-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
        </div>

        {/* Decorative Glow */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn>
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center text-sm font-medium text-slate-400 mb-8 gap-1.5">
              <Link href="/program-tawsec" className="hover:text-white transition-colors">Program TAWSEC</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span>Pilar 3</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-white font-semibold">Challenge</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Content (8 cols) */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 px-4 py-1.5 rounded-full mb-6">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">{challenge.sub_judul}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white leading-[1.1] mb-6">
                  {challenge.judul_challenge}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
                  {challenge.deskripsi_challenge}
                </p>

                {/* Offline Mode & Gemini AI Badge */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="inline-flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md px-5 py-3 rounded-2xl text-emerald-200 text-xs sm:text-sm font-medium">
                    <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>
                      <strong>Praktik Lapangan Direct:</strong> Pendampingan langsung oleh Fasilitator TAWSEC.
                    </span>
                  </div>

                  <a
                    href="https://gemini.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-lg transition-all active:scale-95 border border-blue-400/30 shrink-0"
                  >
                    <Sparkles className="w-4 h-4 text-blue-300" />
                    Buka Google Gemini AI ↗
                  </a>
                </div>
              </div>

              {/* Right Stats & Offline Card (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-white text-lg">Modul Challenge Praktik</h3>
                      <p className="text-slate-400 text-xs">Acuan kerja kelompok peserta</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-sky-400" /> Format Kelompok
                      </span>
                      <span className="font-bold text-white">5 Tim Peserta</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-emerald-400" /> Komposisi Tim
                      </span>
                      <span className="font-bold text-white">3 Peserta + 1 Fasilitator</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400" /> Powered by AI
                      </span>
                      <span className="font-bold text-blue-300">Google Gemini AI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================ NOTICE BANNER: PRAKTIK OFFLINE FIELDWORK ================ */}
      <section className="-mt-8 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-sky-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0 text-sky-300 mt-1">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 bg-sky-400/20 text-sky-300 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-1">
                  Praktik Langsung di Lapangan
                </div>
                <h3 className="font-serif font-bold text-white text-lg sm:text-xl">
                  Challenge Diuji &amp; Dipraktikkan Secara Offline
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl">
                  {challenge.info_praktik}
                </p>
              </div>
            </div>

            <a
              href={waFasilitatorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg transition-all shrink-0 whitespace-nowrap active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              Tanya Fasilitator TAWSEC
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ================ SECTION: 2 CHALLENGE, 1 TUJUAN ================ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-sky-700 font-semibold text-xs uppercase tracking-widest bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200">
                Instruksi Praktik Mandiri &amp; Kelompok
              </span>
              <h2 className="font-serif font-bold text-navy-900 text-3xl sm:text-4xl mt-3">
                2 Challenge Utama, 1 Tujuan Pemberdayaan
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-2">
                Bantu UMKM lokal meningkatkan daya tarik produk olahan laut melalui branding yang kuat dan strategi promosi digital yang efektif.
              </p>
            </div>
          </FadeIn>

          {/* ================ GOOGLE GEMINI AI HUB BANNER ================ */}
          <FadeIn delay={0.08}>
            <div className="mb-14 bg-gradient-to-r from-blue-900 via-indigo-900 to-navy-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg text-white mt-1">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-1">
                    Mesin Utama AI: Google Gemini AI
                  </div>
                  <h3 className="font-serif font-bold text-white text-xl">
                    Eksplorasi Ide &amp; Branding Menggunakan Google Gemini AI
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl">
                    Seluruh formulasi prompt di bawah ini dirancang khusus dan paling optimal digunakan pada <strong>Google Gemini AI</strong> (gratis &amp; tanpa perlu install aplikasi). Salin template prompt dan langsung coba di Google Gemini!
                  </p>
                </div>
              </div>

              <a
                href="https://gemini.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-700 text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all shrink-0 active:scale-95 group"
              >
                <Bot className="w-4.5 h-4.5" />
                Buka Google Gemini AI
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </FadeIn>

          {/* ================ CHALLENGE 1: BRAND MAKE OVER ================ */}
          <div className="mb-20">
            <FadeIn>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center shadow-sm">
                    <Palette className="w-7 h-7 text-sky-600" />
                  </div>
                  <div>
                    <span className="inline-block bg-sky-100 text-sky-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                      Challenge 1
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900">Brand Make Over</h3>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full">
                  Studi Kasus: Abon Ikan / Amplang / Tepung Tulang
                </span>
              </div>
            </FadeIn>

            {/* Visual Reference Photo Showcase Card */}
            <FadeIn delay={0.1}>
              <div className="mb-10 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-md overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-sky-600" />
                  <h4 className="font-bold text-navy-900 text-base">Visualisasi Referensi Packaging &amp; Brand Make Over</h4>
                </div>
                <div className="relative w-full h-[240px] sm:h-[360px] rounded-2xl overflow-hidden shadow-inner">
                  <Image
                    src={challenge.ref_brand_image || "/images/challenge/brand-makeover-ref.jpg"}
                    alt="Visualisasi Referensi Brand Make Over"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm font-medium drop-shadow">
                    📸 <strong>Visual Reference Guide:</strong> Contoh mockup stiker logo modern, kemasan pouch higienis, dan foto produk flatlay pencahayaan alami.
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Stepper Steps with Formulasi Prompt AI */}
            <div className="relative ml-2 sm:ml-6">
              {brandSteps.map((step, idx) => {
                const IconComp = step.icon;
                const isLast = idx === brandSteps.length - 1;
                return (
                  <FadeIn key={step.num} delay={idx * 0.06}>
                    <div className="flex gap-4 sm:gap-6">
                      {/* Timeline Column */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 text-white flex items-center justify-center font-bold text-sm shadow-lg z-10 shrink-0 ring-4 ring-sky-100">
                          {step.num}
                        </div>
                        {!isLast && <div className="w-0.5 flex-1 bg-gradient-to-b from-sky-300 to-sky-100 mt-1" />}
                      </div>

                      {/* Content Card */}
                      <div className={`bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex-1 ${isLast ? 'mb-0' : 'mb-5'}`}>
                        <div className="flex items-center gap-2.5 mb-2">
                          <IconComp className="w-5 h-5 text-sky-600" />
                          <h4 className="font-bold text-navy-900 text-base">{step.title}</h4>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{step.desc}</p>

                        {/* Formulasi Prompt Google Gemini AI Box */}
                        {step.promptRumus && (
                          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 mb-4 border border-slate-800 shadow-md">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
                              <div className="flex items-center gap-2">
                                <Bot className="w-4.5 h-4.5 text-sky-400" />
                                <span className="text-sky-300 font-bold text-xs uppercase tracking-wider">Formulasi Prompt Google Gemini AI</span>
                              </div>
                              <a
                                href="https://gemini.google.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-lg transition-colors w-fit shadow-sm"
                              >
                                <span>Buka Google Gemini</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                            <div className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 mb-3">
                              <span className="text-amber-400 font-bold">📌 Rumus Formulasi: </span>{step.promptRumus}
                            </div>

                            <div className="text-xs sm:text-sm text-emerald-300 bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-800/60 leading-relaxed font-sans">
                              <span className="text-emerald-400 font-bold block mb-1">💬 Prompt Siap Pakai di Google Gemini (Salin &amp; Sesuaikan Idemu):</span>
                              &ldquo;{step.promptExample}&rdquo;
                            </div>
                          </div>
                        )}

                        {/* Tips Box */}
                        <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-3">
                          <div className="flex items-center gap-2 mb-2.5">
                            <Lightbulb className="w-4 h-4 text-sky-600" />
                            <span className="text-sky-800 font-bold text-xs uppercase tracking-wider">Tips &amp; Tutorial Praktis</span>
                          </div>
                          <ul className="space-y-1.5">
                            {step.tips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-sky-900">
                                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Example */}
                        <div className="bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 mb-3">
                          <p className="text-xs text-slate-700 italic">
                            <span className="font-semibold text-navy-800 not-italic">Contoh Hasil: </span>{step.example}
                          </p>
                        </div>

                        {/* Reference Link */}
                        <a
                          href={step.refUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-800 transition-colors group"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {step.refLabel}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* ================ CHALLENGE 2: VIDEO PROMOSI ================ */}
          <div>
            <FadeIn>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center shadow-sm">
                    <Video className="w-7 h-7 text-amber-600" />
                  </div>
                  <div>
                    <span className="inline-block bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                      Challenge 2
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900">Video Promosi Produk</h3>
                  </div>
                </div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full">
                  Format Shorts / Reels 15-30 Detik
                </span>
              </div>
            </FadeIn>

            {/* Visual Reference Photo Showcase Card for Video */}
            <FadeIn delay={0.1}>
              <div className="mb-10 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-md overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-amber-600" />
                  <h4 className="font-bold text-navy-900 text-base">Visualisasi Referensi Produksi Video Promosi (9:16)</h4>
                </div>
                <div className="relative w-full h-[240px] sm:h-[360px] rounded-2xl overflow-hidden shadow-inner">
                  <Image
                    src={challenge.ref_video_image || "/images/challenge/video-promosi-ref.jpg"}
                    alt="Visualisasi Referensi Video Promosi"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm font-medium drop-shadow">
                    🎥 <strong>Visual Video Guide:</strong> Pengambilan gambar vertikal 9:16 menggunakan tripod HP, pencahayaan terang, dan penataan storytelling yang menarik.
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 4 Step Flow */}
            <FadeIn delay={0.15}>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {videoSteps.map((vs, idx) => {
                  const VIcon = vs.icon;
                  return (
                    <StaggerItem key={idx}>
                      <div className="bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 h-full relative">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                            {idx + 1}
                          </div>
                        </div>
                        <VIcon className="w-5 h-5 text-amber-600 mb-2" />
                        <h4 className="font-bold text-navy-900 text-sm mb-1">{vs.title}</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">{vs.desc}</p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </FadeIn>

            {/* Formulasi Prompt AI Scripting Video */}
            <FadeIn delay={0.18}>
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-12 border border-slate-800 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Formulasi Prompt Google Gemini AI — Penulisan Script Video Promosi</h4>
                      <p className="text-slate-400 text-xs">Gunakan Google Gemini AI untuk membuat naskah &amp; ide adegan video 15-30 detik secara otomatis</p>
                    </div>
                  </div>

                  <a
                    href="https://gemini.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-xl transition-colors w-fit shadow-md shrink-0"
                  >
                    <span>Buka Google Gemini AI</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="text-xs text-slate-300 font-mono bg-slate-950 p-3.5 rounded-xl border border-slate-800 mb-3">
                  <span className="text-amber-400 font-bold">📌 Rumus Naskah Video: </span>
                  [Durasi 15-30 Detik] + [Produk] + [Target Pembeli] + [Struktur: 3 dtk Hook → 7 dtk Solusi/Keunggulan → 5 dtk CTA Beli]
                </div>

                <div className="text-xs sm:text-sm text-emerald-300 bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/60 leading-relaxed font-sans">
                  <span className="text-emerald-400 font-bold block mb-1">💬 Prompt Script Video Siap Pakai di Google Gemini:</span>
                  &ldquo;Buatkan naskah dan alur adegan video pendek 15 detik (format Reels/TikTok) untuk promosi produk [Abon Ikan Tongkol / Kerupuk Kulit Ikan]. Struktur video: 3 detik pertama hook pembuka yang memancing selera makan, 7 detik penjelasan keunggulan rasa &amp; gizi, dan 5 detik ajakan pesan via WhatsApp [Nomor WA]. Sertakan juga ide visual adegan per detiknya.&rdquo;
                </div>
              </div>
            </FadeIn>

            {/* Lembar Analisis Produk */}
            <FadeIn delay={0.2}>
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-navy-900 text-lg">Lembar Analisis Produk</h3>
                  <span className="text-slate-400 text-xs ml-2">( Jawab sebelum mulai pengambilan video )</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videoAnalysis.map((q) => (
                    <div key={q.num} className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs mb-3 shadow-sm">{q.num}</div>
                      <p className="text-navy-900 text-sm font-semibold mb-1">{q.question}</p>
                      <p className="text-amber-700 text-xs italic">{q.hint}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Spesifikasi Video & Link Referensi */}
            <FadeIn delay={0.25}>
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-300 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-navy-900 text-lg">Spesifikasi &amp; Tutorial Pengeditan Video</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-2xl p-4 border border-amber-200 text-center shadow-sm">
                    <Clock className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                    <div className="font-bold text-navy-900 text-lg">15-30 detik</div>
                    <p className="text-slate-500 text-xs">Durasi ideal Reels / Shorts</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-amber-200 text-center shadow-sm">
                    <Camera className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                    <div className="font-bold text-navy-900 text-lg">Vertikal 9:16</div>
                    <p className="text-slate-500 text-xs">Rasio penuh layar HP</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-amber-200 text-center shadow-sm">
                    <Megaphone className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                    <div className="font-bold text-navy-900 text-lg">Wajib CTA</div>
                    <p className="text-slate-500 text-xs">Ajakan beli / hubungi WA</p>
                  </div>
                </div>

                {/* Tutorial Links */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="https://gemini.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-100 hover:bg-blue-200 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Buat Naskah Video via Google Gemini AI
                  </a>
                  <a
                    href="https://www.youtube.com/results?search_query=tutorial+video+promosi+produk+makanan+hp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Tutorial Video Promosi di HP (YouTube)
                  </a>
                  <a
                    href="https://www.capcut.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Unduh / Buka CapCut (Aplikasi Edit Gratis)
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ================ 5 KATEGORI JUARA ================ */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Trophy className="w-4 h-4" />
                Apresiasi Hasil Karya
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900 mb-3">
                5 Kategori Juara Praktik
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
                Setiap kelompok peserta memiliki peluang menang sesuai dengan keunggulan karya branding masing-masing.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8 max-w-6xl mx-auto">
            {winners.map((w, idx) => {
              const WIcon = w.icon;
              const c = colorMap[w.color];
              return (
                <StaggerItem key={idx}>
                  <div className={`${c.bg} border ${c.border} rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all h-full`}>
                    <div className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center mx-auto mb-3`}>
                      <WIcon className={`w-7 h-7 ${c.text}`} />
                    </div>
                    <h3 className="font-serif font-bold text-navy-900 text-sm mb-1.5">{w.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{w.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ================ BOTTOM: HASIL KARYA ================ */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="bg-slate-100 rounded-3xl p-8 text-center border border-slate-200 shadow-sm">
              <p className="text-navy-900 font-semibold mb-3 text-base">
                Ingin melihat publikasi &amp; galeri karya peserta challenge sebelumnya?
              </p>
              <Link 
                href="/update"
                className="inline-flex items-center gap-2 text-sky-600 font-bold hover:text-sky-700 transition-colors text-sm bg-white px-5 py-2.5 rounded-xl border border-sky-100 shadow-sm"
              >
                Lihat di Halaman Update &amp; Berita
                <ChevronRight className="w-4 h-4" />
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
