import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["source.unsplash.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
