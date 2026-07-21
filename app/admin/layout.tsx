import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Admin TAWSEC",
  description: "Panel Pengelolaan Konten & Real-Time Data Program TAWSEC Banyusangka",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {children}
    </div>
  );
}
