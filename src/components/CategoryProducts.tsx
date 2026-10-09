"use client";
import { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { bn, toNumber } from "@/lib/format";
import type { Product } from "@/types";
export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState("default");
  const sorted = useMemo(() => {
    if (sort === "default") return products;
    return [...products].sort((a, b) =>
      sort === "asc"
        ? toNumber(a.today) - toNumber(b.today)
        : toNumber(b.today) - toNumber(a.today),
    );
  }, [products, sort]);
  return (
    <>
      <div className="panel p-4 flex justify-end items-center gap-3 my-5">
        <label htmlFor="sort" className="muted text-sm">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="sort-select"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <p className="muted text-sm mb-4">
        মোট {bn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <ProductGrid products={sorted} />
    </>
  );
}
