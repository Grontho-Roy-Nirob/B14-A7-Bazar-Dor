import Link from "next/link";
export default function EmptyState({
  title = "পাওয়া যায়নি",
  message = "এই পৃষ্ঠা বা পণ্যটি পাওয়া যায়নি।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="empty-state">
      <span className="text-6xl" aria-hidden="true">
        🛒
      </span>
      <p className="muted mt-4">৪০৪</p>
      <h1 className="text-2xl font-bold mt-2">{title}</h1>
      <p className="muted mt-3 mb-6">{message}</p>
      <Link href="/" className="button primary">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
