import SkeletonGrid from "@/components/SkeletonGrid";
export default function Loading() {
  return (
    <div>
      <div className="skeleton h-56 rounded-2xl mb-8" />
      <SkeletonGrid />
    </div>
  );
}
