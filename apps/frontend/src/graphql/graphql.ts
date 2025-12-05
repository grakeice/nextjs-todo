/* eslint-disable */
import { DocumentTypeDecoration } from "@graphql-typed-document-node/core";

export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename"
				? T[P]
				: never;
	  };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	/** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
	DateTime: { input: any; output: any };
};

export type CreateTaskInput = {
	description?: InputMaybe<Scalars["String"]["input"]>;
	expireAt?: InputMaybe<Scalars["DateTime"]["input"]>;
	status?: InputMaybe<TaskStatus>;
	title?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateUserInput = {
	email: Scalars["String"]["input"];
	name: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
};

export type LoginResponse = {
	__typename?: "LoginResponse";
	user: User;
};

export type LoginUserInput = {
	email: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
};

export type Mutation = {
	__typename?: "Mutation";
	createTask: Task;
	createUser: User;
	removeTask: Task;
	removeUser: User;
	signIn: LoginResponse;
	signOut: Scalars["String"]["output"];
	updateTask: Task;
	updateUser: User;
};

export type MutationCreateTaskArgs = {
	data: CreateTaskInput;
};

export type MutationCreateUserArgs = {
	data: CreateUserInput;
};

export type MutationRemoveTaskArgs = {
	id: Scalars["String"]["input"];
};

export type MutationSignInArgs = {
	data: LoginUserInput;
};

export type MutationUpdateTaskArgs = {
	data: UpdateTaskInput;
	id: Scalars["String"]["input"];
};

export type MutationUpdateUserArgs = {
	updateUserInput: UpdateUserInput;
};

export type Query = {
	__typename?: "Query";
	task: Task;
	tasks: Array<Task>;
	user: User;
};

export type QueryTaskArgs = {
	id: Scalars["String"]["input"];
};

export type QueryUserArgs = {
	email?: InputMaybe<Scalars["String"]["input"]>;
};

export type Task = {
	__typename?: "Task";
	createdAt: Scalars["DateTime"]["output"];
	description?: Maybe<Scalars["String"]["output"]>;
	expireAt?: Maybe<Scalars["DateTime"]["output"]>;
	id: Scalars["ID"]["output"];
	status: TaskStatus;
	title: Scalars["String"]["output"];
	updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
	user: User;
	userId: Scalars["String"]["output"];
};

export enum TaskStatus {
	Completed = "COMPLETED",
	InProgress = "IN_PROGRESS",
	Todo = "TODO",
}

export type UpdateTaskInput = {
	description?: InputMaybe<Scalars["String"]["input"]>;
	expireAt?: InputMaybe<Scalars["DateTime"]["input"]>;
	status?: InputMaybe<TaskStatus>;
	title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateUserInput = {
	email: Scalars["String"]["input"];
	id: Scalars["ID"]["input"];
	name: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
};

export type User = {
	__typename?: "User";
	Task: Array<Task>;
	createdAt: Scalars["DateTime"]["output"];
	email: Scalars["String"]["output"];
	id: Scalars["ID"]["output"];
	name: Scalars["String"]["output"];
	password: Scalars["String"]["output"];
	updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type SignInMutationVariables = Exact<{
	email: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
}>;

export type SignInMutation = {
	__typename?: "Mutation";
	signIn: {
		__typename?: "LoginResponse";
		user: { __typename?: "User"; id: string; email: string; name: string };
	};
};

export type SignUpMutationVariables = Exact<{
	name: Scalars["String"]["input"];
	email: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
}>;

export type SignUpMutation = {
	__typename?: "Mutation";
	createUser: {
		__typename?: "User";
		id: string;
		email: string;
		name: string;
	};
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: "Mutation"; signOut: string };

export type GetUserDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserDataQuery = {
	__typename?: "Query";
	user: { __typename?: "User"; id: string; email: string; name: string };
};

export class TypedDocumentString<TResult, TVariables>
	extends String
	implements DocumentTypeDecoration<TResult, TVariables>
{
	__apiType?: NonNullable<
		DocumentTypeDecoration<TResult, TVariables>["__apiType"]
	>;
	private value: string;
	public __meta__?: Record<string, any> | undefined;

	constructor(value: string, __meta__?: Record<string, any> | undefined) {
		super(value);
		this.value = value;
		this.__meta__ = __meta__;
	}

	override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
		return this.value;
	}
}

export const SignInDocument = new TypedDocumentString(`
    mutation SignIn($email: String!, $password: String!) {
  signIn(data: {email: $email, password: $password}) {
    user {
      id
      email
      name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SignInMutation,
	SignInMutationVariables
>;
export const SignUpDocument = new TypedDocumentString(`
    mutation SignUp($name: String!, $email: String!, $password: String!) {
  createUser(data: {name: $name, email: $email, password: $password}) {
    id
    email
    name
  }
}
    `) as unknown as TypedDocumentString<
	SignUpMutation,
	SignUpMutationVariables
>;
export const SignOutDocument = new TypedDocumentString(`
    mutation SignOut {
  signOut
}
    `) as unknown as TypedDocumentString<
	SignOutMutation,
	SignOutMutationVariables
>;
export const GetUserDataDocument = new TypedDocumentString(`
    query getUserData {
  user {
    id
    email
    name
  }
}
    `) as unknown as TypedDocumentString<
	GetUserDataQuery,
	GetUserDataQueryVariables
>;
