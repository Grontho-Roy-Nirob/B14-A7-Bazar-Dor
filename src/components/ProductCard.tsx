import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import { bn, unitName } from "@/lib/format";
import type { Product } from "@/types";
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="product-card panel">
      <div className="flex items-center gap-3">
        <span className="product-icon" aria-hidden="true">
          {product.image}
        </span>
        <div>
          <h3 className="font-bold text-base">{product.nameBn}</h3>
          <p className="text-xs muted">প্রতি {unitName(product.unit)}</p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2 mt-4">
        <div>
          <p className="text-xs muted mb-1">আজকের দাম</p>
          <p>
            <strong className="text-xl">{bn(product.today)}</strong>{" "}
            <span className="text-sm">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
