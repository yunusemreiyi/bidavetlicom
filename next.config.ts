import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain shared hosting (cPanel vb.) has no Node.js runtime, so we ship a
  // fully static build: `npm run build` writes ready-to-upload HTML/CSS/JS
  // into ./out — no server process required.
  output: "export",
  // /kurumsal → /kurumsal/index.html instead of /kurumsal.html, so plain
  // Apache/cPanel hosting serves it with no rewrite rules needed.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
