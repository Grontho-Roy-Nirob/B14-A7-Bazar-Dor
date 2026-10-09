import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
function createAuth() {
  const uri = process.env.MONGODB_URL;
  const secret = process.env.BETTER_AUTH_SECRET;
  const baseURL = process.env.BETTER_AUTH_URL;
  if (!uri || !secret || !baseURL)
    throw new Error(
      "Set MONGODB_URL, BETTER_AUTH_SECRET and BETTER_AUTH_URL in .env.local / deployment settings.",
    );
  if (secret.length < 32)
    throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters.");
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  return betterAuth({
    appName: "BazarDor",
    baseURL,
    secret,
    trustedOrigins: [baseURL],
    database: mongodbAdapter(client.db(process.env.MONGODB_DB || "bazar-dor"), {
      client,
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
    },
    socialProviders: {
      ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? {
            google: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
          }
        : {}),
      ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
        ? {
            github: {
              clientId: process.env.GITHUB_CLIENT_ID,
              clientSecret: process.env.GITHUB_CLIENT_SECRET,
            },
          }
        : {}),
    },
  });
}
// Lazy initialization lets the project build before runtime secrets are provided.
// The cached instance also reuses MongoDB's connection pool during hot reload.
const globalAuth = globalThis as unknown as {
  bazarAuth?: ReturnType<typeof createAuth>;
};
export function getAuth() {
  globalAuth.bazarAuth ??= createAuth();
  return globalAuth.bazarAuth;
}
