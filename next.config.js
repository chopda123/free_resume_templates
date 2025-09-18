
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",   // allow all image paths
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",   // allow all sanity images
      },
    ],
  },
};

module.exports = nextConfig;
