import Link from "next/link";
import { getProducts } from "@/lib/api";
import { bn, unitName } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";
export default async function PriceTicker() {
  const products = await getProducts()
    .then((items) => items.slice(0, 10))
    .catch(() => []);
  if (!products.length)
    return (
      <div className="ticker text-center p-2 text-xs muted">
        দামের তথ্য সাময়িকভাবে পাওয়া যাচ্ছে না।
      </div>
    );
  return (
    <div className="ticker" aria-label="পণ্যের সর্বশেষ দাম">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div
            className="ticker-group"
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
          >
            {products.map((product) => (
              <Link
                tabIndex={copy === 1 ? -1 : undefined}
                key={product.id}
                href={`/product/${product.slug}`}
                className="ticker-item"
              >
                {product.image} {product.nameBn}{" "}
                <span>
                  {bn(product.today)} টাকা/{unitName(product.unit)}
                </span>
                <ChangeBadge change={product.change} />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
