"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function ProfileCard({
  user,
}: {
  user: { name: string; email: string; image?: string | null };
}) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function signOut() {
    setBusy(true);
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message || "সাইন আউট ব্যর্থ হয়েছে।");
        return;
      }
      toast.success("সাইন আউট হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="panel p-5 flex flex-wrap items-center gap-4">
      <span className="profile-avatar">
        {user.image ? (
          <img src={user.image} alt={user.name} referrerPolicy="no-referrer" />
        ) : (
          <UserRound size={32} />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="muted text-sm break-all">{user.email}</p>
      </div>
      <button onClick={signOut} disabled={busy} className="button danger">
        <LogOut size={16} />
        {busy ? "অপেক্ষা করুন…" : "সাইন আউট"}
      </button>
    </div>
  );
}
