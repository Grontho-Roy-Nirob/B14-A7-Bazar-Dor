"use client";
import Link from "next/link";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="empty-state">
      <p className="text-4xl mb-4">🛒</p>
      <h1 className="font-bold text-2xl">তথ্য লোড করা যায়নি</h1>
      <p className="muted my-4">
        সংযোগ বা সার্ভারে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।
      </p>
      <button className="button primary" onClick={reset}>
        আবার চেষ্টা করুন
      </button>
      <Link className="button ghost ml-2" href="/">
        হোম পেজ
      </Link>
    </div>
  );
}
