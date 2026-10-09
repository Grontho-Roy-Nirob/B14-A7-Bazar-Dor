import Link from "next/link";
import { requireSession } from "@/lib/session";
import ProfileCard from "@/components/ProfileCard";
export default async function ProfilePage() {
  const session = await requireSession();
  return (
    <section className="profile-section">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="muted text-sm mt-1 mb-6">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>
      <ProfileCard user={session.user} />
      <div className="panel p-6 mt-5">
        <h2 className="font-bold mb-4">তথ্য</h2>
        <p className="muted text-xs mb-1">নাম</p>
        <p className="mb-5">{session.user.name}</p>
        <Link href="/profile/update" className="button primary">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </section>
  );
}
