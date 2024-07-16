/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "api.admin.webmanza.com",
      "sg-api.admin.webmanza.com",
      "dummyimage.com",
    ],
  },
};

module.exports = nextConfig;
