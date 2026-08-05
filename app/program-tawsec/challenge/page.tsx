import type { Metadata } from 'next';
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
  ArrowRight
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';

export const metadata: Metadata = {
  title: "Challenge Digitalisasi & Branding",
  description: "Ikuti Challenge Digitalisasi & Branding Pilar 3 TAWSEC — Brand Make Over dan Video Promosi produk olahan laut Desa Banyusangka.",
};

const REGISTRATION_LINK = "https://forms.gle/GANTI_DENGAN_LINK_PENDAFTARAN";

export default function ChallengePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-navy-950 via-indigo-950 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="flex flex-wrap items-center text-sm font-medium text-slate-300 mb-6 gap-2">
              <Link href="/program-tawsec" className="hover:text-white transition-colors">Program TAWSEC</Link>
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <span>Pilar 3</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <span className="text-white">Challenge</span>
            </div>
            
            <div className="max-w-4xl">
              <h2 className="text-orange-400 font-bold tracking-wider uppercase text-sm mb-4">
                Pilar 3 TAWSEC
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Challenge Digitalisasi & Branding
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                Tunjukkan kreativitas timmu dalam membangun brand dan membuat konten promosi produk olahan laut Desa Banyusangka!
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-400" />
                  5 Tim Peserta
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  3 Orang + 1 Fasilitator
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 text-sm font-medium text-slate-200">
                  Jumlah tim menyesuaikan peserta yang hadir
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2 Challenge 1 Tujuan */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                2 Challenge, 1 Tujuan
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Bantu UMKM lokal meningkatkan daya tarik produk mereka melalui branding yang kuat dan strategi promosi digital yang tepat sasaran.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Challenge 1 */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center">
                    <Palette className="w-7 h-7 text-sky-600" />
                  </div>
                  <div>
                    <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1 rounded-full mb-1">
                      Challenge 1
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-navy-900">
                      Brand Make Over
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 mb-10 leading-relaxed">
                  Setiap kelompok mendapat 1 produk studi kasus (abon ikan, amplang, atau tepung tulang ikan) untuk dibuatkan branding lengkap dari nol.
                </p>

                <div className="relative">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-md z-10 shrink-0">
                        1
                      </div>
                      <div className="w-0.5 h-full bg-sky-100 mt-1" />
                    </div>
                    <div className="pb-8 pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Tag className="w-4 h-4 text-sky-600" />
                        <h4 className="font-bold text-navy-900 text-sm">Tentukan Nama Merek (Brand Name)</h4>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-md z-10 shrink-0">
                        2
                      </div>
                      <div className="w-0.5 h-full bg-sky-100 mt-1" />
                    </div>
                    <div className="pb-8 pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-4 h-4 text-sky-600" />
                        <h4 className="font-bold text-navy-900 text-sm">Buat Slogan/Tagline yang Menarik</h4>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-md z-10 shrink-0">
                        3
                      </div>
                      <div className="w-0.5 h-full bg-sky-100 mt-1" />
                    </div>
                    <div className="pb-8 pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-sky-600" />
                        <h4 className="font-bold text-navy-900 text-sm">Desain Logo Menggunakan AI (Gemini)</h4>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-md z-10 shrink-0">
                        4
                      </div>
                      <div className="w-0.5 h-full bg-sky-100 mt-1" />
                    </div>
                    <div className="pb-8 pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Camera className="w-4 h-4 text-sky-600" />
                        <h4 className="font-bold text-navy-900 text-sm">Foto Produk (Teknik, Pencahayaan, Komposisi)</h4>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-md z-10 shrink-0">
                        5
                      </div>
                      <div className="w-0.5 h-full bg-sky-100 mt-1" />
                    </div>
                    <div className="pb-8 pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-sky-600" />
                        <h4 className="font-bold text-navy-900 text-sm">Susun Caption Medsos</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 ml-6">Deskripsi, Keunggulan, Target, CTA</p>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-md z-10 shrink-0">
                        6
                      </div>
                    </div>
                    <div className="pb-2 pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Share2 className="w-4 h-4 text-sky-600" />
                        <h4 className="font-bold text-navy-900 text-sm">Posting & Presentasi ke Panitia untuk Feedback</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Challenge 2 */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
                    <Video className="w-7 h-7 text-amber-600" />
                  </div>
                  <div>
                    <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-1">
                      Challenge 2
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-navy-900">
                      Video Promosi Produk
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 mb-10 leading-relaxed">
                  Setiap kelompok membuat video promosi berdurasi singkat (15-30 detik) untuk 1 produk yang ditugaskan.
                </p>

                <div className="mb-8">
                  <h4 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-500" />
                    Lembar Analisis Produk
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs mb-2">1</div>
                      <p className="text-navy-800 text-sm font-medium">Siapa target pembeli produk ini?</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs mb-2">2</div>
                      <p className="text-navy-800 text-sm font-medium">Apa keunggulan dibanding produk lain?</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs mb-2">3</div>
                      <p className="text-navy-800 text-sm font-medium">Apa pesan utama yang ingin disampaikan?</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs mb-2">4</div>
                      <p className="text-navy-800 text-sm font-medium">Platform yang dituju? (IG/TikTok/WA Business/dll)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <h4 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Spesifikasi Video
                  </h4>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-5">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        <div>
                          <span className="font-semibold text-navy-900 block text-sm">Durasi</span>
                          <span className="text-slate-600 text-sm">15-30 detik</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        <div>
                          <span className="font-semibold text-navy-900 block text-sm">Wajib Memuat</span>
                          <span className="text-slate-600 text-sm">Nama produk, Keunggulan produk, Call to Action</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5 Kategori Juara */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                5 Kategori Juara
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Tunjukkan yang terbaik di bidangmu!
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <StaggerItem>
              <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-7 h-7 text-sky-600" />
                </div>
                <h3 className="font-serif font-bold text-navy-900 text-sm">Visual Konten Terbaik</h3>
              </div>
            </StaggerItem>

            {/* Card 2 */}
            <StaggerItem>
              <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
                  <Banknote className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="font-serif font-bold text-navy-900 text-sm">Ajakan Membeli Paling Meyakinkan</h3>
              </div>
            </StaggerItem>

            {/* Card 3 */}
            <StaggerItem>
              <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-3">
                  <Flame className="w-7 h-7 text-rose-500" />
                </div>
                <h3 className="font-serif font-bold text-navy-900 text-sm">Potensi Viral Terbaik</h3>
              </div>
            </StaggerItem>

            {/* Card 4 */}
            <StaggerItem>
              <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="font-serif font-bold text-navy-900 text-sm">Kolaborasi Tim Terbaik</h3>
              </div>
            </StaggerItem>

            {/* Card 5 */}
            <StaggerItem>
              <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-7 h-7 text-violet-500" />
                </div>
                <h3 className="font-serif font-bold text-navy-900 text-sm">Konten Promosi Terbaik</h3>
              </div>
            </StaggerItem>
          </StaggerContainer>
          
          <FadeIn delay={0.4}>
            <p className="text-center text-slate-500 text-sm italic font-medium">
              Semua tim berkesempatan menang di kategori berbeda-beda — bukan cuma 1 pemenang umum!
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="bg-gradient-to-br from-navy-900 to-indigo-950 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                  Siap Unjuk Kreativitas?
                </h2>
                <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                  Daftar sekarang dan tunjukkan kemampuan branding & promosi timmu!
                </p>
                <Link
                  href={REGISTRATION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-base group"
                >
                  Daftar Ikut Challenge
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bottom Section - Hasil Karya */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="bg-slate-100 rounded-2xl p-8 text-center max-w-3xl mx-auto border border-slate-200">
              <p className="text-navy-900 font-medium mb-4">
                Ingin lihat hasil karya peserta challenge sebelumnya?
              </p>
              <Link 
                href="/update"
                className="inline-flex items-center gap-2 text-sky-600 font-bold hover:text-sky-700 transition-colors"
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
