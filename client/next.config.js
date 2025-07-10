/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: 'export',
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  trailingSlash: true,
  transpilePackages: ['api'],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  env: { clientVersion: `v${require('./package.json').version}` },
};
