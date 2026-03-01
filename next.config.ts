import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Subpath for nginx reverse proxy — set NEXT_PUBLIC_BASE_PATH in .env.production
  // assetPrefix must match basePath so /_next/static requests are also prefixed
  // with /oscars, keeping all traffic under one nginx location block (safe for
  // multi-app servers where a global /_next/ block would cause conflicts).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // Allow Next.js <Image> to load from TMDB CDN
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
