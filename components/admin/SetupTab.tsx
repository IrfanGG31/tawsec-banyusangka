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
    ref_brand_image: "/images/challenge/brand-makeover-ref.jpg",
    ref_video_image: "/images/challenge/video-promosi-ref.jpg",
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

  // --- Subcomponents for Forms ---
  
  const InputGroup = ({ label, id, value, onChange, placeholder, type = "text" }: any) => (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
      />
    </div>
  );

  const TextareaGroup = ({ label, id, value, onChange, placeholder, rows = 3 }: any) => (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
      />
    </div>
  );

  const ImageUploader = ({ label, folder, url, onUrlChange }: { label: string; folder: string; url: string; onUrlChange: (url: string) => void }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      setIsUploading(true);
      const uploadedUrl = await uploadImage(file, folder);
      setIsUploading(false);
      
      if (uploadedUrl) {
        onUrlChange(uploadedUrl);
        showToast("Gambar berhasil diunggah", "success");
      } else {
        showToast("Gagal mengunggah gambar", "error");
      }
      
      // Reset input so the same file can be selected again if needed
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
            value={url}
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
  };

  const AccordionSection = ({ 
    id, title, description, icon: Icon, children, onSave 
  }: { 
    id: string, title: string, description: string, icon: any, children: React.ReactNode, onSave: () => void 
  }) => {
    const isOpen = openSection === id;
    const isSaving = savingState[id];

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors"
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
        onSave={() => saveSetting("identitas", identitas)}
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
            type="email"
            value={identitas.email}
            onChange={(v: string) => setIdentitas({ ...identitas, email: v })}
          />
          <InputGroup
            label="Nomor WhatsApp (Tanpa +, contoh: 628123456789)"
            id="wa_number"
            value={identitas.wa_number}
            onChange={(v: string) => setIdentitas({ ...identitas, wa_number: v })}
          />
          <div className="md:col-span-2">
            <TextareaGroup
              label="Template Pesan WhatsApp (Otomatis terisi saat tombol diklik)"
              id="wa_template"
              value={identitas.wa_template}
              onChange={(v: string) => setIdentitas({ ...identitas, wa_template: v })}
              rows={4}
            />
          </div>
        </div>
      </AccordionSection>

      {/* Section 2: Hero Banner */}
      <AccordionSection
        id="hero"
        title="Hero Banner Beranda"
        description="Konten utama pada bagian atas halaman beranda (Headline & Gambar)"
        icon={ImageIcon}
        onSave={() => saveSetting("hero", hero)}
      >
        <div className="space-y-4">
          <InputGroup
            label="Judul Utama (H1)"
            id="hero_judul"
            value={hero.judul}
            onChange={(v: string) => setHero({ ...hero, judul: v })}
          />
          <TextareaGroup
            label="Deskripsi Pendek (Subtitle)"
            id="hero_subtitle"
            value={hero.subtitle}
            onChange={(v: string) => setHero({ ...hero, subtitle: v })}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-800 bg-slate-950/50 rounded-xl p-4">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300 border-b border-slate-800 pb-2">Call to Action Utama</h4>
              <InputGroup
                label="Label Tombol 1"
                id="cta1_label"
                value={hero.cta1_label}
                onChange={(v: string) => setHero({ ...hero, cta1_label: v })}
              />
              <InputGroup
                label="Link Tombol 1"
                id="cta1_href"
                value={hero.cta1_href}
                onChange={(v: string) => setHero({ ...hero, cta1_href: v })}
              />
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300 border-b border-slate-800 pb-2">Call to Action Sekunder</h4>
              <InputGroup
                label="Label Tombol 2"
                id="cta2_label"
                value={hero.cta2_label}
                onChange={(v: string) => setHero({ ...hero, cta2_label: v })}
              />
              <InputGroup
                label="Link Tombol 2"
                id="cta2_href"
                value={hero.cta2_href}
                onChange={(v: string) => setHero({ ...hero, cta2_href: v })}
              />
            </div>
          </div>

          <ImageUploader
            label="Gambar Latar / Background Hero"
            folder="hero"
            url={hero.bg_image}
            onUrlChange={(url) => setHero({ ...hero, bg_image: url })}
          />
        </div>
      </AccordionSection>

      {/* Section 3: Testimonial */}
      <AccordionSection
        id="testimonial"
        title="Testimonial & Kata Sambutan"
        description="Quote atau sambutan tokoh (Misal: Kepala Desa)"
        icon={MessageSquare}
        onSave={() => saveSetting("testimonial", testimonial)}
      >
        <div className="space-y-4">
          <TextareaGroup
            label="Isi Kutipan / Quote"
            id="testimonial_quote"
            value={testimonial.quote}
            onChange={(v: string) => setTestimonial({ ...testimonial, quote: v })}
            rows={4}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              label="Nama Tokoh"
              id="testimonial_nama"
              value={testimonial.nama}
              onChange={(v: string) => setTestimonial({ ...testimonial, nama: v })}
            />
            <InputGroup
              label="Jabatan"
              id="testimonial_jabatan"
              value={testimonial.jabatan}
              onChange={(v: string) => setTestimonial({ ...testimonial, jabatan: v })}
            />
          </div>
          <ImageUploader
            label="Foto Tokoh"
            folder="testimonial"
            url={testimonial.foto}
            onUrlChange={(url) => setTestimonial({ ...testimonial, foto: url })}
          />
        </div>
      </AccordionSection>

      {/* Section 4: Foto Tim */}
      <AccordionSection
        id="foto_tim"
        title="Dokumentasi Lapangan"
        description="Foto-foto kegiatan tim atau mahasiswa di lapangan"
        icon={ImageIcon}
        onSave={() => saveSetting("foto_tim", fotoTim)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 border border-slate-800 bg-slate-950/50 rounded-xl space-y-4">
            <h4 className="text-sm font-medium text-slate-300">Dokumentasi 1</h4>
            <ImageUploader
              label="Foto Kegiatan 1"
              folder="kegiatan"
              url={fotoTim.foto1_url}
              onUrlChange={(url) => setFotoTim({ ...fotoTim, foto1_url: url })}
            />
            <InputGroup
              label="Keterangan / Caption"
              id="foto1_caption"
              value={fotoTim.foto1_caption}
              onChange={(v: string) => setFotoTim({ ...fotoTim, foto1_caption: v })}
            />
            <InputGroup
              label="Tag / Label"
              id="foto1_tag"
              value={fotoTim.foto1_tag}
              onChange={(v: string) => setFotoTim({ ...fotoTim, foto1_tag: v })}
            />
          </div>

          <div className="p-4 border border-slate-800 bg-slate-950/50 rounded-xl space-y-4">
            <h4 className="text-sm font-medium text-slate-300">Dokumentasi 2</h4>
            <ImageUploader
              label="Foto Kegiatan 2"
              folder="kegiatan"
              url={fotoTim.foto2_url}
              onUrlChange={(url) => setFotoTim({ ...fotoTim, foto2_url: url })}
            />
            <InputGroup
              label="Keterangan / Caption"
              id="foto2_caption"
              value={fotoTim.foto2_caption}
              onChange={(v: string) => setFotoTim({ ...fotoTim, foto2_caption: v })}
            />
            <InputGroup
              label="Tag / Label"
              id="foto2_tag"
              value={fotoTim.foto2_tag}
              onChange={(v: string) => setFotoTim({ ...fotoTim, foto2_tag: v })}
            />
          </div>
        </div>
      </AccordionSection>

      {/* Section 5: Social Media */}
      <AccordionSection
        id="social_media"
        title="Media Sosial & Eksternal"
        description="Tautan menuju halaman profil media sosial dan toko online"
        icon={LinkIcon}
        onSave={() => saveSetting("social_media", socialMedia)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup
            label="Instagram URL"
            id="soc_ig"
            value={socialMedia.instagram}
            onChange={(v: string) => setSocialMedia({ ...socialMedia, instagram: v })}
          />
          <InputGroup
            label="TikTok URL"
            id="soc_tiktok"
            value={socialMedia.tiktok}
            onChange={(v: string) => setSocialMedia({ ...socialMedia, tiktok: v })}
          />
          <InputGroup
            label="YouTube Channel URL"
            id="soc_yt"
            value={socialMedia.youtube}
            onChange={(v: string) => setSocialMedia({ ...socialMedia, youtube: v })}
          />
          <InputGroup
            label="Shopee Store URL"
            id="soc_shopee"
            value={socialMedia.shopee}
            onChange={(v: string) => setSocialMedia({ ...socialMedia, shopee: v })}
          />
          <InputGroup
            label="Tokopedia Store URL"
            id="soc_tokopedia"
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
        onSave={() => saveSetting("anggota", anggota)}
      >
        <div className="space-y-4">
          {anggota.map((member, index) => (
            <div key={member.id} className="relative p-4 md:p-5 border border-slate-800 bg-slate-950 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  const newAnggota = [...anggota];
                  newAnggota.splice(index, 1);
                  setAnggota(newAnggota);
                }}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-rose-400 bg-slate-900 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Hapus Anggota"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="pr-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup
                  label="Nama Anggota"
                  id={`anggota_nama_${member.id}`}
                  value={member.nama}
                  onChange={(v: string) => {
                    const newAnggota = [...anggota];
                    newAnggota[index].nama = v;
                    setAnggota(newAnggota);
                  }}
                />
                <InputGroup
                  label="Program Studi"
                  id={`anggota_prodi_${member.id}`}
                  value={member.prodi}
                  onChange={(v: string) => {
                    const newAnggota = [...anggota];
                    newAnggota[index].prodi = v;
                    setAnggota(newAnggota);
                  }}
                />
                <InputGroup
                  label="Peran / Divisi"
                  id={`anggota_peran_${member.id}`}
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
        title="Challenge & Praktik Offline Pilar 3"
        description="Atur judul, instruksi praktik langsung, info fasilitator, dan foto visualisasi referensi"
        icon={Target}
        onSave={() => saveSetting("challenge", challenge)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUploader
              label="Foto Visualisasi Referensi Brand Make Over"
              folder="challenge"
              url={challenge.ref_brand_image}
              onUrlChange={(url) => setChallenge({ ...challenge, ref_brand_image: url })}
            />
            <ImageUploader
              label="Foto Visualisasi Referensi Video Promosi"
              folder="challenge"
              url={challenge.ref_video_image}
              onUrlChange={(url) => setChallenge({ ...challenge, ref_video_image: url })}
            />
          </div>
        </div>
      </AccordionSection>

      {/* Section 8: Katalog & Produk UMKM */}
      <AccordionSection
        id="produk"
        title="Katalog & Produk UMKM (Varian, Harga, & Foto)"
        description="Kelola daftar produk, varian ukuran, harga, foto, status halal, dan ketersediaan stok"
        icon={ShoppingBag}
        onSave={() => saveSetting("produk", produkList)}
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
