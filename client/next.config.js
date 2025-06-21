/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  output: 'export',
  trailingSlash: true,
  compiler: { emotion: true },
  transpilePackages: ['api'],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  env: { clientVersion: `v${require('./package.json').version}` },
};
