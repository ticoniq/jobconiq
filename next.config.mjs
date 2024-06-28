/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    WEBSITE_URL: process.env.WEBSITE_URL,
    WEBSITE_EMAIL: process.env.WEBSITE_EMAIL,
  },
};

export default nextConfig;
