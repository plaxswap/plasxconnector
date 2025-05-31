/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs')
const { withAxiom } = require('next-axiom')
const path = require('path')
const BundleAnalyzer = require('@next/bundle-analyzer')
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const smartRouterPkgs = require('@pancakeswap/smart-router/package.json')
const { withWebSecurityHeaders } = require('@pancakeswap/next-config/withWebSecurityHeaders')

const __dirname = path.dirname(__filename)

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const withVanillaExtract = createVanillaExtractPlugin()

const sentryWebpackPluginOptions =
  process.env.VERCEL_ENV === 'production'
    ? {
        silent: false,
        validate: true,
        hideSourceMaps: false,
      }
    : {
        hideSourceMaps: false,
        silent: true,
        dryRun: !process.env.SENTRY_AUTH_TOKEN,
      }

const workerDeps = Object.keys(smartRouterPkgs.dependencies)
  .map((d) => d.replace('@pancakeswap/', 'packages/'))
  .concat(['/packages/smart-router/', '/packages/swap-sdk/', '/packages/token-lists/'])

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
    outputFileTracingRoot: path.join(__dirname, '../../'),
    outputFileTracingExcludes: {
      '*': ['**@swc+core*', '**/@esbuild**'],
    },
  },
  transpilePackages: [
    '@pancakeswap/ui',
    '@pancakeswap/uikit',
    '@pancakeswap/farms',
    '@pancakeswap/pools',
    '@pancakeswap/localization',
    '@pancakeswap/hooks',
    '@pancakeswap/utils',
  ],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-nft.pancakeswap.com',
        pathname: '/mainnet/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/info/token/:address',
        destination: '/info/tokens/:address',
      },
      {
        source: '/info/pool/:address',
        destination: '/info/pools/:address',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [{ key: 'Cache-Control', value: 'public, immutable, max-age=31536000' }],
      },
      {
        source: '/logo.png',
        headers: [{ key: 'Cache-Control', value: 'public, immutable, max-age=31536000' }],
      },
      {
        source: '/images/:all*',
        headers: [{ key: 'Cache-Control', value: 'public, immutable, max-age=31536000' }],
      },
      {
        source: '/images/tokens/:all*',
        headers: [{ key: 'Cache-Control', value: 'public, immutable, max-age=604800' }],
      },
    ]
  },
  async redirects() {
    return [
      { source: '/send', destination: '/swap', permanent: true },
      { source: '/swap/:outputCurrency', destination: '/swap?outputCurrency=:outputCurrency', permanent: true },
      { source: '/create/:currency*', destination: '/add/:currency*', permanent: true },
      { source: '/farms/archived', destination: '/farms/history', permanent: true },
      { source: '/pool', destination: '/liquidity', permanent: true },
      { source: '/staking', destination: '/pools', permanent: true },
      { source: '/syrup', destination: '/pools', permanent: true },
      { source: '/collectibles', destination: '/nfts', permanent: true },
      { source: '/info/pools', destination: '/info/pairs', permanent: true },
      { source: '/info/pools/:address', destination: '/info/pairs/:address', permanent: true },
      { source: '/api/v3/:chainId/farms/liquidity/:address', destination: 'https://farms-api.pancakeswap.com/v3/:chainId/liquidity/:address', permanent: false },
      { source: '/images/tokens/:address', destination: 'https://tokens.pancakeswap.finance/images/:address', permanent: false },
    ]
  },
  webpack: (webpackConfig, { webpack, isServer }) => {
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false,
      })
    )

    if (!isServer && webpackConfig.optimization.splitChunks) {
      // eslint-disable-next-line no-param-reassign
      webpackConfig.optimization.splitChunks.cacheGroups.workerChunks = {
        chunks: 'all',
        test(module) {
          const resource = module.nameForCondition?.() ?? ''
          return resource ? workerDeps.some((d) => resource.includes(d)) : false
        },
        priority: 31,
        name: 'worker-chunks',
        reuseExistingChunk: true,
      }
    }

    return webpackConfig
  },
}

module.exports = withBundleAnalyzer(
  withVanillaExtract(withSentryConfig(withAxiom(withWebSecurityHeaders(config)), sentryWebpackPluginOptions))
)
