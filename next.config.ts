import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: true, // Indicates a permanent redirect with a 308 status code
      },
    ];
  },
};

export default nextConfig;
