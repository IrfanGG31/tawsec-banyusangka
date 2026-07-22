import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import desaData from "@/data/desa.json";
import { MapPin, Users, Fish, Building, BookOpen, Heart, Sparkles, Anchor, Waves } from "lucide-react";
import LocalHeroes from "@/components/program/LocalHeroes";

export const metadata: Metadata = {
  title: "Tentang Desa Banyusangka",
  description:
    "Profil resmi Desa Banyusangka — kondisi geografis, data kependudukan, mata pencaharian nelayan, dan potensi sumberdaya perikanan di Kecamatan Tanjung Bumi, Bangkalan, Madura.",
};

function SectionTitle({ sub, title, desc }: { sub: string; title: string; desc?: string }) {
  return (
    <div className="mb-10">
      <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-widest mb-2">
        {sub}
      </span>
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">{title}</h2>
      {desc && <p className="text-navy-500 mt-2 max-w-xl">{desc}</p>}
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100 last:border-0 gap-1">
      <span className="text-navy-500 text-sm sm:w-48 flex-shrink-0">{label}</span>
      <span className="font-semibold text-navy-800">{value}</span>
    </div>
  );
}

export default function TentangDesaPage() {
  const desa = desaData;

  return (
    <div className="pt-16">
      {/* ===== MAJESTIC GRAND HERO BANNER: TENTANG DESA ===== */}
      <section className="relative min-h-[420px] sm:min-h-[460px] flex items-center justify-center overflow-hidden bg-navy-950 text-white border-b border-slate-800">
        {/* Background Coastal Ocean Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/galeri/nelayan-1.png"
            alt="Pesisir dan Perahu Nelayan Desa Banyusangka"
            fill
            className="object-cover object-center brightness-90 contrast-110 scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-black/30" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 py-16 sm:py-20 text-center space-y-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-extrabold text-sky-200 uppercase tracking-wide shadow-lg">
              <MapPin className="w-4 h-4 text-sky-400" />
              Kab. Bangkalan → Kec. Tanjung Bumi → Desa Banyusangka
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white leading-tight mt-4 drop-shadow-xl">
              Profil &amp; Potensi Maritim <span className="text-gradient-ocean font-serif">Desa Banyusangka</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mt-4 drop-shadow font-normal">
              Mengenal desa pesisir di ujung utara Pulau Madura — pusat pendaratan ikan tradisional melimpah, komunitas nelayan tangguh, dan potensi pengolahan olahan laut berkelanjutan.
            </p>

            {/* Quick Feature Chips Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-bold text-sky-300 shadow">
                <Users className="w-4 h-4 text-amber-400" /> 4.800+ Jiwa Penduduk
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-300 shadow">
                <Anchor className="w-4 h-4 text-emerald-400" /> 1.200+ Nelayan Aktif
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-bold text-cyan-300 shadow">
                <Fish className="w-4 h-4 text-cyan-400" /> 85+ Ton Tangkapan/Bulan
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-bold text-orange-300 shadow">
                <Waves className="w-4 h-4 text-sunset-400" /> PPI Banyusangka
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* Geografis */}
        <FadeIn>
          <section>
            <SectionTitle sub="Kondisi Wilayah" title="Geografis Desa Banyusangka" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-500" /> Data Wilayah
                </h3>
                <DataRow label="Nama Desa" value={desa.nama} />
                <DataRow label="Kecamatan" value={desa.kecamatan} />
                <DataRow label="Kabupaten" value={desa.kabupaten} />
                <DataRow label="Provinsi" value={desa.provinsi} />
                <DataRow label="Luas Wilayah" value={`${desa.luas_km2} km²`} />
                <DataRow
                  label="Koordinat"
                  value={`${desa.koordinat.lintang}, ${desa.koordinat.bujur}`}
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sunset-500" /> Batas Wilayah
                </h3>
                <DataRow label="Sebelah Utara" value={desa.batas_wilayah.utara} />
                <DataRow label="Sebelah Selatan" value={desa.batas_wilayah.selatan} />
                <DataRow label="Sebelah Timur" value={desa.batas_wilayah.timur} />
                <DataRow label="Sebelah Barat" value={desa.batas_wilayah.barat} />

                <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                  <p className="text-primary-700 text-sm font-semibold mb-1">📍 Lokasi di Peta</p>
                  <p className="text-primary-600 text-xs">{desa.koordinat.lintang}, {desa.koordinat.bujur}</p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Demografi */}
        <FadeIn>
          <section>
            <SectionTitle
              sub="Kependudukan"
              title="Data Penduduk per Dusun"
              desc={`Total ${desa.jumlah_penduduk_tetap.toLocaleString("id-ID")} jiwa tersebar di ${desa.jumlah_dusun} dusun. ${desa.catatan_data}`}
            />
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-ocean text-white">
                    <tr>
                      <th className="text-left px-6 py-4 font-semibold">Dusun</th>
                      <th className="text-right px-6 py-4 font-semibold">Laki-laki</th>
                      <th className="text-right px-6 py-4 font-semibold">Perempuan</th>
                      <th className="text-right px-6 py-4 font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {desa.dusun.map((d, i) => (
                      <tr key={d.nama} className={i % 2 === 0 ? "bg-white" : "bg-primary-50/30"}>
                        <td className="px-6 py-4 font-medium text-navy-800">{d.nama}</td>
                        <td className="px-6 py-4 text-right text-navy-600">{d.laki.toLocaleString("id-ID")}</td>
                        <td className="px-6 py-4 text-right text-navy-600">{d.perempuan.toLocaleString("id-ID")}</td>
                        <td className="px-6 py-4 text-right font-bold text-primary-700">{d.total.toLocaleString("id-ID")}</td>
                      </tr>
                    ))}
                    <tr className="bg-navy-900 text-white">
                      <td className="px-6 py-4 font-bold">Total</td>
                      <td className="px-6 py-4 text-right font-bold">
                        {desa.dusun.reduce((a, d) => a + d.laki, 0).toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-right font-bold">
                        {desa.dusun.reduce((a, d) => a + d.perempuan, 0).toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-emerald-300">
                        {desa.jumlah_penduduk_tetap.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Local Heroes (Aruna Benchmark Storytelling) */}
        <LocalHeroes />

        {/* Mata Pencaharian */}
        <FadeIn>
          <section>
            <SectionTitle
              sub="Sosial & Ekonomi"
              title="Mata Pencaharian Penduduk"
              desc="Mayoritas penduduk Desa Banyusangka berprofesi sebagai nelayan yang mengandalkan hasil tangkapan ikan di Laut Jawa."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-sunset-500 text-white">
                      <tr>
                        <th className="text-left px-6 py-4 font-semibold">Pekerjaan</th>
                        <th className="text-right px-6 py-4 font-semibold">Jumlah</th>
                        <th className="text-right px-6 py-4 font-semibold">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {desa.mata_pencaharian.map((m, i) => (
                        <tr key={m.pekerjaan} className={i % 2 === 0 ? "bg-white" : "bg-orange-50/30"}>
                          <td className="px-6 py-4 font-medium text-navy-800">{m.pekerjaan}</td>
                          <td className="px-6 py-4 text-right text-navy-600">{m.jumlah}</td>
                          <td className="px-6 py-4 text-right font-bold text-sunset-600">{m.persen}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Visual bar */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-navy-800 mb-5">Komposisi Mata Pencaharian</h3>
                {desa.mata_pencaharian.map((m) => (
                  <div key={m.pekerjaan} className="mb-4">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-navy-700">{m.pekerjaan}</span>
                      <span className="font-bold text-sunset-600">{m.persen}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-sunset rounded-full"
                        style={{ width: `${m.persen}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Pendidikan */}
        <FadeIn>
          <section>
            <SectionTitle sub="Sumber Daya Manusia" title="Tingkat Pendidikan Penduduk" />
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-emerald-600 text-white">
                    <tr>
                      <th className="text-left px-6 py-4 font-semibold">Tingkat Pendidikan</th>
                      <th className="text-right px-6 py-4 font-semibold">Jumlah (jiwa)</th>
                      <th className="text-left px-6 py-4 font-semibold">Proporsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {desa.pendidikan.map((p, i) => {
                      const total = desa.pendidikan.reduce((a, x) => a + x.jumlah, 0);
                      const pct = Math.round((p.jumlah / total) * 100);
                      return (
                        <tr key={p.tingkat} className={i % 2 === 0 ? "bg-white" : "bg-emerald-50/30"}>
                          <td className="px-6 py-4 font-medium text-navy-800">{p.tingkat}</td>
                          <td className="px-6 py-4 text-right text-navy-600">{p.jumlah.toLocaleString("id-ID")}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2.5 bg-gray-100 rounded-full max-w-32">
                                <div
                                  className="h-full bg-emerald-500 rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-emerald-700 font-semibold text-xs">{pct}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Keagamaan */}
        <FadeIn>
          <section>
            <SectionTitle sub="Kehidupan Sosial" title="Kondisi Keagamaan" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 text-center">
                <div className="text-5xl mb-3">🕌</div>
                <p className="font-bold text-navy-800 text-2xl">100%</p>
                <p className="text-navy-600 text-sm">Penduduk beragama Islam</p>
              </div>
              {desa.agama.sarana_ibadah.map((s) => (
                <div
                  key={s.jenis}
                  className="bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-200 rounded-2xl p-6 text-center"
                >
                  <div className="text-5xl mb-3">{s.jenis === "Masjid" ? "🕌" : "🏛️"}</div>
                  <p className="font-bold text-primary-700 text-4xl">{s.jumlah}</p>
                  <p className="text-navy-600 text-sm">{s.jenis}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Potensi Perikanan */}
        <FadeIn>
          <section>
            <SectionTitle
              sub="Kekayaan Alam"
              title="Potensi Sumberdaya Perikanan"
              desc="Laut Jawa di sisi utara Desa Banyusangka menjadi sumber penghidupan utama warga sekaligus potensi besar yang siap dikembangkan."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { icon: "🐟", label: "Ikan Utama", value: "Layang & Tongkol", sub: "Hasil tangkapan dominan" },
                { icon: "⚖️", label: "Produksi Harian", value: "100–300 kg", sub: "> 1 ton saat puncak musim" },
                { icon: "⚠️", label: "Food Loss", value: "20–35%", sub: "Saat panen raya berlimpah" },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <p className="text-navy-500 text-sm mb-1">{item.label}</p>
                  <p className="font-bold text-navy-900 text-xl">{item.value}</p>
                  <p className="text-navy-400 text-xs mt-1">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* PPI Info */}
            <div className="bg-gradient-to-r from-primary-900 to-navy-900 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">🏗️</div>
                <div>
                  <h3 className="font-serif font-bold text-xl mb-2">{desa.perikanan.fasilitas.nama}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white/60">Tipe</p>
                      <p className="font-semibold text-primary-300">Tipe {desa.perikanan.fasilitas.tipe}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Berdiri</p>
                      <p className="font-semibold text-primary-300">{desa.perikanan.fasilitas.tahun_berdiri}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Pengelola</p>
                      <p className="font-semibold text-primary-300">{desa.perikanan.fasilitas.pengelola}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Google Maps */}
        <FadeIn>
          <section>
            <SectionTitle sub="Lokasi" title="Peta Desa Banyusangka" />
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.5!2d113.02702!3d-6.88498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7d0c6a8a4e7d1%3A0x1234567890abcdef!2sBanyusangka%2C%20Tanjung%20Bumi%2C%20Bangkalan%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1720000000000!5m2!1sen!2sid"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Desa Banyusangka"
              />
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
