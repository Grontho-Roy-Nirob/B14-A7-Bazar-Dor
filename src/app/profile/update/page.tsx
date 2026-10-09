import { requireSession } from "@/lib/session";
import UpdateProfileForm from "@/components/UpdateProfileForm";
export default async function UpdateProfilePage() {
  const session = await requireSession();
  return (
    <section className="profile-section">
      <h1 className="text-2xl font-bold mb-2">তথ্য আপডেট করুন</h1>
      <p className="muted text-sm mb-6">আপনার নাম পরিবর্তন করুন।</p>
      <UpdateProfileForm name={session.user.name} />
    </section>
  );
}
