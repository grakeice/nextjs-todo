import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		return [
			{
				source: "/graphql",
				destination:
					process.env.BACKEND_GRAPHQL_URL ||
					"http://127.0.0.1:4000/graphql",
			},
		];
	},
};

export default nextConfig;
