import type { JSX } from "react";

interface ToastErrorDescriptionProps {
	error: Error;
}

export function ToastErrorDescription({
	error,
}: ToastErrorDescriptionProps): JSX.Element {
	return (
		<>
			<p>
				<code>Error: {error.name}</code>
			</p>
			<p>
				<code>Message: {error.message}</code>
			</p>
		</>
	);
}
