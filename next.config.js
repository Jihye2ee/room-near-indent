/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, stale-if-error=10800"
        }
      ]
    }]
  },
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
  env: {
    'KAKAO_LOCAL_REST_API_KEY': '82d9ab1000c504dd128b37c78bb9af48'
  }
}

module.exports = nextConfig
