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
  Eye
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';

export const metadata: Metadata = {
  title: "Challenge Digitalisasi & Branding",
  description: "Ikuti Challenge Digitalisasi & Branding Pilar 3 TAWSEC — Brand Make Over dan Video Promosi produk olahan laut Desa Banyusangka.",
};

const REGISTRATION_LINK = "https://forms.gle/GANTI_DENGAN_LINK_PENDAFTARAN";

const brandSteps = [
  {
    num: 1,
    icon: Tag,
    title: "Tentukan Nama Merek (Brand Name)",
    desc: "Pilih nama yang mudah diingat, unik, dan mencerminkan produk olahan laut. Nama merek yang baik bisa berupa gabungan kata lokal + modern.",
    tips: [
      "Coba kombinasi kata: daerah + produk (misal: \"BanyuBon\", \"SangkaRasa\")",
      "Pastikan nama mudah diucapkan & dieja",
      "Cek Google apakah nama sudah dipakai brand lain",
    ],
    example: "Contoh nama merek yang baik: \"Sari Laut Nusantara\", \"Crispy Pesisir\", \"TulangMas\"",
    refLabel: "Panduan Membuat Nama Brand",
    refUrl: "https://www.canva.com/id_id/belajar/cara-membuat-nama-brand/",
  },
  {
    num: 2,
    icon: MessageSquare,
    title: "Buat Slogan / Tagline yang Menarik",
    desc: "Tagline yang catchy membuat konsumen langsung ingat produkmu. Gunakan kalimat pendek, berirama, dan mengandung value produk.",
    tips: [
      "Maksimal 5-8 kata, mudah diingat",
      "Tonjolkan keunggulan: \"Dari Laut, Untuk Keluarga\"",
      "Gunakan rima atau pengulangan bunyi",
    ],
    example: "\"Renyah Alami dari Pesisir\" — \"Gurih Tanpa Pengawet\" — \"Olahan Laut, Rasa Rumahan\"",
    refLabel: "Tips Menulis Tagline yang Menarik",
    refUrl: "https://www.canva.com/id_id/belajar/tagline-adalah/",
  },
  {
    num: 3,
    icon: Sparkles,
    title: "Desain Logo Menggunakan AI (Gemini)",
    desc: "Gunakan Google Gemini (gratis!) untuk membuat logo. Berikan prompt yang spesifik mengenai warna, gaya, dan elemen visual yang diinginkan.",
    tips: [
      "Buka gemini.google.com, ketik prompt desain logo",
      "Contoh prompt: \"Buatkan logo minimalis untuk brand kerupuk ikan bernama [Nama], warna biru laut dan emas, bergaya modern\"",
      "Download hasil, bisa diedit lagi di Canva jika perlu",
    ],
    example: "Prompt: \"Logo modern untuk abon ikan 'SariLaut', warna navy dan oranye, bentuk bulat dengan ikon ikan\"",
    refLabel: "Buka Google Gemini",
    refUrl: "https://gemini.google.com/",
  },
  {
    num: 4,
    icon: Camera,
    title: "Foto Produk (Teknik, Pencahayaan, Komposisi)",
    desc: "Foto produk yang bagus bisa meningkatkan ketertarikan pembeli hingga 3x lipat. Gunakan pencahayaan alami dan background bersih.",
    tips: [
      "Gunakan cahaya alami (dekat jendela, jam 8-10 pagi)",
      "Background putih polos atau kain bersih",
      "Ambil dari beberapa sudut: atas, samping, 45 derajat",
      "Tambahkan properti pendukung: daun, piring cantik",
    ],
    example: "Ambil minimal 3 angle: tampak atas (flat lay), tampak samping (eye level), dan close-up detail produk",
    refLabel: "Tutorial Foto Produk di HP",
    refUrl: "https://www.youtube.com/results?search_query=tutorial+foto+produk+makanan+hp",
  },
  {
    num: 5,
    icon: FileText,
    title: "Susun Caption Medsos",
    desc: "Caption yang baik berisi: deskripsi produk, keunggulan, target pasar, dan Call to Action (CTA) yang jelas.",
    tips: [
      "Baris 1: Hook — kalimat pembuka yang menarik perhatian",
      "Baris 2-3: Keunggulan produk (bahan alami, tanpa pengawet, dll)",
      "Baris akhir: CTA — \"Pesan sekarang via WA di bio!\"",
      "Tambahkan hashtag relevan: #OlahanLaut #UMKM #BanyuSangka",
    ],
    example: "\"Gurih, renyah, bikin nagih! Kerupuk kulit ikan asli Banyusangka — tanpa MSG, langsung dari nelayan. Pesan sekarang! WA 08xx\"",
    refLabel: "Contoh Caption Produk Makanan",
    refUrl: "https://www.canva.com/id_id/belajar/caption-jualan-makanan/",
  },
  {
    num: 6,
    icon: Share2,
    title: "Posting & Presentasi ke Panitia",
    desc: "Posting hasil branding ke media sosial (IG/TikTok) dan presentasikan strategi branding-mu ke panitia untuk mendapat feedback langsung.",
    tips: [
      "Posting di IG Feed/Reels atau TikTok dengan hashtag #TAWSECBanyusangka",
      "Siapkan presentasi singkat (2-3 menit) tentang konsep brand-mu",
      "Jelaskan: mengapa nama ini? siapa target? apa keunggulan?",
    ],
    example: "Format presentasi: Nama Brand > Tagline > Logo > Foto Produk > Caption > Strategi Penjualan",
    refLabel: "Tips Presentasi Singkat",
    refUrl: "https://www.youtube.com/results?search_query=tips+presentasi+singkat+produk+umkm",
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

export default function ChallengePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">

      {/* ================ HERO BANNER ================ */}
      <section className="relative pt-24 pb-24 sm:pt-28 sm:pb-28 overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/galeri/pelatihan-1.png"
            alt="Challenge Digitalisasi & Branding TAWSEC"
            fill
            className="object-cover object-center brightness-[0.35] scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-indigo-950/80 to-navy-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent" />
        </div>

        {/* Decorative Glow */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl" />

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 px-4 py-1.5 rounded-full mb-6">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">Pilar 3 TAWSEC</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white leading-[1.1] mb-6">
                  Challenge<br />
                  <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                    Digitalisasi
                  </span>{" "}
                  &amp;{" "}
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                    Branding
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
                  Tunjukkan kreativitas timmu dalam membangun brand dan membuat konten promosi produk olahan laut Desa Banyusangka!
                </p>

                <Link
                  href={REGISTRATION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-sm group active:scale-95"
                >
                  Daftar Ikut Challenge
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right — Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl p-5 col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                      <Target className="w-5 h-5 text-sky-400" />
                    </div>
                    <h3 className="font-bold text-white text-lg">2 Challenge, 1 Tujuan</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Brand Make Over + Video Promosi untuk meningkatkan daya jual produk olahan laut UMKM
                  </p>
                </div>

                <div className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-0.5">5 Tim</div>
                  <p className="text-slate-400 text-xs">3 anggota + 1 fasilitator per tim</p>
                </div>

                <div className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-0.5">5 Juara</div>
                  <p className="text-slate-400 text-xs">Kategori berbeda, semua berkesempatan</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================ CHALLENGE 1: BRAND MAKE OVER ================ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center shadow-sm">
                <Palette className="w-7 h-7 text-sky-600" />
              </div>
              <div>
                <span className="inline-block bg-sky-100 text-sky-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                  Challenge 1
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900">Brand Make Over</h2>
              </div>
            </div>
            <p className="text-slate-600 mb-12 max-w-3xl leading-relaxed text-sm sm:text-base ml-[4.5rem]">
              Setiap kelompok mendapat 1 produk studi kasus (abon ikan, amplang, atau tepung tulang ikan) untuk dibuatkan branding lengkap dari nol. Ikuti 6 langkah di bawah ini:
            </p>
          </FadeIn>

          {/* Vertical Stepper with Rich Content */}
          <div className="relative ml-4 sm:ml-8">
            {brandSteps.map((step, idx) => {
              const IconComp = step.icon;
              const isLast = idx === brandSteps.length - 1;
              return (
                <FadeIn key={step.num} delay={idx * 0.08}>
                  <div className="flex gap-5 sm:gap-6">
                    {/* Timeline Column */}
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 text-white flex items-center justify-center font-bold text-sm shadow-lg z-10 shrink-0 ring-4 ring-sky-100">
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

                      {/* Tips Box */}
                      <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-3">
                        <div className="flex items-center gap-2 mb-2.5">
                          <Lightbulb className="w-4 h-4 text-sky-600" />
                          <span className="text-sky-800 font-bold text-xs uppercase tracking-wider">Tips & Panduan</span>
                        </div>
                        <ul className="space-y-1.5">
                          {step.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-sky-900">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Example */}
                      <div className="bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 mb-3">
                        <p className="text-xs text-slate-700 italic">
                          <span className="font-semibold text-navy-800 not-italic">Contoh: </span>{step.example}
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
      </section>

      {/* ================ CHALLENGE 2: VIDEO PROMOSI ================ */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center shadow-sm">
                <Video className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <span className="inline-block bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                  Challenge 2
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900">Video Promosi Produk</h2>
              </div>
            </div>
            <p className="text-slate-600 mb-12 max-w-3xl leading-relaxed text-sm sm:text-base ml-[4.5rem]">
              Setiap kelompok membuat video promosi berdurasi singkat (15-30 detik) untuk 1 produk yang ditugaskan. Ikuti alur kerja di bawah ini:
            </p>
          </FadeIn>

          {/* 4 Step Flow */}
          <FadeIn delay={0.1}>
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
                        {idx < videoSteps.length - 1 && (
                          <ChevronRight className="w-4 h-4 text-amber-400 absolute right-3 top-1/2 -translate-y-1/2 hidden lg:block" />
                        )}
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

          {/* Lembar Analisis Produk */}
          <FadeIn delay={0.15}>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-navy-900 text-lg">Lembar Analisis Produk</h3>
                <span className="text-slate-400 text-xs ml-2">( Jawab sebelum mulai syuting )</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {videoAnalysis.map((q) => (
                  <div key={q.num} className="bg-amber-50 border border-amber-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs mb-3 shadow-sm">{q.num}</div>
                    <p className="text-navy-900 text-sm font-semibold mb-1">{q.question}</p>
                    <p className="text-amber-700 text-xs italic">{q.hint}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Spesifikasi Video */}
          <FadeIn delay={0.2}>
            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-300 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-navy-900 text-lg">Spesifikasi Video</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-amber-200 text-center">
                  <Clock className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <div className="font-bold text-navy-900 text-lg">15-30 detik</div>
                  <p className="text-slate-500 text-xs">Durasi wajib</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-amber-200 text-center">
                  <Camera className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <div className="font-bold text-navy-900 text-lg">Vertikal 9:16</div>
                  <p className="text-slate-500 text-xs">Format IG Reels / TikTok</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-amber-200 text-center">
                  <Megaphone className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <div className="font-bold text-navy-900 text-lg">Wajib CTA</div>
                  <p className="text-slate-500 text-xs">Ajakan beli / kunjungi</p>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border border-amber-200">
                <h4 className="font-semibold text-navy-900 text-sm mb-2">Video wajib memuat:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {["Nama produk / brand", "Keunggulan utama produk", "Call to Action (CTA)"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-navy-800">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tutorial References */}
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/results?search_query=tutorial+video+promosi+produk+makanan+hp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Tutorial Video Promosi Produk
                </a>
                <a
                  href="https://www.canva.com/id_id/belajar/cara-edit-video/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Cara Edit Video di HP (Canva)
                </a>
                <a
                  href="https://www.capcut.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  CapCut (Aplikasi Edit Video Gratis)
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================ 5 KATEGORI JUARA ================ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Trophy className="w-4 h-4" />
                Penghargaan
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900 mb-3">
                5 Kategori Juara
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
                Semua tim berkesempatan menang di kategori yang berbeda — bukan cuma 1 pemenang umum!
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

      {/* ================ CTA SECTION ================ */}
      <section className="py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-navy-900 via-indigo-950 to-navy-950 rounded-3xl p-10 sm:p-16 text-center shadow-2xl overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-sky-500/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs text-white font-medium mb-6 border border-white/10">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Pendaftaran Dibuka
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                  Siap Unjuk Kreativitas?
                </h2>
                <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Daftar sekarang dan tunjukkan kemampuan branding &amp; promosi timmu!
                </p>
                <Link
                  href={REGISTRATION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-12 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-base group active:scale-95"
                >
                  Daftar Ikut Challenge
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================ BOTTOM: HASIL KARYA ================ */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="bg-slate-100 rounded-2xl p-6 sm:p-8 text-center border border-slate-200">
              <p className="text-navy-900 font-medium mb-3 text-sm sm:text-base">
                Ingin lihat hasil karya peserta challenge sebelumnya?
              </p>
              <Link 
                href="/update"
                className="inline-flex items-center gap-2 text-sky-600 font-bold hover:text-sky-700 transition-colors text-sm"
              >
                Lihat di Halaman Update
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
