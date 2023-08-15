/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    imageSizes: [64, 96, 128],
    deviceSizes: [640, 768, 1024, 1200],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
