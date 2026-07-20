"use client";

import { FadeIn } from "@/components/ui/Animations";
import { CheckCircle, Award, BookOpen, FileText, Video, Sparkles, ShieldCheck, ShoppingBag } from "lucide-react";

export default function LuaranProgram() {
  return (
    <section className="py-12 bg-gradient-to-br from-navy-950 to-primary-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden my-12">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-sunset-300">
            <Award className="w-4 h-4" /> Target Luaran Resmi Program
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mt-3">
            Luaran Wajib &amp; Luaran Tambahan Program
          </h2>
          <p className="text-white/70 text-sm mt-2 max-w-2xl mx-auto">
            Bukti nyata dan transparansi target hasil pengabdian masyarakat UKM-F Penalaran AcSES FEB UNAIR di Desa Banyusangka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Luaran Wajib */}
          <FadeIn direction="left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-sunset-500/20 border border-sunset-500/40 flex items-center justify-center text-sunset-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Luaran Wajib (5 Item)</h3>
                  <p className="text-xs text-white/50">Target komitmen utama program</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <span className="text-sunset-400 font-bold">•</span>
                  <span>Sub laporan akhir kegiatan pengabdian masyarakat</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunset-400 font-bold">•</span>
                  <span>Akun media sosial resmi (Instagram &amp; TikTok Shop)</span>
                </li>
                <li className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/15">
                  <BookOpen className="w-5 h-5 text-sunset-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Buku Bilingual (Indonesia-Madura)</strong>
                    <span className="text-xs text-white/60">Buku pengembangan kapasitas masyarakat pesisir dwi-bahasa</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Video className="w-4 h-4 text-sunset-400 flex-shrink-0 mt-0.5" />
                  <span>Video dokumenter resmi di kanal FEB UNAIR &amp; Ormawa</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunset-400 font-bold">•</span>
                  <span>Poster program &amp; profil hasil kegiatan pengabdian</span>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Luaran Tambahan */}
          <FadeIn direction="right">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-500/40 flex items-center justify-center text-primary-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Luaran Tambahan (6 Item)</h3>
                  <p className="text-xs text-white/50">Nilai tambah &amp; dampak keberlanjutan</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <span className="text-primary-300 font-bold">•</span>
                  <span>Publikasi jurnal pengabdian masyarakat terakreditasi</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShoppingBag className="w-4 h-4 text-primary-300 flex-shrink-0 mt-0.5" />
                  <span>3 Varian produk olahan bersertifikasi siap pasar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-300 font-bold">•</span>
                  <span>E-Catalog digital + akun e-commerce aktif</span>
                </li>
                <li className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/15">
                  <FileText className="w-5 h-5 text-primary-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">MoU Mitra &amp; Draf Perdes</strong>
                    <span className="text-xs text-white/60">Dokumen kerja sama pemasaran + draf Peraturan Desa</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-300 font-bold">•</span>
                  <span>Publikasi artikel ilmiah pada konferensi/media nasional</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-primary-300 flex-shrink-0 mt-0.5" />
                  <span>HKI (Hak Kekayaan Intelektual) untuk modul pelatihan</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
