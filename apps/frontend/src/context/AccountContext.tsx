"use client";

import {
	createContext,
	useState,
	type JSX,
	type PropsWithChildren,
} from "react";

import { gql } from "@apollo/client";
import { useMutation, useQuery, useSuspenseQuery } from "@apollo/client/react";
import { z } from "zod";

import type { LoginResponse, Query, User } from "@/generated/graphql";

interface AccountContextValues {
	data: Pick<User, "id" | "email" | "name"> | null;
	signIn: (
		email: string,
		password: string,
	) => Promise<LoginResponse | undefined>;
	signOut: () => Promise<void>;
	signedIn: boolean;
}

export const AccountContext = createContext<AccountContextValues | undefined>(
	undefined,
);

export const signInSchema = z.object({
	email: z.email(),
	password: z.string(),
});

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

	const [signIn] = useMutation<LoginResponse>(SIGN_IN);
	const [signOut] = useMutation(SIGN_OUT);

	const { data } = useSuspenseQuery<Query>(
		gql`
			query {
				user {
					id
					email
					name
				}
			}
		`,
		{ errorPolicy: "ignore" },
	);
	console.log(data?.user);

	const value: AccountContextValues = {
		get signedIn() {
			if (data?.user) return true;
			else return false;
		},
		data: userData,
		async signIn(email, password) {
			const { data } = await signIn({
				variables: z.parse(signInSchema, { email, password }),
			});
			if (data) {
				setUserData(data.user);
			}
			return data;
		},
		async signOut() {
			await signOut();
			setUserData(null);
		},
	};
	return (
		<AccountContext.Provider value={value}>
			{props.children}
		</AccountContext.Provider>
	);
}
