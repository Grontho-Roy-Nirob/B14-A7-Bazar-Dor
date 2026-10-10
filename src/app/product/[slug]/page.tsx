import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { bn, unitName } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  // Validate before login so unknown product URLs return the requested friendly 404.
  if (!product) notFound();
  await requireSession();
  const markets = product.markets;
  const min = markets.length
    ? Math.min(...markets.map((m) => m.min))
    : product.today;
  const max = markets.length
    ? Math.max(...markets.map((m) => m.max))
    : product.today;
  const average = markets.length
    ? markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
    : product.today;
  return (
    <div className="space-y-5">
      <nav aria-label="Breadcrumb" className="text-xs muted flex gap-2">
        <Link href="/">হোম</Link>
        <span>›</span>
        <Link href={`/category/${product.category}`}>
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span>{product.nameBn}</span>
      </nav>
      <section className="panel p-5 sm:p-7 flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <span className="product-icon large">{product.image}</span>
          <div>
            <h1 className="text-2xl font-bold">{product.nameBn}</h1>
            <p className="muted text-sm mt-2">
              প্রতি {unitName(product.unit)} ·{" "}
              <Link
                className="text-green-700"
                href={`/category/${product.category}`}
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
            </p>
            <p className="text-sm mt-3">
              গতকালের তুলনায় আজ{" "}
              {product.change.dir === "up"
                ? "বেড়েছে"
                : product.change.dir === "down"
                  ? "কমেছে"
                  : "অপরিবর্তিত"}{" "}
              {bn(Math.abs(product.today - product.yesterday))} টাকা
            </p>
          </div>
        </div>
        <div className="price-summary">
          <p className="muted text-xs">আজকের দাম</p>
          <p className="text-3xl font-bold mt-1">{bn(product.today)}</p>
          <p className="muted text-xs mb-2">টাকা / {unitName(product.unit)}</p>
          <ChangeBadge change={product.change} />
        </div>
      </section>
      <section className="panel p-4 sm:p-6">
        <h2 className="font-bold text-lg mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {[
            { label: "সর্বনিম্ন দাম", value: min, color: "text-green-600" },
            { label: "সর্বোচ্চ দাম", value: max, color: "text-red-600" },
            { label: "গড় দাম", value: average, color: "text-green-600" },
          ].map((item) => (
            <div key={item.label} className="summary-box">
              <p className="muted text-xs mb-2">{item.label}</p>
              <p className={item.color}>
                <strong className="text-xl">
                  {bn(item.value)}
                </strong>{" "}
                টাকা
              </p>
            </div>
          ))}
        </div>
        <h2 className="font-bold text-lg mb-3">বাজারভিত্তিক আজকের দাম</h2>
        <div className="table-scroll">
          <table>
            <caption className="sr-only">
              {product.nameBn}: বাজারভিত্তিক সর্বনিম্ন, সর্বোচ্চ ও গড় দাম
            </caption>
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন</th>
                <th>সর্বোচ্চ</th>
                <th>গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((market, i) => (
                <tr key={`${market.market}-${i}`}>
                  <td>{market.market}</td>
                  <td>{market.division}</td>
                  <td>{bn(market.min)} টাকা</td>
                  <td>{bn(market.max)} টাকা</td>
                  <td>
                  {bn((market.min + market.max) / 2)}{" "}
                    টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!markets.length && (
          <p className="muted p-4">
            এই পণ্যের বাজারভিত্তিক দাম এখনও পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}
