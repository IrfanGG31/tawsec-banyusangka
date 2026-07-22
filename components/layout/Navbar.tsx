"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang-desa", label: "Tentang Desa" },
  { href: "/program-tawsec", label: "Program TAWSEC" },
  { href: "/katalog", label: "Katalog" },
  { href: "/galeri", label: "Galeri" },
  { href: "/update", label: "Update" },
  { href: "/tim-mitra", label: "Tim & Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hide navbar on admin and internal documentation routes
  if (pathname?.startsWith("/dokumentasi") || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo (Indorelawan Style) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 group-hover:scale-105 transition-transform bg-sky-50 rounded-xl p-1 border border-sky-100 shadow-sm flex items-center justify-center">
              <Image
                src="/images/logos/logo-tawsec.png"
                alt="Logo TAWSEC"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="leading-tight">
              <span className="font-serif font-bold text-base text-navy-950 block tracking-tight group-hover:text-sky-600 transition-colors">
                TAWSEC
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 block">
                Banyusangka
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (6 Crisp Menu Items) */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-sky-50 text-sky-700 border border-sky-200/60 font-bold"
                      : "text-slate-700 hover:text-sky-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/katalog"
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-sunset-500 to-orange-600 hover:from-sunset-600 hover:to-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow hover:shadow-md active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Beli Produk
            </Link>

            <button
              id="navbar-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-2xl">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    isActive
                      ? "bg-sky-50 text-sky-700 font-bold border border-sky-200/60"
                      : "text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/katalog"
              onClick={() => setIsOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-sunset-500 to-orange-600 text-white py-3 rounded-xl font-bold text-sm shadow"
            >
              <ShoppingBag className="w-4 h-4" />
              Beli Produk Olahan Laut
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
