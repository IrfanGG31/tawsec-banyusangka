"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, ExternalLink } from "lucide-react";

const quickLinks = [
  { href: "/tentang-desa", label: "Tentang Desa" },
  { href: "/program-tawsec", label: "Program TAWSEC" },
  { href: "/katalog", label: "Katalog Produk" },
  { href: "/modul", label: "Modul Pelatihan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/tim-mitra", label: "Tim & Mitra" },
];

const produkLinks = [
  { href: "/katalog/abon-ikan-tongkol", label: "Abon Ikan Tongkol" },
  { href: "/katalog/kerupuk-kulit-ikan", label: "Kerupuk Kulit Ikan" },
  { href: "/katalog/tepung-tulang-ikan", label: "Tepung Tulang Ikan" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dokumentasi") || pathname?.startsWith("/admin")) {
    return null;
  }
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      {/* Wave top */}
      <div className="relative h-16 bg-white overflow-hidden">
        <svg
          viewBox="0 0 1440 64"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C360,0 720,64 1080,32 C1260,16 1380,48 1440,64 L1440,64 L0,64 Z"
            fill="#0f172a"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 bg-white/10 rounded-xl p-0.5">
                <Image
                  src="/images/logos/logo-tawsec.png"
                  alt="Logo TAWSEC"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-lg block leading-none">TAWSEC</span>
                <span className="text-primary-300 text-xs">Banyusangka</span>
              </div>
            </div>
            <p className="text-navy-300 text-sm leading-relaxed mb-4">
              Transformasi Ekonomi Pesisir melalui Sinergi Aksi Mandiri — Program
              UNAIR SUSTAINACTION 2026 oleh UKM-F Penalaran AcSES FEB Universitas Airlangga di Desa Banyusangka, Bangkalan, Madura.
            </p>
            <div className="flex items-start gap-2 text-navy-400 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" />
              <span>Desa Banyusangka, Kec. Tanjung Bumi, Kab. Bangkalan, Madura</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-400 hover:text-primary-300 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produk */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Produk Kami
            </h3>
            <ul className="space-y-2">
              {produkLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-400 hover:text-primary-300 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-navy-800 rounded-xl">
              <p className="text-xs text-navy-400 mb-1">Pesan via WhatsApp</p>
              <a
                href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20memesan%20produk%20TAWSEC%20Banyusangka."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-semibold text-sm hover:text-emerald-300 flex items-center gap-1"
              >
                📱 Chat Sekarang
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* SDGs */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Kaitan SDGs
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { num: 1, label: "Tanpa Kemiskinan", color: "#e5243b" },
                { num: 5, label: "Kesetaraan Gender", color: "#ef402d" },
                { num: 8, label: "Pekerjaan Layak", color: "#a21942" },
                { num: 14, label: "Ekosistem Laut", color: "#0a97d9" },
              ].map((sdg) => (
                <div
                  key={sdg.num}
                  className="flex items-center gap-2 p-2 bg-navy-800 rounded-lg"
                >
                  <div className="relative w-8 h-8 rounded-md overflow-hidden shadow-md flex-shrink-0">
                    <Image
                      src={`/images/sdgs/sdg-${sdg.num}.svg`}
                      alt={`SDG ${sdg.num} Icon`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-navy-400 text-xs leading-tight">{sdg.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-navy-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-navy-500 text-xs text-center sm:text-left">
            © {currentYear} TAWSEC Banyusangka — Program UNAIR SUSTAINACTION 2026 oleh UKM-F Penalaran AcSES FEB Universitas Airlangga.
            <br className="sm:hidden" /> Dibangun dengan ❤️ untuk kemajuan UMKM pesisir Madura.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-navy-500 text-xs">Penyelenggara:</span>
            <div className="flex items-center gap-2 bg-navy-800 px-3 py-1.5 rounded-lg border border-navy-700">
              <div className="relative w-5 h-5">
                <Image
                  src="/images/logos/logo-unair-biru.png"
                  alt="UNAIR"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-xs">UNAIR</span>
              <span className="text-navy-500 text-xs">×</span>
              <span className="text-emerald-400 font-bold text-xs">AcSES FEB</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
