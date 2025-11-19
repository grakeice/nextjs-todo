import { gql } from "@apollo/client";
import "@apollo/client/react";
import { atom } from "jotai";

import type { Query } from "@/generated/graphql";
import { makeClient } from "@/graphql/ApolloWrapper";

const userId = atom<string>();
const userEmail = atom<string>();
const userName = atom<string>();
const userSignedIn = atom<boolean>(false);

interface userDataAtom {
	id?: string;
	email?: string;
	name?: string;
	signedIn: boolean;
}

const userData = atom(
	async (get): Promise<userDataAtom> => {
		const id = get(userId);
		const email = get(userEmail);
		const name = get(userName);
		const signedIn = [id, email, name].every((v) => v);
		return { id, email, name, signedIn };
	},
	async (
		get,
		set,
		data?: Omit<userDataAtom, "signedIn"> & { init?: boolean },
	) => {
		if (!data) {
			[userId, userEmail, userName].forEach((v) => set(v, undefined));
			return;
		}

		if (data.init) {
			try {
				const { data } = await makeClient().query<Query>({
					query: gql`
						query {
							user {
								id
								email
								name
							}
						}
					`,
				});

				const user = data?.user;

				set(userId, user?.id);
				set(userEmail, user?.email);
				set(userName, user?.name);
			} catch (e) {
				console.warn(e);
			}
		} else {
			set(userId, data.id);
			set(userEmail, data.email);
			set(userName, data.name);
		}

		const signedIn = [userId, userEmail, userName]
			.map((v) => get(v))
			.every((v) => v);
		set(userSignedIn, signedIn);
	},
);

userData.onMount = (setAtom) => {
	setAtom({ init: true });
};

export { userData };
