import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  // APIのプロキシ設定（開発環境用）
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:3001/api/:path*",
      },
    ];
  },
};

export default nextConfig;
