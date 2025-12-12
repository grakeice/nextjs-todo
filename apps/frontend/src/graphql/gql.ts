/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\t\t\t\t\tmutation UpdateUser(\n\t\t\t\t\t\t$id: ID!\n\t\t\t\t\t\t$name: String!\n\t\t\t\t\t\t$email: String!\n\t\t\t\t\t\t$newPassword: String\n\t\t\t\t\t) {\n\t\t\t\t\t\tupdateUser(\n\t\t\t\t\t\t\tupdateUserInput: {\n\t\t\t\t\t\t\t\tid: $id\n\t\t\t\t\t\t\t\tname: $name\n\t\t\t\t\t\t\t\temail: $email\n\t\t\t\t\t\t\t\tpassword: $newPassword\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\temail\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": typeof types.UpdateUserDocument,
    "\n\t\t\t\t\tmutation SignIn($email: String!, $password: String!) {\n\t\t\t\t\t\tsignIn(data: { email: $email, password: $password }) {\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\temail\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": typeof types.SignInDocument,
    "\n\t\t\t\t\tmutation SignUp(\n\t\t\t\t\t\t$name: String!\n\t\t\t\t\t\t$email: String!\n\t\t\t\t\t\t$password: String!\n\t\t\t\t\t) {\n\t\t\t\t\t\tcreateUser(\n\t\t\t\t\t\t\tdata: {\n\t\t\t\t\t\t\t\tname: $name\n\t\t\t\t\t\t\t\temail: $email\n\t\t\t\t\t\t\t\tpassword: $password\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\temail\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": typeof types.SignUpDocument,
    "\n\t\t\t\t\tmutation SignOut {\n\t\t\t\t\t\tsignOut\n\t\t\t\t\t}\n\t\t\t\t": typeof types.SignOutDocument,
    "\n\t\t\t\t\t\tmutation UpdateTask(\n\t\t\t\t\t\t\t$id: String!\n\t\t\t\t\t\t\t$title: String\n\t\t\t\t\t\t\t$description: String\n\t\t\t\t\t\t\t$expireAt: DateTime\n\t\t\t\t\t\t\t$status: TaskStatus\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tupdateTask(\n\t\t\t\t\t\t\t\tid: $id\n\t\t\t\t\t\t\t\tdata: {\n\t\t\t\t\t\t\t\t\ttitle: $title\n\t\t\t\t\t\t\t\t\tdescription: $description\n\t\t\t\t\t\t\t\t\texpireAt: $expireAt\n\t\t\t\t\t\t\t\t\tstatus: $status\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t) {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t": typeof types.UpdateTaskDocument,
    "\n\t\t\t\t\t\tmutation CreateTask(\n\t\t\t\t\t\t\t$title: String\n\t\t\t\t\t\t\t$description: String\n\t\t\t\t\t\t\t$expireAt: DateTime\n\t\t\t\t\t\t\t$status: TaskStatus\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tcreateTask(\n\t\t\t\t\t\t\t\tdata: {\n\t\t\t\t\t\t\t\t\ttitle: $title\n\t\t\t\t\t\t\t\t\tdescription: $description\n\t\t\t\t\t\t\t\t\tstatus: $status\n\t\t\t\t\t\t\t\t\texpireAt: $expireAt\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t) {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t": typeof types.CreateTaskDocument,
    "\n\t\t\t\t\t\t\tmutation deleteTask($id: String!) {\n\t\t\t\t\t\t\t\tremoveTask(id: $id) {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t": typeof types.DeleteTaskDocument,
    "\n\t\t\t\t\tquery getUserData {\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\temail\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": typeof types.GetUserDataDocument,
    "\n\t\t\t\t\tquery getTask($id: String!) {\n\t\t\t\t\t\ttask(id: $id) {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\texpireAt\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": typeof types.GetTaskDocument,
    "\n\t\t\t\t\tquery getTaskList {\n\t\t\t\t\t\ttasks {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\texpireAt\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": typeof types.GetTaskListDocument,
};
const documents: Documents = {
    "\n\t\t\t\t\tmutation UpdateUser(\n\t\t\t\t\t\t$id: ID!\n\t\t\t\t\t\t$name: String!\n\t\t\t\t\t\t$email: String!\n\t\t\t\t\t\t$newPassword: String\n\t\t\t\t\t) {\n\t\t\t\t\t\tupdateUser(\n\t\t\t\t\t\t\tupdateUserInput: {\n\t\t\t\t\t\t\t\tid: $id\n\t\t\t\t\t\t\t\tname: $name\n\t\t\t\t\t\t\t\temail: $email\n\t\t\t\t\t\t\t\tpassword: $newPassword\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\temail\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": types.UpdateUserDocument,
    "\n\t\t\t\t\tmutation SignIn($email: String!, $password: String!) {\n\t\t\t\t\t\tsignIn(data: { email: $email, password: $password }) {\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\temail\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": types.SignInDocument,
    "\n\t\t\t\t\tmutation SignUp(\n\t\t\t\t\t\t$name: String!\n\t\t\t\t\t\t$email: String!\n\t\t\t\t\t\t$password: String!\n\t\t\t\t\t) {\n\t\t\t\t\t\tcreateUser(\n\t\t\t\t\t\t\tdata: {\n\t\t\t\t\t\t\t\tname: $name\n\t\t\t\t\t\t\t\temail: $email\n\t\t\t\t\t\t\t\tpassword: $password\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\temail\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": types.SignUpDocument,
    "\n\t\t\t\t\tmutation SignOut {\n\t\t\t\t\t\tsignOut\n\t\t\t\t\t}\n\t\t\t\t": types.SignOutDocument,
    "\n\t\t\t\t\t\tmutation UpdateTask(\n\t\t\t\t\t\t\t$id: String!\n\t\t\t\t\t\t\t$title: String\n\t\t\t\t\t\t\t$description: String\n\t\t\t\t\t\t\t$expireAt: DateTime\n\t\t\t\t\t\t\t$status: TaskStatus\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tupdateTask(\n\t\t\t\t\t\t\t\tid: $id\n\t\t\t\t\t\t\t\tdata: {\n\t\t\t\t\t\t\t\t\ttitle: $title\n\t\t\t\t\t\t\t\t\tdescription: $description\n\t\t\t\t\t\t\t\t\texpireAt: $expireAt\n\t\t\t\t\t\t\t\t\tstatus: $status\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t) {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t": types.UpdateTaskDocument,
    "\n\t\t\t\t\t\tmutation CreateTask(\n\t\t\t\t\t\t\t$title: String\n\t\t\t\t\t\t\t$description: String\n\t\t\t\t\t\t\t$expireAt: DateTime\n\t\t\t\t\t\t\t$status: TaskStatus\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tcreateTask(\n\t\t\t\t\t\t\t\tdata: {\n\t\t\t\t\t\t\t\t\ttitle: $title\n\t\t\t\t\t\t\t\t\tdescription: $description\n\t\t\t\t\t\t\t\t\tstatus: $status\n\t\t\t\t\t\t\t\t\texpireAt: $expireAt\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t) {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t": types.CreateTaskDocument,
    "\n\t\t\t\t\t\t\tmutation deleteTask($id: String!) {\n\t\t\t\t\t\t\t\tremoveTask(id: $id) {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t": types.DeleteTaskDocument,
    "\n\t\t\t\t\tquery getUserData {\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\temail\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": types.GetUserDataDocument,
    "\n\t\t\t\t\tquery getTask($id: String!) {\n\t\t\t\t\t\ttask(id: $id) {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\texpireAt\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": types.GetTaskDocument,
    "\n\t\t\t\t\tquery getTaskList {\n\t\t\t\t\t\ttasks {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\texpireAt\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": types.GetTaskListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\t\tmutation UpdateUser(\n\t\t\t\t\t\t$id: ID!\n\t\t\t\t\t\t$name: String!\n\t\t\t\t\t\t$email: String!\n\t\t\t\t\t\t$newPassword: String\n\t\t\t\t\t) {\n\t\t\t\t\t\tupdateUser(\n\t\t\t\t\t\t\tupdateUserInput: {\n\t\t\t\t\t\t\t\tid: $id\n\t\t\t\t\t\t\t\tname: $name\n\t\t\t\t\t\t\t\temail: $email\n\t\t\t\t\t\t\t\tpassword: $newPassword\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\temail\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t"): typeof import('./graphql').UpdateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\t\tmutation SignIn($email: String!, $password: String!) {\n\t\t\t\t\t\tsignIn(data: { email: $email, password: $password }) {\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\temail\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t"): typeof import('./graphql').SignInDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\t\tmutation SignUp(\n\t\t\t\t\t\t$name: String!\n\t\t\t\t\t\t$email: String!\n\t\t\t\t\t\t$password: String!\n\t\t\t\t\t) {\n\t\t\t\t\t\tcreateUser(\n\t\t\t\t\t\t\tdata: {\n\t\t\t\t\t\t\t\tname: $name\n\t\t\t\t\t\t\t\temail: $email\n\t\t\t\t\t\t\t\tpassword: $password\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\temail\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t"): typeof import('./graphql').SignUpDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\t\tmutation SignOut {\n\t\t\t\t\t\tsignOut\n\t\t\t\t\t}\n\t\t\t\t"): typeof import('./graphql').SignOutDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\t\t\tmutation UpdateTask(\n\t\t\t\t\t\t\t$id: String!\n\t\t\t\t\t\t\t$title: String\n\t\t\t\t\t\t\t$description: String\n\t\t\t\t\t\t\t$expireAt: DateTime\n\t\t\t\t\t\t\t$status: TaskStatus\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tupdateTask(\n\t\t\t\t\t\t\t\tid: $id\n\t\t\t\t\t\t\t\tdata: {\n\t\t\t\t\t\t\t\t\ttitle: $title\n\t\t\t\t\t\t\t\t\tdescription: $description\n\t\t\t\t\t\t\t\t\texpireAt: $expireAt\n\t\t\t\t\t\t\t\t\tstatus: $status\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t) {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t"): typeof import('./graphql').UpdateTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\t\t\tmutation CreateTask(\n\t\t\t\t\t\t\t$title: String\n\t\t\t\t\t\t\t$description: String\n\t\t\t\t\t\t\t$expireAt: DateTime\n\t\t\t\t\t\t\t$status: TaskStatus\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tcreateTask(\n\t\t\t\t\t\t\t\tdata: {\n\t\t\t\t\t\t\t\t\ttitle: $title\n\t\t\t\t\t\t\t\t\tdescription: $description\n\t\t\t\t\t\t\t\t\tstatus: $status\n\t\t\t\t\t\t\t\t\texpireAt: $expireAt\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t) {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t"): typeof import('./graphql').CreateTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\t\t\t\tmutation deleteTask($id: String!) {\n\t\t\t\t\t\t\t\tremoveTask(id: $id) {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t"): typeof import('./graphql').DeleteTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\t\tquery getUserData {\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\temail\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t"): typeof import('./graphql').GetUserDataDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\t\tquery getTask($id: String!) {\n\t\t\t\t\t\ttask(id: $id) {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\texpireAt\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t"): typeof import('./graphql').GetTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\t\tquery getTaskList {\n\t\t\t\t\t\ttasks {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\texpireAt\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t"): typeof import('./graphql').GetTaskListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
