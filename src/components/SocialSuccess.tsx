"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function SocialSuccess({ show }: { show: boolean }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
    if (!show || isPending) return;
    if (session)
      toast.success("সফলভাবে সাইন ইন হয়েছে।", { id: "social-success" });
    router.replace("/", { scroll: false });
  }, [show, isPending, session, router]);
  return null;
}
