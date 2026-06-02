import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. Without it, Next infers the root
  // from a stray package-lock.json higher up the tree and prints a warning.
  turbopack: {
    root: __dirname,
  },
  // Booking.com hotel photos are served from bstatic.com — allow next/image to
  // optimize them. (Hotel data comes from RapidAPI booking-com15.)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.bstatic.com" },
      { protocol: "https", hostname: "**.booking.com" },
    ],
  },
};

export default nextConfig;
