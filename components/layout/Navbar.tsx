"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang-desa", label: "Tentang Desa" },
  { href: "/program-tawsec", label: "Program TAWSEC" },
  { href: "/katalog", label: "Katalog" },
  { href: "/modul", label: "Modul" },
  { href: "/galeri", label: "Galeri" },
  { href: "/tim-mitra", label: "Tim & Mitra" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-primary-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 group-hover:scale-105 transition-transform bg-white/10 rounded-lg p-0.5">
              <Image
                src="/images/logos/logo-tawsec.png"
                alt="Logo TAWSEC"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div className="leading-tight">
              <span
                className={`font-serif font-bold text-base leading-none block transition-colors ${
                  scrolled ? "text-primary-800" : "text-white"
                }`}
              >
                TAWSEC
              </span>
              <span
                className={`text-xs leading-none transition-colors ${
                  scrolled ? "text-primary-500" : "text-primary-200"
                }`}
              >
                Banyusangka
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary-50 hover:text-primary-700 ${
                  scrolled ? "text-navy-700" : "text-white hover:text-primary-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/katalog"
              className="hidden sm:flex items-center gap-1.5 bg-sunset-500 hover:bg-sunset-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              🛒 Beli Produk
            </Link>
            <button
              id="navbar-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-navy-700 hover:bg-primary-50"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-primary-100 shadow-xl">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-xl text-navy-700 font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/katalog"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 bg-sunset-500 text-white py-3 rounded-xl font-semibold text-sm"
            >
              🛒 Beli Produk Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
