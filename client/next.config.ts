import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_APP_BACKEND_URL: process.env.NEXT_APP_BACKEND_URL,
  },
};

export default nextConfig;
