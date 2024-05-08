const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				hostname: process.env.API_HOST,
				pathname: `/images/**`,
				protocol: process.env.API_PROTOCOL,
				port: process.env.STORAGE_PORT,
			},
		],
	},
	rewrites: async () => {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.API_URL}/api/:path*`,
			},
			{
				source: '/storage/:path*',
				destination: `${process.env.STORAGE_URL}/:path*`,
			},
		];
	},
});

module.exports = nextConfig;
