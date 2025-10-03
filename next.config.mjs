/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ui-avatars.com"], // ✅ allow external avatar URLs
  },
};

export default nextConfig;
