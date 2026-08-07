"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Settings,
  Image as ImageIcon,
  MessageSquare,
  Users,
  Link as LinkIcon,
  ChevronDown,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Save,
  Info,
  Target,
  ShoppingBag,
  Package
} from "lucide-react";
import produkDefault from "@/data/produk.json";
import type { ProdukItem } from "@/lib/supabase/settings";

interface SetupTabProps {
  dbConnected: boolean;
}

interface ToastMessage {
  message: string;
  type: "success" | "error";
}

interface Member {
  id: string;
  nama: string;
  prodi: string;
  peran: string;
  foto: string;
}

// --- Top-level Subcomponents (Defined OUTSIDE parent to prevent focus loss & unmounting on state updates) ---

function InputGroup({ label, id, value, onChange, placeholder, type = "text" }: { label: string; id: string; value: string | number; onChange: (val: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
      />
    </div>
  );
}

function TextareaGroup({ label, id, value, onChange, placeholder, rows = 3 }: { label: string; id: string; value: string; onChange: (val: string) => void; placeholder?: string; rows?: number }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      <textarea
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
      />
    </div>
  );
}

function ImageUploader({
  label,
  folder,
  url,
  onUrlChange,
  onUpload,
  showToast
}: {
  label: string;
  folder: string;
  url: string;
  onUrlChange: (url: string) => void;
  onUpload: (file: File, folder: string) => Promise<string | null>;
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadedUrl = await onUpload(file, folder);
    setIsUploading(false);

    if (uploadedUrl) {
      onUrlChange(uploadedUrl);
      showToast("Gambar berhasil diunggah", "success");
    } else {
      showToast("Gagal mengunggah gambar", "error");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
        {url ? (
          <img src={url} alt="Preview" className="h-10 w-10 rounded-lg object-cover border border-slate-700 bg-slate-900" />
        ) : (
          <div className="h-10 w-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500">
            <ImageIcon className="w-5 h-5" />
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-xl border border-slate-700 transition-colors disabled:opacity-50 shrink-0"
        >
          <Upload className="w-4 h-4" />
          {isUploading ? "Mengunggah..." : "Pilih File"}
        </button>

        <input
          type="text"
          value={url ?? ""}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="Atau masukkan URL gambar..."
          className="flex-1 min-w-[200px] bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}

function AccordionSection({
  id,
  title,
  description,
  icon: Icon,
  children,
  isOpen,
  onToggle,
  onSave,
  isSaving
}: {
  id: string;
  title: string;
  description: string;
  icon: any;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onSave: () => void;
  isSaving?: boolean;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/20">
            <Icon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white text-sm">{title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{description}</p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="p-5 pt-0 border-t border-slate-800">
          <div className="space-y-4 py-4">
            {children}
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Component ---

export default function SetupTab({ dbConnected }: SetupTabProps) {
  const [openSection, setOpenSection] = useState<string | null>("identitas");
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingState, setSavingState] = useState<{ [key: string]: boolean }>({});

  // States for each section
  const [identitas, setIdentitas] = useState({
    nama_program: "TAWSEC",
    sub_brand: "Banyusangka",
    tahun: "2026",
    penyelenggara: "UKM-F Penalaran AcSES FEB Universitas Airlangga",
    wa_number: "6285852278026",
    wa_template: "",
    email: "",
  });

  const [hero, setHero] = useState({
    judul: "",
    subtitle: "",
    cta1_label: "",
    cta1_href: "",
    cta2_label: "",
    cta2_href: "",
    bg_image: "",
  });

  const [testimonial, setTestimonial] = useState({
    quote: "",
    nama: "",
    jabatan: "",
    foto: "",
  });

  const [fotoTim, setFotoTim] = useState({
    foto1_url: "",
    foto1_caption: "",
    foto1_tag: "",
    foto2_url: "",
    foto2_caption: "",
    foto2_tag: "",
  });

  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    tiktok: "",
    youtube: "",
    shopee: "",
    tokopedia: "",
  });

  const [anggota, setAnggota] = useState<Member[]>([]);

  const [challenge, setChallenge] = useState({
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
  });

  const [produkList, setProdukList] = useState<ProdukItem[]>(produkDefault as ProdukItem[]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const loadSettings = async () => {
      if (!dbConnected) {
        setLoading(false);
        return;
      }
      
      const supabase = createClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.from("site_settings").select("*");
      
      if (!error && data) {
        data.forEach((row: { key: string; value: any }) => {
          switch (row.key) {
            case "identitas":
              setIdentitas((prev) => ({ ...prev, ...row.value }));
              break;
            case "hero":
              setHero((prev) => ({ ...prev, ...row.value }));
              break;
            case "testimonial":
              setTestimonial((prev) => ({ ...prev, ...row.value }));
              break;
            case "foto_tim":
              setFotoTim((prev) => ({ ...prev, ...row.value }));
              break;
            case "social_media":
              setSocialMedia((prev) => ({ ...prev, ...row.value }));
              break;
            case "anggota":
              if (Array.isArray(row.value)) {
                setAnggota(row.value);
              }
              break;
            case "challenge":
              setChallenge((prev) => ({ ...prev, ...row.value }));
              break;
            case "produk":
              if (Array.isArray(row.value) && row.value.length > 0) {
                setProdukList(row.value);
              }
              break;
          }
        });
      }
      setLoading(false);
    };

    loadSettings();
  }, [dbConnected]);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const uploadImage = async (file: File, folder: string): Promise<string | null> => {
    const supabase = createClient();
    if (!supabase) return null;
    
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
    
    const { error } = await supabase.storage
      .from("galeri")
      .upload(fileName, file, { cacheControl: "3600", upsert: true });
      
    if (error) {
      console.error("Upload error:", error);
      return null;
    }
    
    const { data } = supabase.storage.from("galeri").getPublicUrl(fileName);
    return data?.publicUrl || null;
  };

  const saveSetting = async (key: string, value: any) => {
    setSavingState((prev) => ({ ...prev, [key]: true }));
    const supabase = createClient();
    
    if (!supabase) {
      showToast("Gagal menyimpan: Supabase client tidak tersedia", "error");
      setSavingState((prev) => ({ ...prev, [key]: false }));
      return false;
    }

    const { error } = await supabase.from("site_settings").upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );

    setSavingState((prev) => ({ ...prev, [key]: false }));

    if (error) {
      console.error(`Error saving ${key}:`, error);
      showToast(`Gagal menyimpan pengaturan ${key}`, "error");
      return false;
    }

    showToast(`Pengaturan ${key} berhasil disimpan`, "success");
    return true;
  };

  if (!dbConnected) {
    return (
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4 text-slate-300">
        <Info className="w-6 h-6 text-amber-500" />
        <p>Koneksi database tidak tersedia. Harap periksa pengaturan Supabase Anda.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-sky-500 animate-spin" />
          <p className="text-sm">Memuat pengaturan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 relative">
      {toast && (
        <div className="fixed top-24 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${
            toast.type === "success" 
              ? "bg-emerald-950/90 border-emerald-900 text-emerald-400" 
              : "bg-rose-950/90 border-rose-900 text-rose-400"
          }`}>
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Section 1: Identitas & Kontak */}
      <AccordionSection
        id="identitas"
        title="Identitas & Kontak Situs"
        description="Pengaturan nama program, tahun, penyelenggara, dan info kontak"
        icon={Settings}
        isOpen={openSection === "identitas"}
        onToggle={() => toggleSection("identitas")}
        onSave={() => saveSetting("identitas", identitas)}
        isSaving={savingState["identitas"]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup
            label="Nama Program"
            id="nama_program"
            value={identitas.nama_program}
            onChange={(v: string) => setIdentitas({ ...identitas, nama_program: v })}
          />
          <InputGroup
            label="Sub Brand"
            id="sub_brand"
            value={identitas.sub_brand}
            onChange={(v: string) => setIdentitas({ ...identitas, sub_brand: v })}
          />
          <InputGroup
            label="Tahun Program"
            id="tahun"
            value={identitas.tahun}
            onChange={(v: string) => setIdentitas({ ...identitas, tahun: v })}
          />
          <InputGroup
            label="Penyelenggara"
            id="penyelenggara"
            value={identitas.penyelenggara}
            onChange={(v: string) => setIdentitas({ ...identitas, penyelenggara: v })}
          />
          <InputGroup
            label="Email Kontak"
            id="email"
            value={identitas.email}
            onChange={(v: string) => setIdentitas({ ...identitas, email: v })}
          />
          <InputGroup
            label="Nomor WhatsApp Admin (Format 628xxx)"
            id="wa_number"
            value={identitas.wa_number}
            onChange={(v: string) => setIdentitas({ ...identitas, wa_number: v })}
          />
        </div>
        <TextareaGroup
          label="Template Pesan WhatsApp Otomatis"
          id="wa_template"
          value={identitas.wa_template}
          onChange={(v: string) => setIdentitas({ ...identitas, wa_template: v })}
        />
      </AccordionSection>

      {/* Section 2: Hero Banner */}
      <AccordionSection
        id="hero"
        title="Hero Banner Beranda"
        description="Konten utama pada bagian atas halaman beranda (Headline & Gambar)"
        icon={ImageIcon}
        isOpen={openSection === "hero"}
        onToggle={() => toggleSection("hero")}
        onSave={() => saveSetting("hero", hero)}
        isSaving={savingState["hero"]}
      >
        <InputGroup
          label="Judul Utama (H1)"
          id="hero_judul"
          value={hero.judul}
          onChange={(v: string) => setHero({ ...hero, judul: v })}
        />
        <TextareaGroup
          label="Sub-judul / Deskripsi Hero"
          id="hero_subtitle"
          value={hero.subtitle}
          onChange={(v: string) => setHero({ ...hero, subtitle: v })}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup
            label="Tombol 1 Label"
            id="cta1_label"
            value={hero.cta1_label}
            onChange={(v: string) => setHero({ ...hero, cta1_label: v })}
          />
          <InputGroup
            label="Tombol 1 Link (HREF)"
            id="cta1_href"
            value={hero.cta1_href}
            onChange={(v: string) => setHero({ ...hero, cta1_href: v })}
          />
          <InputGroup
            label="Tombol 2 Label"
            id="cta2_label"
            value={hero.cta2_label}
            onChange={(v: string) => setHero({ ...hero, cta2_label: v })}
          />
          <InputGroup
            label="Tombol 2 Link (HREF)"
            id="cta2_href"
            value={hero.cta2_href}
            onChange={(v: string) => setHero({ ...hero, cta2_href: v })}
          />
        </div>
        <ImageUploader
          label="Gambar Background Hero"
          folder="hero"
          url={hero.bg_image}
          onUrlChange={(url) => setHero({ ...hero, bg_image: url })}
          onUpload={uploadImage}
          showToast={showToast}
        />
      </AccordionSection>

      {/* Section 3: Testimonial / Sambutan */}
      <AccordionSection
        id="testimonial"
        title="Testimonial & Kata Sambutan"
        description="Quote atau sambutan tokoh (Misal: Kepala Desa)"
        icon={MessageSquare}
        isOpen={openSection === "testimonial"}
        onToggle={() => toggleSection("testimonial")}
        onSave={() => saveSetting("testimonial", testimonial)}
        isSaving={savingState["testimonial"]}
      >
        <TextareaGroup
          label="Kutipan / Quote"
          id="testi_quote"
          value={testimonial.quote}
          onChange={(v: string) => setTestimonial({ ...testimonial, quote: v })}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup
            label="Nama Tokoh"
            id="testi_nama"
            value={testimonial.nama}
            onChange={(v: string) => setTestimonial({ ...testimonial, nama: v })}
          />
          <InputGroup
            label="Jabatan / Peran"
            id="testi_jabatan"
            value={testimonial.jabatan}
            onChange={(v: string) => setTestimonial({ ...testimonial, jabatan: v })}
          />
        </div>
        <ImageUploader
          label="Foto Tokoh"
          folder="testimonial"
          url={testimonial.foto}
          onUrlChange={(url) => setTestimonial({ ...testimonial, foto: url })}
          onUpload={uploadImage}
          showToast={showToast}
        />
      </AccordionSection>

      {/* Section 4: Dokumentasi Lapangan */}
      <AccordionSection
        id="foto_tim"
        title="Dokumentasi Lapangan"
        description="Foto-foto kegiatan tim atau mahasiswa di lapangan"
        icon={ImageIcon}
        isOpen={openSection === "foto_tim"}
        onToggle={() => toggleSection("foto_tim")}
        onSave={() => saveSetting("foto_tim", fotoTim)}
        isSaving={savingState["foto_tim"]}
      >
        <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
          <h4 className="font-medium text-white text-xs uppercase tracking-wider text-sky-400">Foto Lapangan 1</h4>
          <ImageUploader
            label="Upload Foto 1"
            folder="tim"
            url={fotoTim.foto1_url}
            onUrlChange={(url) => setFotoTim({ ...fotoTim, foto1_url: url })}
            onUpload={uploadImage}
            showToast={showToast}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              label="Caption Foto 1"
              id="foto1_caption"
              value={fotoTim.foto1_caption}
              onChange={(v: string) => setFotoTim({ ...fotoTim, foto1_caption: v })}
            />
            <InputGroup
              label="Tag / Lokasi 1"
              id="foto1_tag"
              value={fotoTim.foto1_tag}
              onChange={(v: string) => setFotoTim({ ...fotoTim, foto1_tag: v })}
            />
          </div>
        </div>

        <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800 mt-4">
          <h4 className="font-medium text-white text-xs uppercase tracking-wider text-sky-400">Foto Lapangan 2</h4>
          <ImageUploader
            label="Upload Foto 2"
            folder="tim"
            url={fotoTim.foto2_url}
            onUrlChange={(url) => setFotoTim({ ...fotoTim, foto2_url: url })}
            onUpload={uploadImage}
            showToast={showToast}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              label="Caption Foto 2"
              id="foto2_caption"
              value={fotoTim.foto2_caption}
              onChange={(v: string) => setFotoTim({ ...fotoTim, foto2_caption: v })}
            />
            <InputGroup
              label="Tag / Lokasi 2"
              id="foto2_tag"
              value={fotoTim.foto2_tag}
              onChange={(v: string) => setFotoTim({ ...fotoTim, foto2_tag: v })}
            />
          </div>
        </div>
      </AccordionSection>

      {/* Section 5: Media Sosial */}
      <AccordionSection
        id="social_media"
        title="Media Sosial &amp; Eksternal"
        description="Tautan menuju halaman profil media sosial dan toko online"
        icon={LinkIcon}
        isOpen={openSection === "social_media"}
        onToggle={() => toggleSection("social_media")}
        onSave={() => saveSetting("social_media", socialMedia)}
        isSaving={savingState["social_media"]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup
            label="URL Instagram"
            id="instagram"
            value={socialMedia.instagram}
            onChange={(v: string) => setSocialMedia({ ...socialMedia, instagram: v })}
          />
          <InputGroup
            label="URL TikTok"
            id="tiktok"
            value={socialMedia.tiktok}
            onChange={(v: string) => setSocialMedia({ ...socialMedia, tiktok: v })}
          />
          <InputGroup
            label="URL YouTube"
            id="youtube"
            value={socialMedia.youtube}
            onChange={(v: string) => setSocialMedia({ ...socialMedia, youtube: v })}
          />
          <InputGroup
            label="URL Shopee"
            id="shopee"
            value={socialMedia.shopee}
            onChange={(v: string) => setSocialMedia({ ...socialMedia, shopee: v })}
          />
          <InputGroup
            label="URL Tokopedia"
            id="tokopedia"
            value={socialMedia.tokopedia}
            onChange={(v: string) => setSocialMedia({ ...socialMedia, tokopedia: v })}
          />
        </div>
      </AccordionSection>

      {/* Section 6: Anggota Tim */}
      <AccordionSection
        id="anggota"
        title="Anggota Tim Mahasiswa"
        description="Daftar pengurus atau mahasiswa yang tergabung dalam program"
        icon={Users}
        isOpen={openSection === "anggota"}
        onToggle={() => toggleSection("anggota")}
        onSave={() => saveSetting("anggota", anggota)}
        isSaving={savingState["anggota"]}
      >
        <div className="space-y-6">
          {anggota.map((member, index) => (
            <div key={member.id || index} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 relative">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-semibold text-white text-xs uppercase tracking-wider text-sky-400">
                  Anggota #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setAnggota(anggota.filter((_, i) => i !== index))}
                  className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Hapus Anggota"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InputGroup
                  label="Nama Lengkap"
                  id={`mem_nama_${index}`}
                  value={member.nama}
                  onChange={(v: string) => {
                    const newAnggota = [...anggota];
                    newAnggota[index].nama = v;
                    setAnggota(newAnggota);
                  }}
                />
                <InputGroup
                  label="Program Studi / Fakultas"
                  id={`mem_prodi_${index}`}
                  value={member.prodi}
                  onChange={(v: string) => {
                    const newAnggota = [...anggota];
                    newAnggota[index].prodi = v;
                    setAnggota(newAnggota);
                  }}
                />
                <InputGroup
                  label="Peran Dalam Tim"
                  id={`mem_peran_${index}`}
                  value={member.peran}
                  onChange={(v: string) => {
                    const newAnggota = [...anggota];
                    newAnggota[index].peran = v;
                    setAnggota(newAnggota);
                  }}
                />
                <div className="md:col-span-2 mt-2">
                  <ImageUploader
                    label="Foto Anggota"
                    folder="anggota"
                    url={member.foto}
                    onUrlChange={(url) => {
                      const newAnggota = [...anggota];
                      newAnggota[index].foto = url;
                      setAnggota(newAnggota);
                    }}
                    onUpload={uploadImage}
                    showToast={showToast}
                  />
                </div>
              </div>
            </div>
          ))}

          {anggota.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
              Belum ada anggota tim. Klik tombol di bawah untuk menambahkan.
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setAnggota([
                ...anggota,
                {
                  id: Math.random().toString(36).substring(2, 9),
                  nama: "",
                  prodi: "",
                  peran: "",
                  foto: "",
                }
              ]);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 border border-slate-700 border-dashed rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Anggota
          </button>
        </div>
      </AccordionSection>

      {/* Section 7: Challenge & Praktik Offline */}
      <AccordionSection
        id="challenge"
        title="Challenge &amp; Praktik Offline Pilar 3"
        description="Atur judul, instruksi praktik langsung, info fasilitator, dan foto visualisasi referensi"
        icon={Target}
        isOpen={openSection === "challenge"}
        onToggle={() => toggleSection("challenge")}
        onSave={() => saveSetting("challenge", challenge)}
        isSaving={savingState["challenge"]}
      >
        <div className="space-y-4">
          <InputGroup
            id="ch_judul"
            label="Judul Challenge"
            value={challenge.judul_challenge}
            onChange={(v: string) => setChallenge({ ...challenge, judul_challenge: v })}
            placeholder="Challenge Digitalisasi & Branding"
          />
          <InputGroup
            id="ch_sub"
            label="Sub-judul Badge"
            value={challenge.sub_judul}
            onChange={(v: string) => setChallenge({ ...challenge, sub_judul: v })}
            placeholder="Media Panduan Praktik Lapangan (Offline)"
          />
          <TextareaGroup
            id="ch_desc"
            label="Deskripsi Ringkas Challenge"
            value={challenge.deskripsi_challenge}
            onChange={(v: string) => setChallenge({ ...challenge, deskripsi_challenge: v })}
            placeholder="Tunjukkan kreativitas timmu dalam membangun brand..."
            rows={2}
          />
          <TextareaGroup
            id="ch_info"
            label="Pengumuman / Info Praktik Offline"
            value={challenge.info_praktik}
            onChange={(v: string) => setChallenge({ ...challenge, info_praktik: v })}
            placeholder="Praktik langsung dilaksanakan di Balai Desa Banyusangka..."
            rows={3}
          />
          <InputGroup
            id="ch_wa"
            label="Nomor WA Fasilitator (Format 628xxx)"
            value={challenge.kontak_fasilitator}
            onChange={(v: string) => setChallenge({ ...challenge, kontak_fasilitator: v })}
            placeholder="6285852278026"
          />
          <InputGroup
            id="ch_materi"
            label="Link Canva Materi Tutor / Presentasi"
            value={challenge.link_materi_tutor || "https://canva.link/de2smsdgdgkp0so"}
            onChange={(v: string) => setChallenge({ ...challenge, link_materi_tutor: v })}
            placeholder="https://canva.link/de2smsdgdgkp0so"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUploader
              label="Foto Visualisasi Referensi Brand Make Over"
              folder="challenge"
              url={challenge.ref_brand_image}
              onUrlChange={(url) => setChallenge({ ...challenge, ref_brand_image: url })}
              onUpload={uploadImage}
              showToast={showToast}
            />
            <ImageUploader
              label="Foto Visualisasi Referensi Video Promosi"
              folder="challenge"
              url={challenge.ref_video_image}
              onUrlChange={(url) => setChallenge({ ...challenge, ref_video_image: url })}
              onUpload={uploadImage}
              showToast={showToast}
            />
          </div>

          {/* Live Wall Controls */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">⚡ Live Showcase Wall</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Toggle Live Wall */}
              <div className="flex items-center justify-between bg-slate-950 border border-slate-700 rounded-xl px-4 py-3">
                <div>
                  <span className="text-xs font-medium text-slate-300">Live Wall Aktif</span>
                  <p className="text-[10px] text-slate-500">Tampilkan section Live Wall di halaman Challenge</p>
                </div>
                <button
                  onClick={() => setChallenge({ ...challenge, live_wall_aktif: !challenge.live_wall_aktif })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    challenge.live_wall_aktif ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    challenge.live_wall_aktif ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Toggle Form Upload */}
              <div className="flex items-center justify-between bg-slate-950 border border-slate-700 rounded-xl px-4 py-3">
                <div>
                  <span className="text-xs font-medium text-slate-300">Form Upload Aktif</span>
                  <p className="text-[10px] text-slate-500">Buka/tutup form upload peserta (tutup setelah event selesai)</p>
                </div>
                <button
                  onClick={() => setChallenge({ ...challenge, form_upload_aktif: !challenge.form_upload_aktif })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    challenge.form_upload_aktif ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    challenge.form_upload_aktif ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            <InputGroup
              id="ch_lw_judul"
              label="Judul Banner Live Wall"
              value={challenge.live_wall_judul}
              onChange={(v: string) => setChallenge({ ...challenge, live_wall_judul: v })}
              placeholder="Live Showcase Wall"
            />
            <div className="mt-4">
              <TextareaGroup
                id="ch_lw_desc"
                label="Deskripsi Banner Live Wall"
                value={challenge.live_wall_deskripsi}
                onChange={(v: string) => setChallenge({ ...challenge, live_wall_deskripsi: v })}
                placeholder="Karya peserta ditampilkan secara realtime..."
                rows={2}
              />
            </div>
            <div className="mt-4">
              <InputGroup
                id="ch_kode_akses"
                label="🔑 Kode Akses Event (diumumkan lisan ke peserta saat briefing)"
                value={challenge.kode_akses_event}
                onChange={(v: string) => setChallenge({ ...challenge, kode_akses_event: v })}
                placeholder="TAWSEC2026"
              />
              <p className="text-[10px] text-slate-500 mt-1">Ganti kode ini sebelum setiap event baru. Peserta memasukkan kode ini sebelum upload.</p>
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* Section 8: Katalog & Produk UMKM */}
      <AccordionSection
        id="produk"
        title="Katalog &amp; Produk UMKM (Varian, Harga, &amp; Foto)"
        description="Kelola daftar produk, varian ukuran, harga, foto, status halal, dan ketersediaan stok"
        icon={ShoppingBag}
        isOpen={openSection === "produk"}
        onToggle={() => toggleSection("produk")}
        onSave={() => saveSetting("produk", produkList)}
        isSaving={savingState["produk"]}
      >
        <div className="space-y-6">
          {produkList.map((prod, index) => (
            <div
              key={prod.id || index}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-sky-400" />
                  <span className="font-bold text-white text-sm">
                    {prod.nama || `Produk #${index + 1}`}
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    ID: {prod.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...produkList];
                      updated[index].tersedia = !updated[index].tersedia;
                      setProdukList(updated);
                    }}
                    className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${
                      prod.tersedia !== false
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                    }`}
                  >
                    {prod.tersedia !== false ? "✓ Tersedia" : "✕ Stok Habis"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Yakin ingin menghapus produk "${prod.nama}"?`)) {
                        setProdukList(produkList.filter((_, i) => i !== index));
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Hapus Produk"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup
                  id={`prod_nama_${index}`}
                  label="Nama Produk"
                  value={prod.nama}
                  onChange={(v: string) => {
                    const updated = [...produkList];
                    updated[index].nama = v;
                    setProdukList(updated);
                  }}
                  placeholder="Nama Produk"
                />
                <InputGroup
                  id={`prod_kat_${index}`}
                  label="Kategori (misal: Abon, Kerupuk, Tepung)"
                  value={prod.kategori}
                  onChange={(v: string) => {
                    const updated = [...produkList];
                    updated[index].kategori = v;
                    setProdukList(updated);
                  }}
                  placeholder="Kategori Produk"
                />
              </div>

              <InputGroup
                id={`prod_tagline_${index}`}
                label="Tagline Singkat"
                value={prod.tagline}
                onChange={(v: string) => {
                  const updated = [...produkList];
                  updated[index].tagline = v;
                  setProdukList(updated);
                }}
                placeholder="Gurih, renyah, khas nelayan..."
              />

              <TextareaGroup
                id={`prod_desc_${index}`}
                label="Deskripsi Lengkap Produk"
                value={prod.deskripsi}
                onChange={(v: string) => {
                  const updated = [...produkList];
                  updated[index].deskripsi = v;
                  setProdukList(updated);
                }}
                placeholder="Deskripsi bahan dan keunggulan..."
                rows={3}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup
                  id={`prod_halal_${index}`}
                  label="Status Halal"
                  value={prod.status_halal || "Dalam proses sertifikasi"}
                  onChange={(v: string) => {
                    const updated = [...produkList];
                    updated[index].status_halal = v;
                    setProdukList(updated);
                  }}
                  placeholder="Halal / Dalam proses sertifikasi"
                />
                <InputGroup
                  id={`prod_wa_${index}`}
                  label="Nomor WA Pesanan (Format 628xxx)"
                  value={prod.kontak_wa || "6285852278026"}
                  onChange={(v: string) => {
                    const updated = [...produkList];
                    updated[index].kontak_wa = v;
                    setProdukList(updated);
                  }}
                  placeholder="6285852278026"
                />
              </div>

              {/* Varian & Harga */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <label className="block text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3">
                  Varian Ukuran &amp; Harga (Rp)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(prod.varian || []).map((varItem, vIdx) => (
                    <div key={vIdx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                      <InputGroup
                        id={`var_uk_${index}_${vIdx}`}
                        label={`Varian ${vIdx + 1} Ukuran`}
                        value={varItem.ukuran}
                        onChange={(v: string) => {
                          const updated = [...produkList];
                          updated[index].varian[vIdx].ukuran = v;
                          setProdukList(updated);
                        }}
                        placeholder="100g / 250g"
                      />
                      <InputGroup
                        id={`var_hg_${index}_${vIdx}`}
                        label="Harga (Rp)"
                        type="number"
                        value={varItem.harga}
                        onChange={(v: string) => {
                          const updated = [...produkList];
                          updated[index].varian[vIdx].harga = parseInt(v) || 0;
                          setProdukList(updated);
                        }}
                        placeholder="25000"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Uploader for Product Photo */}
              <ImageUploader
                label="Foto Produk Utama"
                folder="produk"
                url={prod.foto?.[0] || ""}
                onUrlChange={(url) => {
                  const updated = [...produkList];
                  updated[index].foto = [url, ...(updated[index].foto?.slice(1) || [])];
                  setProdukList(updated);
                }}
                onUpload={uploadImage}
                showToast={showToast}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              const newId = `produk-${Date.now().toString(36)}`;
              setProdukList([
                ...produkList,
                {
                  id: newId,
                  nama: "Produk Baru UMKM",
                  kategori: "Olahan Laut",
                  tagline: "Produk olahan laut khas nelayan Banyusangka",
                  deskripsi: "Deskripsi lengkap produk olahan laut khas Desa Banyusangka.",
                  varian: [
                    { ukuran: "100g", harga: 25000 },
                    { ukuran: "250g", harga: 55000 }
                  ],
                  komposisi: ["Ikan Segar", "Bumbu Tradisional"],
                  cara_penyimpanan: "Simpan di tempat kering.",
                  produsen: "KUB Perempuan Banyusangka",
                  status_halal: "Dalam proses sertifikasi",
                  berat_bersih: "Sesuai varian",
                  foto: ["/images/produk/abon-ikan-1.png"],
                  kontak_wa: "6285852278026",
                  pesan_wa: "Halo, saya ingin memesan produk dari TAWSEC Banyusangka.",
                  tersedia: true
                }
              ]);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 border border-slate-700 border-dashed rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Produk Baru
          </button>
        </div>
      </AccordionSection>
    </div>
  );
}
