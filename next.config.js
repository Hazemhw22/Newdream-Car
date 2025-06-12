/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
    domains: ["images.pexels.com"], // 👈 أضف هذا السطر
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      bufferutil: false,
      "utf-8-validate": false,
    };
    return config;
  },
};

module.exports = nextConfig;
