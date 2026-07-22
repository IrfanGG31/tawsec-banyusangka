"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LogOut, Plus, Edit, Trash2, Database, BarChart3,
  Newspaper, Layers, FolderGit2, Check, X, Shield, RefreshCw
} from "lucide-react";

type TabType = "progress" | "updates" | "dampak" | "dokumentasi";

interface ProgressItem {
  id?: string;
  nama_indikator: string;
  kategori: string;
  target: string;
  capaian_saat_ini: string;
  persentase: number;
  status: "Belum Mulai" | "Dalam Proses" | "Selesai";
}

interface UpdateItem {
  id?: string;
  tanggal: string;
  judul: string;
  isi_singkat: string;
  deskripsi_lengkap?: string;
  foto_url: string;
  kategori: string;
  // New fields for slug-based anchors + timeline integration
  slug?: string;
  periode?: string;
  pic?: string;
  status_kegiatan?: "Selesai" | "Berjalan" | "Belum Mulai";
  urutan?: number;
  is_timeline?: boolean;
}

interface DampakItem {
  id?: string;
  label: string;
  angka: string;
  satuan: string;
  icon?: string;
}

interface DokumentasiItem {
  id?: string;
  nama_kegiatan: string;
  kategori: string;
  tanggal: string;
  deskripsi: string;
  link_gdrive: string;
}

// Auto-generates a URL-safe kebab-case slug from any text.
// E.g. "Survei & Pemetaan Potensi!" → "survei-pemetaan-potensi"
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/&/g, "dan")
    .replace(/[^a-z0-9\s-]/g, "")    // drop non-alphanumeric
    .trim()
    .replace(/\s+/g, "-")            // spaces → hyphens
    .replace(/-+/g, "-")             // collapse multiple hyphens
    .slice(0, 80);                   // max 80 chars
}

export default function AdminDashboardPage() {
  const router = useRouter();
  // Track whether slug was manually edited so auto-gen doesn't override
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("progress");
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  // Data states
  const [progressList, setProgressList] = useState<ProgressItem[]>([]);
  const [updatesList, setUpdatesList] = useState<UpdateItem[]>([]);
  const [dampakList, setDampakList] = useState<DampakItem[]>([]);
  const [dokumentasiList, setDokumentasiList] = useState<DokumentasiItem[]>([]);

  // Modal form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    checkUserAndFetch();
  }, []);

  const checkUserAndFetch = async () => {
    setLoading(true);
    const supabase = createClient();

    if (!supabase) {
      setDbConnected(false);
      loadLocalFallbacks();
      setLoading(false);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Redirect if unauthenticated
        router.push("/admin/login");
        return;
      }

      setUserEmail(session.user.email || "Operator Admin");
      setDbConnected(true);

      // Fetch all tables
      await fetchAllTables(supabase);
    } catch {
      setDbConnected(false);
      loadLocalFallbacks();
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTables = async (supabase: ReturnType<typeof createClient>) => {
    if (!supabase) return;

    const [progRes, updRes, dampRes, dokRes] = await Promise.all([
      supabase.from("progress_indicators").select("*").order("updated_at", { ascending: false }),
      supabase.from("updates").select("*").order("created_at", { ascending: false }),
      supabase.from("dampak").select("*"),
      supabase.from("dokumentasi").select("*"),
    ]);

    if (progRes.data) setProgressList(progRes.data);
    if (updRes.data) setUpdatesList(updRes.data);
    if (dampRes.data) setDampakList(dampRes.data);
    if (dokRes.data) setDokumentasiList(dokRes.data);
  };

  const loadLocalFallbacks = async () => {
    try {
      const [pRes, uRes, dRes, dokRes] = await Promise.all([
        fetch("/api/fallback/progress").catch(() => null),
        fetch("/api/fallback/updates").catch(() => null),
        fetch("/api/fallback/dampak").catch(() => null),
        fetch("/api/fallback/dokumentasi").catch(() => null),
      ]);

      if (pRes) setProgressList(await pRes.json());
      if (uRes) setUpdatesList(await uRes.json());
      if (dRes) setDampakList(await dRes.json());
      if (dokRes) setDokumentasiList(await dokRes.json());
    } catch {
      // Ignore fallback load errors
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
  };

  // CRUD Actions
  const handleOpenAdd = () => {
    setEditingId(null);
    if (activeTab === "progress") {
      setFormData({
        nama_indikator: "",
        kategori: "Kewirausahaan",
        target: "",
        capaian_saat_ini: "",
        persentase: 0,
        status: "Belum Mulai",
      });
    } else if (activeTab === "updates") {
      setSlugManuallyEdited(false);
      setFormData({
        tanggal: new Date().toISOString().split("T")[0],
        judul: "",
        slug: "",
        isi_singkat: "",
        deskripsi_lengkap: "",
        foto_url: "/images/galeri/pelatihan-1.png",
        kategori: "Kegiatan",
        periode: "",
        pic: "",
        status_kegiatan: "Selesai",
        urutan: 99,
        is_timeline: false,
      });
    } else if (activeTab === "dampak") {
      setFormData({ label: "", angka: "", satuan: "", icon: "Users" });
    } else if (activeTab === "dokumentasi") {
      setFormData({
        nama_kegiatan: "",
        kategori: "Pilar 1",
        tanggal: new Date().toISOString().split("T")[0],
        deskripsi: "",
        link_gdrive: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Record<string, unknown>) => {
    setEditingId((item.id as string) || null);
    setFormData({ ...item });
    // If editing an existing item that already has a slug, mark as manually set
    setSlugManuallyEdited(!!(item.slug as string));
    setIsModalOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    const supabase = createClient();
    if (!supabase) {
      alert("Mode tanpa Supabase — edit lokal simulasi saja.");
      return;
    }

    const tableMap: Record<TabType, string> = {
      progress: "progress_indicators",
      updates: "updates",
      dampak: "dampak",
      dokumentasi: "dokumentasi",
    };

    const { error } = await supabase.from(tableMap[activeTab]).delete().eq("id", id);
    if (error) {
      alert(`Gagal menghapus data: ${error.message}`);
    } else {
      fetchAllTables(supabase);
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    if (!supabase) {
      alert("Database Supabase belum terhubung. Silakan masukkan API keys Supabase di Vercel/env vars.");
      setIsModalOpen(false);
      return;
    }

    const tableMap: Record<TabType, string> = {
      progress: "progress_indicators",
      updates: "updates",
      dampak: "dampak",
      dokumentasi: "dokumentasi",
    };

    const tableName = tableMap[activeTab];

    if (editingId) {
      const { error } = await supabase.from(tableName).update(formData).eq("id", editingId);
      if (error) alert(`Error update: ${error.message}`);
    } else {
      const { error } = await supabase.from(tableName).insert([formData]);
      if (error) alert(`Error insert: ${error.message}`);
    }

    setIsModalOpen(false);
    fetchAllTables(supabase);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Header Admin */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-md font-bold">
              ⚙️
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-white leading-tight flex items-center gap-2">
                Panel Operator Admin TAWSEC
              </h1>
              <p className="text-xs text-sky-400 font-medium flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                {userEmail || "Operator Internal"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                dbConnected
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-300 border-amber-500/30"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              {dbConnected ? "Database Supabase Connected" : "Mode Fallback JSON (Setup Env Vars)"}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("progress")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "progress"
                  ? "bg-sky-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Progres Program (9 KPI)
            </button>

            <button
              onClick={() => setActiveTab("updates")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "updates"
                  ? "bg-sky-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Newspaper className="w-4 h-4" />
              Update / Mini-Blog
            </button>

            <button
              onClick={() => setActiveTab("dampak")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "dampak"
                  ? "bg-sky-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Layers className="w-4 h-4" />
              Angka Dampak (Beranda)
            </button>

            <button
              onClick={() => setActiveTab("dokumentasi")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "dokumentasi"
                  ? "bg-sky-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              Dokumentasi Kegiatan
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={checkUserAndFetch}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 text-xs font-semibold transition-all border border-slate-700"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Tambah Baru
            </button>
          </div>
        </div>

        {/* ================= TAB 1: PROGRESS INDICATORS (9 KPI) ================= */}
        {activeTab === "progress" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-lg text-white">Indikator Progres Program (9 KPI Resmi)</h2>
                <p className="text-xs text-slate-400">Kelola persentase, capaian, dan status 9 indikator keberhasilan TAWSEC</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">Indikator KPI</th>
                    <th className="py-4 px-4">Kategori</th>
                    <th className="py-4 px-6">Target Resmi</th>
                    <th className="py-4 px-6">Capaian Saat Ini</th>
                    <th className="py-4 px-4">Progress</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {progressList.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-white max-w-[180px]">{item.nama_indikator}</td>
                      <td className="py-4 px-4 text-slate-400 whitespace-nowrap">{item.kategori}</td>
                      <td className="py-4 px-6 text-slate-300 max-w-[160px] text-xs">{item.target}</td>
                      <td className="py-4 px-6 text-emerald-400 font-medium text-xs max-w-[180px]">{item.capaian_saat_ini}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-800 rounded-full h-1.5">
                            <div className={`rounded-full h-1.5 transition-all ${
                              item.status === 'Selesai' ? 'bg-emerald-500' :
                              item.status === 'Dalam Proses' ? 'bg-amber-400' : 'bg-slate-600'
                            }`} style={{ width: `${item.persentase}%` }} />
                          </div>
                          <span className="font-mono font-bold text-sky-400 text-xs">{item.persentase}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            item.status === "Selesai"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : item.status === "Dalam Proses"
                              ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(item as unknown as Record<string, unknown>)}
                            className="p-2 bg-slate-800 hover:bg-sky-600/30 text-sky-300 rounded-lg border border-slate-700 transition-all"
                            title="Edit KPI"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-slate-800 hover:bg-rose-600/30 text-rose-300 rounded-lg border border-slate-700 transition-all"
                            title="Hapus KPI"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 2: UPDATES / MINI-BLOG ================= */}
        {activeTab === "updates" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-lg text-white">Update &amp; Berita Kegiatan</h2>
                <p className="text-xs text-slate-400">Postingan berita perkembangan terkini di halaman /update</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">Tanggal</th>
                    <th className="py-4 px-6">Judul Update</th>
                    <th className="py-4 px-4">Kategori</th>
                    <th className="py-4 px-4">Slug</th>
                    <th className="py-4 px-4">Timeline</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {updatesList.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 text-slate-400 font-mono whitespace-nowrap">{item.tanggal}</td>
                      <td className="py-4 px-6 font-semibold text-white">{item.judul}</td>
                      <td className="py-4 px-4 text-sky-400">{item.kategori}</td>
                      <td className="py-4 px-4 text-emerald-400 font-mono text-[10px] max-w-[140px] truncate">{item.slug || <span className="text-slate-600 italic">—</span>}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.is_timeline ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "bg-slate-800 text-slate-500 border border-slate-700"}`}>
                          {item.is_timeline ? "✓ Timeline" : "Blog only"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(item as unknown as Record<string, unknown>)}
                            className="p-2 bg-slate-800 hover:bg-sky-600/30 text-sky-300 rounded-lg border border-slate-700 transition-all"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-slate-800 hover:bg-rose-600/30 text-rose-300 rounded-lg border border-slate-700 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: DAMPAK ================= */}
        {activeTab === "dampak" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800">
              <h2 className="font-serif font-bold text-lg text-white">Angka Dampak (Section Beranda)</h2>
              <p className="text-xs text-slate-400">Statistik hijau yang tampil di halaman depan website</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">Label Indikator</th>
                    <th className="py-4 px-4">Angka Utam a</th>
                    <th className="py-4 px-4">Satuan / Keterangan</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {dampakList.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">{item.label}</td>
                      <td className="py-4 px-4 text-emerald-400 font-bold text-sm">{item.angka}</td>
                      <td className="py-4 px-4 text-slate-300">{item.satuan}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(item as unknown as Record<string, unknown>)}
                            className="p-2 bg-slate-800 hover:bg-sky-600/30 text-sky-300 rounded-lg border border-slate-700 transition-all"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-slate-800 hover:bg-rose-600/30 text-rose-300 rounded-lg border border-slate-700 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: DOKUMENTASI ================= */}
        {activeTab === "dokumentasi" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800">
              <h2 className="font-serif font-bold text-lg text-white">Dokumentasi Kegiatan (Drive Links)</h2>
              <p className="text-xs text-slate-400">Daftar folder Google Drive yang tampil di halaman terproteksi /dokumentasi</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">Nama Kegiatan / Folder</th>
                    <th className="py-4 px-4">Kategori</th>
                    <th className="py-4 px-4">Tanggal</th>
                    <th className="py-4 px-6">Link Google Drive</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {dokumentasiList.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">{item.nama_kegiatan}</td>
                      <td className="py-4 px-4 text-sky-400">{item.kategori}</td>
                      <td className="py-4 px-4 text-slate-400 font-mono">{item.tanggal}</td>
                      <td className="py-4 px-6 text-emerald-400 max-w-xs truncate font-mono">{item.link_gdrive}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(item as unknown as Record<string, unknown>)}
                            className="p-2 bg-slate-800 hover:bg-sky-600/30 text-sky-300 rounded-lg border border-slate-700 transition-all"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-slate-800 hover:bg-rose-600/30 text-rose-300 rounded-lg border border-slate-700 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL FORM EDIT / TAMBAH ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="font-serif font-bold text-white text-base">
                {editingId ? "Edit Data" : "Tambah Data Baru"} ({activeTab.toUpperCase()})
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              {/* Dynamic Form Fields per Tab */}
              {activeTab === "progress" && (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {/* Nama Indikator */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Nama Indikator KPI <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={(formData.nama_indikator as string) || ""}
                      onChange={(e) => setFormData({ ...formData, nama_indikator: e.target.value })}
                      required
                      placeholder="Contoh: Jangkauan Pasar"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  {/* Kategori + Status */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Kategori</label>
                      <input
                        type="text"
                        value={(formData.kategori as string) || ""}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                        placeholder="Pemasaran / Ekonomi / dll"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Status</label>
                      <select
                        value={(formData.status as string) || "Belum Mulai"}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      >
                        <option value="Belum Mulai">⏳ Belum Mulai</option>
                        <option value="Dalam Proses">⚡ Dalam Proses</option>
                        <option value="Selesai">✓ Selesai</option>
                      </select>
                    </div>
                  </div>

                  {/* Target */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Target Resmi <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={(formData.target as string) || ""}
                      onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                      required
                      placeholder="Masuk 3 gerai ritel / toko oleh-oleh"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  {/* Capaian Saat Ini */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Capaian Saat Ini <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={(formData.capaian_saat_ini as string) || ""}
                      onChange={(e) => setFormData({ ...formData, capaian_saat_ini: e.target.value })}
                      required
                      placeholder="0 gerai (sedang penjajakan)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  {/* Persentase — slider + number combo */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-2">
                      Persentase Progress
                      <span className="ml-2 font-bold text-sky-400 text-sm">{(formData.persentase as number) || 0}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={(formData.persentase as number) || 0}
                      onChange={(e) => setFormData({ ...formData, persentase: parseInt(e.target.value) })}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                      <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "updates" && (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {/* Judul — auto-generates slug */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Judul Update <span className="text-rose-400">*</span></label>
                    <input
                      type="text"
                      value={(formData.judul as string) || ""}
                      onChange={(e) => {
                        const judul = e.target.value;
                        const updates: Record<string, unknown> = { judul };
                        // Only auto-fill slug when it hasn't been manually touched
                        if (!slugManuallyEdited) {
                          updates.slug = slugify(judul);
                        }
                        setFormData({ ...formData, ...updates });
                      }}
                      required
                      placeholder="Judul berita / kegiatan"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  {/* Slug — auto-generated, manually overrideable */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Slug Anchor
                      <span className="ml-1.5 text-slate-600 font-normal">(/update#slug-ini)</span>
                    </label>
                    <input
                      type="text"
                      value={(formData.slug as string) || ""}
                      onChange={(e) => {
                        setSlugManuallyEdited(true);
                        setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") });
                      }}
                      placeholder="auto-generated dari judul — edit untuk kustom"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-emerald-800/50 text-xs text-emerald-300 font-mono"
                    />
                    {!slugManuallyEdited && (
                      <p className="text-[10px] text-slate-600 mt-0.5">✦ Auto-generate dari judul. Klik untuk override manual.</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Tanggal Tampil <span className="text-rose-400">*</span></label>
                      <input
                        type="text"
                        value={(formData.tanggal as string) || ""}
                        onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                        required
                        placeholder="15 Juli 2026"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Kategori</label>
                      <input
                        type="text"
                        value={(formData.kategori as string) || ""}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                        placeholder="Pelatihan Produksi"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Isi Singkat <span className="text-rose-400">*</span></label>
                    <textarea
                      rows={2}
                      value={(formData.isi_singkat as string) || ""}
                      onChange={(e) => setFormData({ ...formData, isi_singkat: e.target.value })}
                      required
                      placeholder="1-2 kalimat ringkasan kegiatan"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Penjelasan Lengkap</label>
                    <textarea
                      rows={4}
                      value={(formData.deskripsi_lengkap as string) || ""}
                      onChange={(e) => setFormData({ ...formData, deskripsi_lengkap: e.target.value })}
                      placeholder="Detail kegiatan, jumlah peserta, hasil, dll."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Foto URL</label>
                    <input
                      type="text"
                      value={(formData.foto_url as string) || ""}
                      onChange={(e) => setFormData({ ...formData, foto_url: e.target.value })}
                      placeholder="/images/galeri/nama-foto.png"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>

                  {/* ── Timeline-specific fields ── */}
                  <div className="pt-2 border-t border-slate-800">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <div
                        onClick={() => setFormData({ ...formData, is_timeline: !(formData.is_timeline as boolean) })}
                        className={`w-10 h-5 rounded-full transition-all relative ${
                          (formData.is_timeline as boolean) ? "bg-indigo-600" : "bg-slate-700"
                        }`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                          (formData.is_timeline as boolean) ? "left-5" : "left-0.5"
                        }`} />
                      </div>
                      <span className="text-xs text-slate-300 font-semibold">
                        Tampilkan di Timeline Program
                      </span>
                    </label>
                  </div>

                  {(formData.is_timeline as boolean) && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Periode Timeline</label>
                          <input
                            type="text"
                            value={(formData.periode as string) || ""}
                            onChange={(e) => setFormData({ ...formData, periode: e.target.value })}
                            placeholder="Mei–Juni 2026"
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Urutan Timeline</label>
                          <input
                            type="number"
                            min={1}
                            value={(formData.urutan as number) || 99}
                            onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) || 99 })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">PIC Penanggung Jawab</label>
                          <input
                            type="text"
                            value={(formData.pic as string) || ""}
                            onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                            placeholder="Nama & Tim"
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Status Kegiatan</label>
                          <select
                            value={(formData.status_kegiatan as string) || "Selesai"}
                            onChange={(e) => setFormData({ ...formData, status_kegiatan: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                          >
                            <option value="Selesai">✓ Selesai</option>
                            <option value="Berjalan">⚡ Sedang Berjalan</option>
                            <option value="Belum Mulai">⏳ Belum Mulai</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === "dampak" && (
                <>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Label Indikator Dampak</label>
                    <input
                      type="text"
                      value={(formData.label as string) || ""}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Angka Utama</label>
                      <input
                        type="text"
                        value={(formData.angka as string) || ""}
                        onChange={(e) => setFormData({ ...formData, angka: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Satuan / Keterangan</label>
                      <input
                        type="text"
                        value={(formData.satuan as string) || ""}
                        onChange={(e) => setFormData({ ...formData, satuan: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === "dokumentasi" && (
                <>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Nama Kegiatan / Folder</label>
                    <input
                      type="text"
                      value={(formData.nama_kegiatan as string) || ""}
                      onChange={(e) => setFormData({ ...formData, nama_kegiatan: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Kategori</label>
                      <input
                        type="text"
                        value={(formData.kategori as string) || ""}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Tanggal</label>
                      <input
                        type="text"
                        value={(formData.tanggal as string) || ""}
                        onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Link Google Drive</label>
                    <input
                      type="url"
                      value={(formData.link_gdrive as string) || ""}
                      onChange={(e) => setFormData({ ...formData, link_gdrive: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-bold shadow-md"
                >
                  <Check className="w-4 h-4" />
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
