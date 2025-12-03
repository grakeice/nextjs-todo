import { atom } from "jotai";

export interface UserData {
	data?: {
		id?: string;
		email?: string;
		name?: string;
	};
	signedIn: boolean;
}

const userId = atom<string>();
const userEmail = atom<string>();
const userName = atom<string>();

export const userDataAtom = atom(
	(get): UserData => {
		const data = {
			id: get(userId),
			email: get(userEmail),
			name: get(userName),
		};
		const signedIn = Object.values(data).every((v) => v);

		return {
			data,
			signedIn,
		};
	},
	(_, set, data?: UserData["data"]) => {
		if (!data) {
			[userId, userEmail, userName].forEach((v) => set(v, undefined));
		}

		if (data?.id) set(userId, data.id);
		if (data?.email) set(userEmail, data.email);
		if (data?.name) set(userName, data.name);
	},
);
