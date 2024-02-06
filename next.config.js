/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'commondatastorage.googleapis.com',
          },
          {
            protocol: 'https',
            hostname: 'yt3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'utfs.io',
          },
        ],
      },
}

module.exports = nextConfig
