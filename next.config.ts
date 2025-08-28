import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@messages": path.join(__dirname, "messages"),
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withNextIntl = createNextIntlPlugin(
  "./src/shared/configs/i18/request.ts"
);

export default withNextIntl(nextConfig);
