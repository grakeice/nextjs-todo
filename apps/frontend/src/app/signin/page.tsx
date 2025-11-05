"use client";

import React, { useState } from "react";
import type { JSX } from "react";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

import type { LoginResponse } from "@/generated/graphql";

export default function Page(): JSX.Element {
	const SIGN_IN = gql`
		mutation SignIn($email: String!, $password: String!) {
			signIn(data: { email: $email, password: $password }) {
				access_token
			}
		}
	`;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signIn, { data, loading, error }] =
		useMutation<LoginResponse>(SIGN_IN);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await signIn({ variables: { email, password } });
			console.log(res.data?.access_token);
			// handle success
		} catch {
			// handle error
		}
	};

	return (
		<div>
			<h1>サインイン</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="email"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="password"
					type="password"
				/>
				<button type="submit" disabled={loading}>
					Sign in
				</button>
			</form>
			{error && <div>{String(error)}</div>}
			{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
		</div>
	);
}
