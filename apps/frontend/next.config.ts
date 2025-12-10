import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		return [
			{
				source: "/graphql",
				destination: "/api/graphql",
			},
		];
	},
};

export default nextConfig;
