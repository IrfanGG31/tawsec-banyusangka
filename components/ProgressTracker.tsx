"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Circle, RefreshCw, Wifi, WifiOff, Loader2 } from "lucide-react";
import fallbackData from "@/data/progress-fallback.json";

// ─── Types ─────────────────────────────────────────────────────────────────
type StatusType = "Selesai" | "Dalam Proses" | "Belum Mulai";

// Internal shape used by the component (matches fallback JSON)
interface ProgressItem {
  id: string;
  kategori: string;
  nama_kegiatan: string;
  target?: string;
  capaian_saat_ini?: string;
  status: StatusType;
  persentase: number;
  catatan?: string;
}

// Raw Supabase row shape (matches progress_indicators table columns)
interface SupabaseProgressRow {
  id: string;
  nama_indikator: string;  // Supabase column name
  kategori: string | null;
  target: string;
  capaian_saat_ini: string;
  persentase: number;
  status: string;
}

// ─── Status Config ──────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<StatusType, { label: string; color: string; bar: string; icon: React.ReactNode }> = {
  Selesai: {
    label: "Selesai",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    bar: "bg-emerald-500",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
  },
  "Dalam Proses": {
    label: "Dalam Proses",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    bar: "bg-amber-400",
    icon: <Clock className="w-4 h-4 text-amber-500" />,
  },
  "Belum Mulai": {
    label: "Belum Mulai",
    color: "bg-gray-100 text-gray-500 border-gray-200",
    bar: "bg-gray-300",
    icon: <Circle className="w-4 h-4 text-gray-400" />,
  },
};

// ─── Map Supabase row → internal ProgressItem ───────────────────────────────
function mapSupabaseRow(d: SupabaseProgressRow): ProgressItem {
  return {
    id: d.id,
    kategori: d.kategori || "KPI Program",
    nama_kegiatan: d.nama_indikator,        // ← nama_indikator maps to nama_kegiatan
    target: d.target,
    capaian_saat_ini: d.capaian_saat_ini,
    status: (d.status as StatusType) || "Belum Mulai",
    persentase: d.persentase ?? 0,
    catatan: d.capaian_saat_ini ? `Capaian: ${d.capaian_saat_ini}` : "",
  };
}

// ─── Component ─────────────────────────────────────────────────────────────
export function ProgressTracker() {
  const [items, setItems] = useState<ProgressItem[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [liveSource, setLiveSource] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);

    try {
      // 1. Try Supabase (createClient inside try — any throw hits finally)
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      if (supabase) {
        const { data, error } = await supabase
          .from("progress_indicators")
          .select("id, nama_indikator, kategori, target, capaian_saat_ini, persentase, status")
          .order("updated_at", { ascending: false });

        // Use Supabase data only when rows exist (empty table → fallback)
        if (!error && data && data.length > 0) {
          setItems((data as SupabaseProgressRow[]).map(mapSupabaseRow));
          setIsLive(true);
          setLiveSource("Supabase Live DB");
          setLastUpdate(
            new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
          );
          return; // ✅ early-return; finally still runs
        }
      }
    } catch {
      // Any throw (network, createClient, query) → fall through to JSON
    } finally {
      // ✅ ALWAYS reached — mirrors Fase 1 Bug B fix pattern
      setLoading(false);
    }

    // 2. Fallback to local JSON (Supabase null | error | 0 rows)
    setItems(fallbackData as ProgressItem[]);
    setIsLive(false);
    setLiveSource("Data lokal JSON");
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selesai = items.filter((i) => i.status === "Selesai").length;
  const dalamProses = items.filter((i) => i.status === "Dalam Proses").length;
  const overallPct =
    items.length > 0
      ? Math.round(items.reduce((s, i) => s + i.persentase, 0) / items.length)
      : 0;

  // Group by kategori — preserve insertion order
  const kategoriMap = items.reduce<Record<string, ProgressItem[]>>((acc, item) => {
    const cat = item.kategori || "Umum";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* ── Header bar ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-serif font-bold text-navy-900 text-xl">Progress Kegiatan</h3>
          <p className="text-navy-500 text-sm">Real-time update dari Panel Admin / Tim Lapangan</p>
        </div>
        <div className="flex items-center gap-3">
          {loading ? (
            <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Memuat data...
            </span>
          ) : isLive ? (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-medium">
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
              {liveSource} · {lastUpdate}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full font-medium">
              <WifiOff className="w-3.5 h-3.5" />
              {liveSource}
            </span>
          )}
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Overall progress card ── */}
      <div className="bg-gradient-to-r from-primary-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-white/80 text-sm mb-1 font-medium">Progress Keseluruhan Program (9 KPI)</p>
            <p className="text-4xl font-bold">{overallPct}%</p>
          </div>
          <div className="text-right text-sm">
            <p><span className="font-bold text-emerald-300">{selesai}</span> kegiatan selesai</p>
            <p><span className="font-bold text-amber-300">{dalamProses}</span> dalam proses</p>
            <p><span className="font-bold text-white/60">{items.length - selesai - dalamProses}</span> belum mulai</p>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className="bg-white rounded-full h-3 transition-all duration-1000"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* ── Items grouped by kategori ── */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-primary-400" />
        </div>
      ) : (
        Object.entries(kategoriMap).map(([kategori, kItems]) => (
          <div key={kategori}>
            <p className="text-xs font-bold uppercase tracking-wider text-navy-400 mb-3">{kategori}</p>
            <div className="space-y-3">
              {kItems.map((item) => {
                const sc = STATUS_CONFIG[item.status] ?? STATUS_CONFIG["Belum Mulai"];
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">{sc.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="font-medium text-navy-800 text-sm leading-snug">
                            {item.nama_kegiatan}
                          </p>
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border flex-shrink-0 ${sc.color}`}
                          >
                            {sc.label}
                          </span>
                        </div>
                        {item.target && (
                          <p className="text-primary-700 font-medium text-xs mt-1.5 bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-100 inline-block">
                            🎯 Target: {item.target}
                          </p>
                        )}
                        {item.catatan && (
                          <p className="text-navy-500 text-xs mt-1.5">{item.catatan}</p>
                        )}
                        <div className="mt-2.5 flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                            <div
                              className={`${sc.bar} rounded-full h-1.5 transition-all duration-700`}
                              style={{ width: `${item.persentase}%` }}
                            />
                          </div>
                          <span className="text-xs text-navy-400 font-medium flex-shrink-0">
                            {item.persentase}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
