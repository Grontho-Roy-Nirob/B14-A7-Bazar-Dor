export default function SkeletonGrid({ count = 9 }: { count?: number }) {
  return (
    <div role="status" aria-label="পণ্যের তথ্য লোড হচ্ছে">
      <span className="sr-only">লোড হচ্ছে…</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }, (_, i) => (
          <div className="panel p-4" key={i}>
            <div className="flex gap-3">
              <div className="skeleton w-12 h-12 rounded-xl" />
              <div className="flex-1">
                <div className="skeleton h-4 w-3/4 rounded mb-2" />
                <div className="skeleton h-3 w-1/2 rounded" />
              </div>
            </div>
            <div className="skeleton h-5 w-2/3 rounded mt-5" />
          </div>
        ))}
      </div>
    </div>
  );
}
