"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function UpdateProfileForm({ name }: { name: string }) {
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  async function update(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = String(
      new FormData(event.currentTarget).get("name") || "",
    ).trim();
    setErrorMessage("");
    if (!name || name.length > 100) {
      const message = "১ থেকে ১০০ অক্ষরের নাম লিখুন।";
      setErrorMessage(message);
      toast.error(message);
      return;
    }
    setBusy(true);
    try {
      const { error } = await authClient.updateUser({ name });
      if (error) {
        setErrorMessage(error.message || "আপডেট ব্যর্থ হয়েছে।");
        toast.error(error.message || "আপডেট ব্যর্থ হয়েছে।");
        return;
      }
      toast.success("তথ্য আপডেট হয়েছে।");
      router.push("/profile");
      router.refresh();
    } catch {
      setErrorMessage("সংযোগে সমস্যা। আবার চেষ্টা করুন।");
      toast.error("সংযোগে সমস্যা। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={update} noValidate className="panel p-6 space-y-4">
      <div>
        <label htmlFor="profile-name">নাম</label>
        <input
          id="profile-name"
          name="name"
          defaultValue={name}
          autoComplete="name"
          required
          maxLength={100}
        />
      </div>
      {errorMessage && (
        <p role="alert" className="text-red-600 text-sm">
          {errorMessage}
        </p>
      )}
      <button className="button primary w-full" disabled={busy} type="submit">
        {busy ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}
      </button>
      <Link href="/profile" className="button ghost w-full">
        বাতিল
      </Link>
    </form>
  );
}
