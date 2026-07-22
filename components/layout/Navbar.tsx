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

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-sky-50 text-sky-700 font-bold border border-sky-200/80 shadow-sm"
                      : "text-navy-700 hover:text-sky-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/katalog"
              id="nav-cta-beli"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sunset-500 to-orange-500 hover:from-sunset-600 hover:to-orange-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Beli Produk</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle Menu"
              className="p-2 text-navy-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-sky-50 text-sky-700 font-bold border border-sky-100"
                    : "text-navy-800 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100 mt-2">
            <Link
              href="/katalog"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-sunset-500 to-orange-500 text-white font-bold text-sm py-3 rounded-xl shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Beli Produk Olahan Laut</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
