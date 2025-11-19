import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useSetAtom } from "jotai";

import { userData } from "@/atoms/userData";
import type { Mutation } from "@/generated/graphql";

const SIGN_IN = gql`
	mutation SignIn($email: String!, $password: String!) {
		signIn(data: { email: $email, password: $password }) {
			user {
				id
				email
				name
			}
		}
	}
`;

const SIGN_OUT = gql`
	mutation {
		signOut
	}
`;

export function useAccount() {
	const [signIn] = useMutation<Mutation>(SIGN_IN);
	const [signOut] = useMutation<Mutation>(SIGN_OUT);

	const setUserData = useSetAtom(userData);

	return {
		async signIn(email: string, password: string) {
			const { data } = await signIn({
				variables: {
					email,
					password,
				},
			});
			setUserData(data?.signIn.user);
			return data;
		},
		async signOut() {
			const { data } = await signOut();
			if (data) setUserData();
		},
	};
}
