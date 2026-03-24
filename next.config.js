/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Se o repo não for o root (usuario.github.io), defina: NEXT_PUBLIC_BASE_PATH=/nome-do-repo
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}
module.exports = nextConfig
