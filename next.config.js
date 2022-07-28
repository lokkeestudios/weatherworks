// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  baseUrl: './src',
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  compiler: {
    styledComponents: {
      displayName: true,
    },
  },
}

module.exports = nextConfig
