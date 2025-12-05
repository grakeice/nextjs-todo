import { useQuery } from "@tanstack/react-query";

import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";

export function useAccount() {
	const data = useQuery({
		queryKey: ["user"],
		queryFn: () =>
			execute(
				graphql(`
					query getUserData {
						user {
							id
							email
							name
						}
					}
				`),
			),
	});

	return data.data;
}
