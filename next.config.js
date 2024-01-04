const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
	env: {
		API_HOST: process.env.API_HOST,
		API_PORT: process.env.API_PORT,
		API_PROTOCOL: process.env.API_PROTOCOL,
		API_STATIC_PATHNAME: process.env.API_STATIC_PATHNAME,
		API_PATHNAME: process.env.API_PATHNAME,
		API_URL_DEV: process.env.API_URL_DEV,
		API_STATIC_URL_DEV: process.env.API_STATIC_URL_DEV,
	},
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				hostname: process.env.API_HOST,
				pathname: `/${process.env.API_STATIC_PATHNAME}/**`,
				protocol: process.env.API_PROTOCOL,
				port: process.env.API_PORT,
			},
		],
	},
	rewrites: async () => {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.API_URL_DEV}/:path*`,
			},
			{
				source: '/static/:path*',
				destination: `${process.env.API_STATIC_URL_DEV}/:path*`,
			},
		];
	},
});

module.exports = nextConfig;
