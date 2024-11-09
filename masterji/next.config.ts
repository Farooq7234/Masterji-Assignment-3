import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'media.wired.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'gizmodo.com',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
