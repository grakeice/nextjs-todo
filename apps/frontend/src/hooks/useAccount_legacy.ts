// import { useSetAtom } from "jotai";

// import { userData } from "@/atoms/userData";
// import { graphql } from "@/graphql";
// import { useMutation } from "@tanstack/react-query";
// import { execute } from "@/graphql/execute";

// const SIGN_IN = graphql(`
// 	mutation SignIn($email: String!, $password: String!) {
// 		signIn(data: { email: $email, password: $password }) {
// 			user {
// 				id
// 				email
// 				name
// 			}
// 		}
// 	}
// `);

// const SIGN_OUT = graphql(`
// 	mutation signOut {
// 		signOut
// 	}
// `;)

// export function useAccount() {
// 	const {data} =
// 	const [signOut] = useMutation<Mutation>(SIGN_OUT);

// 	const setUserData = useSetAtom(userData);

// 	return {
// 		async signIn(email: string, password: string) {
// 			const { data } = await signIn({
// 				variables: {
// 					email,
// 					password,
// 				},
// 			});
// 			setUserData(data?.signIn.user);
// 			return data;
// 		},
// 		async signOut() {
// 			const { data } = await signOut();
// 			if (data) setUserData();
// 		},
// 	};
// }
