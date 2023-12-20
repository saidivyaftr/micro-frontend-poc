/**
 * @type {import('next').NextConfig}
 */
const withPlugins = require('next-compose-plugins')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
// const optimizedImages = require('next-optimized-images');
const isProduction = process.env.NODE_ENV === 'production'
const basePath = '/pages'
const S3_URL = process.env.S3_URL
const sdkVersion = process.env.sdkVersion
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
})
console.log(process.env.DOTCOM_URL)
module.exports = withPlugins([withBundleAnalyzer], {
  staticPageGenerationTimeout: 1200000,
  experimental: {
    optimizeCss: true,
    images: {
      allowFutureImage: true,
      domains: ['localhost', 'content-qat.frontier.com'],
    },
  },
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      return config
    } else if (!isProduction) {
      return config
    }
    // else if (isProduction) {
    //   config.optimization.splitChunks.cacheGroups.commons.minChunks = 10;
    //   return config
    // }
    // config.plugins.push(
    //   new webpack.optimize.LimitChunkCountPlugin({
    //     maxChunks: 3,
    //   }),
    // )
    // config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}))
    return config
  },
  basePath,
  reactStrictMode: true,
  compress: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [420, 768, 1366],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    domains: [
      'frontier.com',
      'tundra.frontier.redventures.io',
      'frontier.com',
      'stoqapaasrg-634540-cdn-endpoint.azureedge.net',
      'vsgstoqarg-539670-cdn-endpoint.azureedge.net',
      'vsgprdstopaasrg-151210-cdn-endpoint.azureedge.net',
      'cdnftrdoornp-fagccygrcfhmegf0.z01.azurefd.net',
      'content-qat.frontier.com',
      'content.frontier.com',
      'cdn.cookielaw.org',
    ],
    minimumCacheTTL: 600,
  },
  swcMinify: true,
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value:
              'ALLOW-FROM https://business.frontier.com https://business-qat2.frontier.com self',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self' https: *.cloudfront.net *.frontier.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: *.frontier.com *.invoca.net ; script-src-elem 'self' 'unsafe-inline' https: *.frontier.com *.googleapis.com *.adobedtm.com *.monetate.net *.invocacdn.com *.invoca.net *.cloudfront.net; style-src 'self' https: 'unsafe-inline' *.frontier.com *.cloudfront.net *.bootstrapcdn.com *.github.io *.jquery.com; worker-src 'self' 'unsafe-inline' blob: https: *.frontier.com; img-src 'self' https: blob: *.frontier.com data: *.everesttech.net *.cloudfront.net; media-src 'self' https: data: blob: *.frontier.com; font-src 'self' https: data: *.frontier.com *.cloudfront.net; base-uri 'self' *.frontier.com; connect-src 'self' https: *.frontier.com *.demdex.net ws: wss:; object-src 'none'; form-action 'self' https: *.frontier.com; frame-src 'self' https: *.frontier.com *.fls.doubleclick.net *.frontiercomm.demdex.net;",
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-XSS-Protection',
            value: '1',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|png|woff|gif|ttf)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          },
        ],
      },
      {
        source: '/:all*(js|css|scss)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          },
        ],
      },
      {
        source: '/pp_fonts/:all*(eot|otf|ttf|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  env: {
    BRIGHTCOVE_ACCOUNT_ID: process.env.BRIGHTCOVE_ACCOUNT_ID,
    BRIGHTCOVE_PLAYER_ID: process.env.BRIGHTCOVE_PLAYER_ID,
    APIGEE_BASE_URL: process.env.APIGEE_BASE_URL,
    APIGEE_API_KEY: process.env.APIGEE_API_KEY,
    APIGEE_API_SECRET: process.env.APIGEE_API_SECRET,
    DOTCOM_URL: process.env.DOTCOM_URL,
    GOOGLE_CAPTCHA_KEY: process.env.GOOGLE_CAPTCHA_KEY,
    GOOGLE_CAPTCHA_V3_PUBLIC_KEY: process.env.GOOGLE_CAPTCHA_V3_PUBLIC_KEY,
    CAPTCHA_INVIS_KEY: process.env.CAPTCHA_INVIS_KEY,
    CALIFORNIA_API_KEY: process.env.CALIFORNIA_API_KEY,
    CALIFORNIA_API_SECRET:
      process.env.CALIFORNIA_API_SECRET,
    ONE_TRUST_DOMAIN_KEY: process.env.ONE_TRUST_DOMAIN_KEY,
    ACCOUNT_EXPERIENCE_RATIO : process.env.ACCOUNT_EXPERIENCE_RATIO,
    ACCOUNT_EXPERIENCE_COOKIE : process.env.ACCOUNT_EXPERIENCE_COOKIE,
    CDN_URL: process.env.CDN_URL
  },
  publicRuntimeConfig: {
    basePath,
    S3_URL,
    sdkVersion,
  },
  compiler: {
    removeConsole: {
      exclude:
        process.env.environment === 'production'
          ? ['error']
          : ['log', 'error', 'warn', 'info'],
    },
  },
  async redirects() {
    return [
      {
        source: '/myfiber',
        destination: '/why-frontier/why-fiber-internet/fiber-expansion',
        permanent: true,
      },
    ]
  },
})
