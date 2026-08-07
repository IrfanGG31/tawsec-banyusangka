import { createServerSupabaseClient } from "./server";
import anggotaDefault from "@/data/anggota.json";
import produkDefault from "@/data/produk.json";

export interface IdentitasSettings {
  nama_program: string;
  sub_brand: string;
  tahun: string;
  penyelenggara: string;
  wa_number: string;
  wa_template: string;
  email: string;
}

export interface HeroSettings {
  judul: string;
  subtitle: string;
  cta1_label: string;
  cta1_href: string;
  cta2_label: string;
  cta2_href: string;
  bg_image: string;
}

export interface TestimonialSettings {
  quote: string;
  nama: string;
  jabatan: string;
  foto: string;
}

export interface FotoTimSettings {
  foto1_url: string;
  foto1_caption: string;
  foto1_tag: string;
  foto2_url: string;
  foto2_caption: string;
  foto2_tag: string;
}

export interface SocialMediaSettings {
  instagram: string;
  tiktok: string;
  youtube: string;
  shopee: string;
  tokopedia: string;
}

export interface AnggotaMember {
  nama: string;
  prodi: string;
  peran: string;
  foto: string;
}

export interface ChallengeSettings {
  judul_challenge: string;
  sub_judul: string;
  deskripsi_challenge: string;
  info_praktik: string;
  kontak_fasilitator: string;
  link_materi_tutor: string;
  ref_brand_image: string;
  ref_video_image: string;
  // Live Wall settings
  live_wall_aktif: boolean;
  live_wall_judul: string;
  live_wall_deskripsi: string;
  kode_akses_event: string;
  form_upload_aktif: boolean;
}

export interface VarianItem {
  ukuran: string;
  harga: number;
}

export interface ProdukItem {
  id: string;
  nama: string;
  kategori: string;
  tagline: string;
  deskripsi: string;
  varian: VarianItem[];
  komposisi: string[];
  cara_penyimpanan: string;
  produsen: string;
  status_halal: string;
  berat_bersih: string;
  foto: string[];
  kontak_wa: string;
  pesan_wa: string;
  tersedia: boolean;
}

export interface AllSettings {
  identitas: IdentitasSettings;
  hero: HeroSettings;
  testimonial: TestimonialSettings;
  foto_tim: FotoTimSettings;
  social_media: SocialMediaSettings;
  anggota: AnggotaMember[];
  challenge: ChallengeSettings;
  produk: ProdukItem[];
}

export const defaultSettings: AllSettings = {
  identitas: {
    nama_program: "TAWSEC",
    sub_brand: "Banyusangka",
    tahun: "2026",
    penyelenggara: "UKM-F Penalaran AcSES FEB Universitas Airlangga",
    wa_number: "6285852278026",
    wa_template: "Halo, saya ingin memesan produk TAWSEC Banyusangka.",
    email: "",
  },
  hero: {
    judul: "Transformasi Olahan Laut & Ekonomi Pesisir Banyusangka",
    subtitle:
      "Inovasi Zero Waste pengolahan ikan layang & tongkol oleh perempuan nelayan Desa Banyusangka. Mengubah sisa tangkapan melimpah menjadi produk olahan bernilai tambah tinggi.",
    cta1_label: "Lihat Katalog Produk",
    cta1_href: "/katalog",
    cta2_label: "Tentang Program TAWSEC",
    cta2_href: "/program-tawsec",
    bg_image: "/images/hero-banyusangka-hd.png",
  },
  testimonial: {
    quote:
      "Pendampingan dari mahasiswa Universitas Airlangga ini sangat membantu ibu-ibu nelayan kami mengolah hasil laut menjadi produk bernilai tinggi yang siap bersaing.",
    nama: "H. Abd. Syukur",
    jabatan: "Kepala Desa Banyusangka, Kec. Tanjung Bumi, Bangkalan",
    foto: "/images/galeri/hero_desa_1784057776565.png",
  },
  foto_tim: {
    foto1_url: "/images/anggota/tim-group-1.jpg",
    foto1_caption: "Tim TAWSEC — Building Ideas, Creating Impact",
    foto1_tag: "TAWSEC Company",
    foto2_url: "/images/anggota/tim-group-2.jpg",
    foto2_caption: "Terjun Langsung ke Pasar Ikan Banyusangka",
    foto2_tag: "Pasar Ikan Desa Banyusangka, Bangkalan",
  },
  social_media: {
    instagram: "https://instagram.com/tawsec.banyusangka",
    tiktok: "",
    youtube: "",
    shopee: "",
    tokopedia: "",
  },
  anggota: anggotaDefault as AnggotaMember[],
  challenge: {
    judul_challenge: "Challenge Digitalisasi & Branding",
    sub_judul: "Media Panduan Praktik Lapangan (Offline)",
    deskripsi_challenge: "Tunjukkan kreativitas timmu dalam membangun brand dan membuat konten promosi produk olahan laut Desa Banyusangka secara langsung di lapangan!",
    info_praktik: "Praktik langsung (offline) dilaksanakan di Balai Desa Banyusangka didampingi oleh Fasilitator TAWSEC. Setiap tim mengolah 1 produk studi kasus.",
    kontak_fasilitator: "6285852278026",
    link_materi_tutor: "https://canva.link/de2smsdgdgkp0so",
    ref_brand_image: "/images/challenge/brand-makeover-ref.jpg",
    ref_video_image: "/images/challenge/video-promosi-ref.jpg",
    live_wall_aktif: true,
    live_wall_judul: "Live Showcase Wall",
    live_wall_deskripsi: "Karya peserta Challenge Digitalisasi & Branding ditampilkan secara realtime. Upload bukti karya kamu dan lihat hasilnya langsung di sini!",
    kode_akses_event: "TAWSEC2026",
    form_upload_aktif: true,
  },
  produk: produkDefault as ProdukItem[],
};

export async function getSiteSettings(): Promise<AllSettings> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return defaultSettings;

    const { data, error } = await supabase.from("site_settings").select("key, value");
    if (error || !data || data.length === 0) return defaultSettings;

    const settings: AllSettings = { ...defaultSettings };

    data.forEach((row: { key: string; value: unknown }) => {
      if (row.key === "identitas") settings.identitas = { ...defaultSettings.identitas, ...(row.value as Partial<IdentitasSettings>) };
      if (row.key === "hero") settings.hero = { ...defaultSettings.hero, ...(row.value as Partial<HeroSettings>) };
      if (row.key === "testimonial") settings.testimonial = { ...defaultSettings.testimonial, ...(row.value as Partial<TestimonialSettings>) };
      if (row.key === "foto_tim") settings.foto_tim = { ...defaultSettings.foto_tim, ...(row.value as Partial<FotoTimSettings>) };
      if (row.key === "social_media") settings.social_media = { ...defaultSettings.social_media, ...(row.value as Partial<SocialMediaSettings>) };
      if (row.key === "anggota" && Array.isArray(row.value) && row.value.length > 0) settings.anggota = row.value as AnggotaMember[];
      if (row.key === "challenge") settings.challenge = { ...defaultSettings.challenge, ...(row.value as Partial<ChallengeSettings>) };
      if (row.key === "produk" && Array.isArray(row.value) && row.value.length > 0) settings.produk = row.value as ProdukItem[];
    });

    return settings;
  } catch {
    return defaultSettings;
  }
}
