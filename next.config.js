/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: "http://localhost:3000/",
    STORAGE_URL:
      "https://firebasestorage.googleapis.com/v0/b/tpa-web-a33b2.appspot.com/o/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
