"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { config } from "@/lib/config";

export default function StickyMobileCTA() {
  const pathname = usePathname();

  // Hide on admin and internal documentation pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dokumentasi")) {
    return null;
  }

  const waLink = `https://wa.me/${config.WA_NUMBER}?text=${encodeURIComponent(
    "Halo Tim TAWSEC Banyusangka, saya ingin memesan produk olahan laut (Abon/Kerupuk/Tepung)."
  )}`;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:hidden z-40 pointer-events-auto">
      <div className="bg-navy-950/95 backdrop-blur-xl border border-white/20 p-2.5 rounded-2xl shadow-2xl flex items-center justify-between gap-2">
        <Link
          href="/katalog"
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-sunset-500 to-orange-600 hover:from-sunset-600 hover:to-orange-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow transition-all active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          Katalog Produk
        </Link>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow transition-all active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          Pesan via WA
        </a>
      </div>
    </div>
  );
}
