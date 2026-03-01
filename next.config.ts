import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Subpath for nginx reverse proxy — set NEXT_PUBLIC_BASE_PATH=/oscars in env file
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

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
