import { useQuery } from "@tanstack/react-query";

import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";

export function useAccount() {
	const data = useQuery({
		queryKey: ["user"],
		queryFn() {
			const a = execute(
				graphql(`
					query getUserData {
						user {
							id
							email
							name
						}
					}
				`),
			);
			a.then((v) => console.log(v));
			return a;
		},
	});
	console.log(data.data, "aaaa");
	return data.data;
}
