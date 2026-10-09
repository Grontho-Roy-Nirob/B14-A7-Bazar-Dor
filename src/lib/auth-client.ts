"use client";
import { createAuthClient } from "better-auth/react";
// Same-origin requests work locally and on Vercel, with no public secret env vars.
export const authClient = createAuthClient();
