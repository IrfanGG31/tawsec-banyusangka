import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/kontak",
        destination: "/tim-mitra#kontak",
        permanent: true,
      },
      {
        source: "/modul",
        destination: "/program-tawsec#modul",
        permanent: true,
      },
      {
        source: "/galeri",
        destination: "/update",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
