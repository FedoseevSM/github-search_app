/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: "/github-search_app",
  assetPrefix: "/github-search_app",
}

module.exports = nextConfig
