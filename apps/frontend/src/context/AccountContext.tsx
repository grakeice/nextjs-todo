"use client";

import {
	createContext,
	useState,
	type JSX,
	type PropsWithChildren,
} from "react";

import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

import type { LoginResponse, Query, User } from "@/generated/graphql";

interface AccountContextValues {
	data: Pick<User, "id" | "email" | "name"> | null;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	signedIn: boolean;
}

export const AccountContext = createContext<AccountContextValues | undefined>(
	undefined,
);

const SIGN_IN = gql`
	mutation SignIn($email: String!, $password: String!) {
		signIn(data: { email: $email, password: $password }) {
			user {
				id
			}
		}
	}
`;

const SIGN_OUT = gql`
	mutation {
		signOut
	}
`;

export function AccountProvider({ ...props }: PropsWithChildren): JSX.Element {
	const [userData, setUserData] = useState<Pick<
		User,
		"id" | "email" | "name"
	> | null>(null);
	const [signedIn, setSignedIn] = useState(false);

	const [signIn] = useMutation<LoginResponse>(SIGN_IN);

	const [signOut] = useMutation(SIGN_OUT);

	const { data } = useQuery<Query>(gql`
		query {
			user {
				id
				email
				name
			}
		}
	`);
	if (data?.user) {
		setUserData(data.user);
		setSignedIn(true);
	}
	console.log(data?.user);
	return (
		<AccountContext.Provider
			value={{
				signedIn,
				data: userData,
				async signIn(email, password) {
					const { data } = await signIn({
						variables: { email, password },
					});
					if (data) {
						setUserData(data.user);
						setSignedIn(true);
					}
				},
				async signOut() {
					await signOut();
					setUserData(null);
					setSignedIn(false);
				},
			}}
		>
			{props.children}
		</AccountContext.Provider>
	);
}
