/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    minimumCacheTTL: 900,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
      }
    ],
  }
}

export default nextConfig;
