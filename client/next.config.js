/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  transpilePackages: ['api'],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  env: { clientVersion: `v${require('./package.json').version}` },
};
