/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config) => {
  //   config.resolve.alias.canvas = false;

  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        hostname: "f4nw9e2cwax6y3mx.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
