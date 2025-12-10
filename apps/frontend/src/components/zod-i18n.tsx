"use client";

import type { PropsWithChildren, JSX } from "react";

import { z } from "zod";

export function ZodI18n({ children }: PropsWithChildren): JSX.Element {
	z.config(z.locales.ja());
	return <>{children}</>;
}
