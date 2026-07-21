"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { KeyRound, ShieldAlert, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    if (!supabase) {
      setError("Supabase belum terkonfigurasi. Silakan atur environment variables NEXT_PUBLIC_SUPABASE_URL & ANON_KEY.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Email atau password admin salah.");
      } else if (data.session) {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Terjadi kesalahan koneksi ke Supabase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-slate-100">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
            <KeyRound className="w-8 h-8" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-orange-400" /> Panel Operator Admin
          </span>
          <h1 className="font-serif text-2xl font-bold text-white">Login Operator TAWSEC</h1>
          <p className="text-slate-400 text-sm mt-2">
            Masuk menggunakan akun admin Supabase Auth untuk mengelola data website secara live.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Email Admin
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@tawsec.or.id"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Password Admin
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-medium">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Memverifikasi...
              </>
            ) : (
              "Masuk Dashboard Admin"
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda Publik
          </Link>
        </div>
      </div>
    </div>
  );
}
