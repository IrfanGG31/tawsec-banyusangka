import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { ShoppingCart, Clock } from "lucide-react";

interface Varian {
  ukuran: string;
  harga: number;
}

interface Produk {
  id: string;
  nama: string;
  kategori: string;
  tagline: string;
  deskripsi: string;
  varian: Varian[];
  foto: string[];
  status_halal: string;
  tersedia: boolean;
}

export default function ProductCard({ produk }: { produk: Produk }) {
  const hargaMulai = Math.min(...produk.varian.map((v) => v.harga));

  return (
    <Link href={`/katalog/${produk.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
        {/* Image */}
        <div className="relative h-56 bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
          <Image
            src={produk.foto[0]}
            alt={produk.nama}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-primary-200">
              {produk.kategori}
            </span>
            {produk.status_halal === "Halal" && (
              <span className="bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                ✓ Halal
              </span>
            )}
            {produk.status_halal === "Dalam proses sertifikasi" && (
              <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" /> Proses Halal
              </span>
            )}
          </div>
          {!produk.tersedia && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-navy-800 font-semibold px-4 py-2 rounded-full text-sm">
                Stok Habis
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif font-bold text-navy-900 text-lg mb-1 group-hover:text-primary-700 transition-colors">
            {produk.nama}
          </h3>
          <p className="text-navy-500 text-sm mb-3 line-clamp-2">{produk.tagline}</p>

          {/* Variants */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {produk.varian.map((v) => (
              <span
                key={v.ukuran}
                className="text-xs bg-primary-50 text-primary-700 border border-primary-200 px-2 py-0.5 rounded-full"
              >
                {v.ukuran}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-navy-400">Mulai dari</span>
              <p className="text-primary-700 font-bold text-lg leading-tight">
                {formatRupiah(hargaMulai)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-sunset-500 text-white text-sm font-semibold px-4 py-2 rounded-xl group-hover:bg-sunset-600 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              Pesan
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
