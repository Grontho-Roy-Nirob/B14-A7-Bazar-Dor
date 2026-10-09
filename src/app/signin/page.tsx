import AuthForm from "@/components/AuthForm";
export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; error?: string }>;
}) {
  const query = await searchParams;
  return (
    <AuthForm
      mode="signin"
      protectedRedirect={query.reason === "protected"}
      oauthError={Boolean(query.error)}
    />
  );
}
