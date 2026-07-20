import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gudang Dokumentasi Internal",
  description: "Akses internal dokumentasi kegiatan program TAWSEC Banyusangka",
};

export default function DokumentasiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-950 text-white font-sans">
      {children}
    </div>
  );
}
