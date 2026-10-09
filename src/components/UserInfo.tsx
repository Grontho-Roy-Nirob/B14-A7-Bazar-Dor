"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, UserRound, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function UserInfo() {
  const { data: session, isPending } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function signOut() {
    setBusy(true);
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message || "সাইন আউট ব্যর্থ হয়েছে");
        return;
      }
      toast.success("সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  }
  if (isPending)
    return (
      <div
        aria-label="অ্যাকাউন্ট লোড হচ্ছে"
        className="skeleton w-28 h-9 rounded-lg"
      />
    );
  if (!session)
    return (
      <div className="flex items-center gap-2 text-sm">
        <Link className="button ghost" href="/signin">
          সাইন ইন
        </Link>
        <Link className="button primary" href="/signup">
          সাইন আপ
        </Link>
      </div>
    );
  return (
    <details className="user-menu">
      <summary className="flex items-center gap-2 cursor-pointer text-sm">
        {session.user.image ? (
          <img
            className="avatar"
            src={session.user.image}
            alt={session.user.name}
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="avatar fallback">
            <UserRound size={18} />
          </span>
        )}
        <span className="max-w-24 truncate">{session.user.name}</span>
        <ChevronDown size={14} />
      </summary>
      <div className="menu-popover panel">
        <p className="font-semibold truncate">{session.user.name}</p>
        <p className="text-xs muted truncate mt-1">{session.user.email}</p>
        <Link
          className="menu-item"
          href="/profile"
          onClick={(event) =>
            event.currentTarget.closest("details")?.removeAttribute("open")
          }
        >
          <UserRound size={16} />
          আমার প্রোফাইল
        </Link>
        <button
          className="menu-item text-red-600"
          disabled={busy}
          onClick={signOut}
        >
          <LogOut size={16} />
          {busy ? "অপেক্ষা করুন…" : "সাইন আউট"}
        </button>
      </div>
    </details>
  );
}
