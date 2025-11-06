import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  cacheLife: {
    infinity: {
      revalidate: Infinity,
      //expire: Infinity,
    },
  },
};

export default nextConfig;
