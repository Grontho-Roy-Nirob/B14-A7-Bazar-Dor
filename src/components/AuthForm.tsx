"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function AuthForm({
  mode,
  protectedRedirect = false,
  oauthError = false,
}: {
  mode: "signin" | "signup";
  protectedRedirect?: boolean;
  oauthError?: boolean;
}) {
  const signup = mode === "signup";
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (protectedRedirect)
      toast.error("বিস্তারিত দেখতে প্রথমে সাইন ইন করুন।", {
        id: "protected-route",
      });
    if (oauthError)
      toast.error("সোশ্যাল লগইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।", {
        id: "oauth-error",
      });
  }, [protectedRedirect, oauthError]);
  function fail(text: string) {
    setMessage(text);
    toast.error(text);
  }
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    setMessage("");
    if (signup && !name) return fail("আপনার নাম লিখুন।");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return fail("সঠিক ইমেইল লিখুন।");
    if (password.length < 8)
      return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    if (signup && password !== String(data.get("confirmPassword")))
      return fail("পাসওয়ার্ড দুটি মিলছে না।");
    setBusy(true);
    try {
      const { error } = signup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });
      if (error) {
        fail(error.message || "আবার চেষ্টা করুন।");
        return;
      }
      toast.success(
        signup
          ? "অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।"
          : "সফলভাবে সাইন ইন হয়েছে।",
      );
      router.push(signup ? "/signin" : "/");
      router.refresh();
    } catch {
      fail("সার্ভারে সংযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  }
  async function social(provider: "google" | "github") {
    setBusy(true);
    setMessage("");
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/?auth=social-success",
        errorCallbackURL: "/signin?error=oauth",
      });
      if (error) fail(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে।");
    } catch {
      fail("সোশ্যাল লগইন শুরু করা যায়নি।");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="auth-section">
      <h1 className="text-2xl font-bold">
        {signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
      </h1>
      <p className="muted text-sm mt-2 mb-6">
        {signup
          ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
          : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
      </p>
      <div className="panel auth-panel">
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {signup && (
            <div>
              <label htmlFor="name">নাম</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="যেমন: রহিম উদ্দিন"
                required
                maxLength={100}
              />
            </div>
          )}
          <div>
            <label htmlFor="email">ইমেইল</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password">পাসওয়ার্ড</label>
            <input
              id="password"
              name="password"
              type="password"
              minLength={8}
              maxLength={128}
              autoComplete={signup ? "new-password" : "current-password"}
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
            />
          </div>
          {signup && (
            <div>
              <label htmlFor="confirm-password">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="আবার লিখুন"
                required
              />
            </div>
          )}
          {message && (
            <p role="alert" className="text-red-600 text-sm">
              {message}
            </p>
          )}
          <button
            className="button primary w-full"
            type="submit"
            disabled={busy}
          >
            {busy
              ? "অপেক্ষা করুন…"
              : signup
                ? "অ্যাকাউন্ট তৈরি করুন"
                : "সাইন ইন"}
          </button>
        </form>
        <div className="divider">অথবা</div>
        <div className="social-buttons">
          <button
            className="button outline"
            disabled={busy}
            onClick={() => social("google")}
          >
            <span className="font-bold text-blue-600">G</span> Google দিয়ে
            চালিয়ে যান
          </button>
          <button
            className="button outline"
            disabled={busy}
            onClick={() => social("github")}
          >
            <Github size={16} /> GitHub দিয়ে চালিয়ে যান
          </button>
        </div>
        <p className="text-xs text-center mt-5">
          {signup ? "অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
          <Link
            className="text-green-700 font-semibold"
            href={signup ? "/signin" : "/signup"}
          >
            {signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </div>
      <Link className="text-xs muted inline-block mt-6" href="/">
        ← হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
