import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	generates: {
		"./src/generated/": {
			schema: "../backend/src/schema.gql",
			// documents: ["./src/**/*.{ts,tsx}"],
			preset: "client",
		},
	},
};
export default config;
