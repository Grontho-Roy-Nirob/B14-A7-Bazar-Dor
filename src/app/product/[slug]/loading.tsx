export default function Loading() {
  return (
    <div role="status" aria-label="পণ্যের বিস্তারিত লোড হচ্ছে">
      <div className="skeleton h-40 rounded-2xl mb-6" />
      <div className="skeleton h-96 rounded-2xl" />
    </div>
  );
}
