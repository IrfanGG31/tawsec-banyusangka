"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DokumentasiLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/dokumentasi");
        router.refresh();
      } else {
        setError(data.error || "Password salah, silakan coba lagi.");
      }
    } catch {
      setError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-navy-950 via-primary-950 to-navy-900">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-sunset-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-primary-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Akses Terproteksi
          </span>
          <h1 className="font-serif text-2xl font-bold text-white">Akses Internal Tim TAWSEC</h1>
          <p className="text-white/60 text-sm mt-2">
            Masukkan password tim untuk mengakses gudang dokumentasi &amp; berkas kegiatan.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
              Password Internal
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-sm text-center">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-sunset-500 hover:bg-sunset-600 active:scale-95 text-white font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memverifikasi..." : "Masuk Halaman Internal"}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda Publik
          </Link>
        </div>
      </div>
    </div>
  );
}
