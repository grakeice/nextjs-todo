export class SignUpError extends Error {
	readonly name = "SignUpError";
	constructor(message?: string) {
		super(message);
	}
}
