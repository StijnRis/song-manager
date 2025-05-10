import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["http://192.168.68.105:3000/"],
    turbopack: {
        resolveAlias: {
            canvas: "./empty-module.ts",
        },
    },
};

export default nextConfig;
