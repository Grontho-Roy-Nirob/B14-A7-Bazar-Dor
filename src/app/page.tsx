import Image from "next/image";
import SocialSuccess from "@/components/SocialSuccess";
import { getProducts } from "@/lib/api";
import { banglaDate } from "@/lib/format";
import ProductGrid from "@/components/ProductGrid";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ auth?: string }>;
}) {
  const query = await searchParams;
  const products = await getProducts();
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
  return (
    <div className="space-y-8">
      <SocialSuccess show={query.auth === "social-success"} />
      <section className="panel grid grid-cols-1 items-center gap-3 p-4 sm:grid-cols-[1fr_240px] sm:gap-8 sm:p-8">
        <div>
          <span className="eyebrow">{banglaDate()}</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-4 leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="muted mt-4 max-w-xl leading-7">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="button primary mt-6">
            সব পণ্য দেখুন
          </a>
        </div>
        <Image
          src="/bazar-hero.png"
          alt="তাজা ফল ও সবজির ঝুড়ি"
          width={260}
          height={230}
          className="mx-auto h-[140px] w-full max-w-[220px] object-contain sm:h-[200px] sm:max-w-none"
          priority
        />
      </section>
      <section>
        <h2 className="section-title">
          <span className="text-green-600">▲</span> আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={risers} />
      </section>
      <section>
        <h2 className="section-title">
          <span className="text-red-600">▼</span> আজ দাম কমেছে
        </h2>
        <ProductGrid products={fallers} />
      </section>
      <section id="সব-পণ্য">
        <h2 className="section-title mb-1">সব পণ্য</h2>
        <p className="muted text-sm mb-4">সব পণ্যের আজকের দাম ও পরিবর্তন</p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
