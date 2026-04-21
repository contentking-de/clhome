import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    incomingRequests: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "suudphdtlchxrc5q.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
