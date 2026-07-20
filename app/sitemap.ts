import type { MetadataRoute } from "next";
import produkData from "@/data/produk.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tawsec-banyusangka.vercel.app";

  const staticRoutes = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/tentang-desa`, lastModified: new Date() },
    { url: `${base}/program-tawsec`, lastModified: new Date() },
    { url: `${base}/katalog`, lastModified: new Date() },
    { url: `${base}/modul`, lastModified: new Date() },
    { url: `${base}/galeri`, lastModified: new Date() },
    { url: `${base}/update`, lastModified: new Date() },
    { url: `${base}/tim-mitra`, lastModified: new Date() },
    { url: `${base}/kontak`, lastModified: new Date() },
  ];

  const productRoutes = produkData.map((p) => ({
    url: `${base}/katalog/${p.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
