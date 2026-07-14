import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🌊</div>
        <h1 className="font-serif text-4xl font-bold text-navy-900 mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-navy-500 mb-8">
          Sepertinya halaman ini terbawa ombak. Kembali ke beranda dan temukan produk UMKM
          laut terbaik dari Banyusangka!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-ocean text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
