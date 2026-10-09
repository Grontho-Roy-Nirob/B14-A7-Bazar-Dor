import SkeletonGrid from "@/components/SkeletonGrid";
export default function Loading() {
  return (
    <div>
      <div className="skeleton h-24 rounded-2xl mb-6" />
      <SkeletonGrid />
    </div>
  );
}
