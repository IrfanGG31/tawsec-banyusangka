"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Circle, RefreshCw, Wifi, WifiOff } from "lucide-react";
import fallbackData from "@/data/progress-fallback.json";
import { config } from "@/lib/config";

type StatusType = "Selesai" | "Dalam Proses" | "Belum Mulai";

interface ProgressItem {
  id: string;
  kategori: string;
  nama_kegiatan: string;
  target?: string;
  status: StatusType;
  persentase: number;
  tanggal_update: string;
  catatan: string;
}

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

function parseCSV(csv: string): ProgressItem[] {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];
  // skip header row
  return lines.slice(1).map((line) => {
    const cols = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
    return {
      id: cols[0] ?? "",
      kategori: cols[1] ?? "",
      nama_kegiatan: cols[2] ?? "",
      status: (cols[3] as StatusType) ?? "Belum Mulai",
      persentase: parseInt(cols[4] ?? "0", 10) || 0,
      tanggal_update: cols[5] ?? "",
      catatan: cols[6] ?? "",
    };
  });
}

export function ProgressTracker() {
  const [items, setItems] = useState<ProgressItem[]>(fallbackData as ProgressItem[]);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchData = async () => {
    const csvUrl = config.PROGRESS_SHEET_CSV_URL;
    if (!csvUrl) {
      setIsLive(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(csvUrl, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const csv = await res.text();
      const parsed = parseCSV(csv);
      if (parsed.length > 0) {
        setItems(parsed);
        setIsLive(true);
        setLastUpdate(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
      }
    } catch {
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selesai = items.filter((i) => i.status === "Selesai").length;
  const dalamProses = items.filter((i) => i.status === "Dalam Proses").length;
  const overallPct = items.length > 0 ? Math.round(items.reduce((s, i) => s + i.persentase, 0) / items.length) : 0;

  // Group by kategori
  const kategoriMap = items.reduce<Record<string, ProgressItem[]>>((acc, item) => {
    if (!acc[item.kategori]) acc[item.kategori] = [];
    acc[item.kategori].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-serif font-bold text-navy-900 text-xl">Progress Kegiatan</h3>
          <p className="text-navy-500 text-sm">Real-time update dari tim lapangan</p>
        </div>
        <div className="flex items-center gap-3">
          {isLive ? (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              <Wifi className="w-3 h-3" />
              Live · {lastUpdate}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full">
              <WifiOff className="w-3 h-3" />
              Data lokal
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

      {/* Overall progress */}
      <div className="bg-gradient-to-r from-primary-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-white/70 text-sm mb-1">Progress Keseluruhan Program</p>
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

      {/* Items grouped by kategori */}
      {Object.entries(kategoriMap).map(([kategori, kItems]) => (
        <div key={kategori}>
          <p className="text-xs font-bold uppercase tracking-wider text-navy-400 mb-3">{kategori}</p>
          <div className="space-y-3">
            {kItems.map((item) => {
              const sc = STATUS_CONFIG[item.status] ?? STATUS_CONFIG["Belum Mulai"];
              return (
                <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">{sc.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="font-medium text-navy-800 text-sm leading-snug">{item.nama_kegiatan}</p>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border flex-shrink-0 ${sc.color}`}>
                          {sc.label}
                        </span>
                      </div>
                      {item.target && (
                        <p className="text-primary-700 font-medium text-xs mt-1 bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-100 inline-block">
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
                        <span className="text-xs text-navy-400 font-medium flex-shrink-0">{item.persentase}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {config.PROGRESS_SHEET_CSV_URL === "" && (
        <p className="text-center text-xs text-gray-400 pt-2">
          💡 Update progress? Edit <code className="bg-gray-100 px-1 rounded">data/progress-fallback.json</code> atau sambungkan Google Sheets di <code className="bg-gray-100 px-1 rounded">lib/config.ts</code>
        </p>
      )}
    </div>
  );
}
