import { notFound } from "next/navigation";
import { getCategory, getCategoryProducts } from "@/lib/api";
import { bn } from "@/lib/format";
import CategoryProducts from "@/components/CategoryProducts";
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const products = await getCategoryProducts(slug);
  if (!products.length) notFound();
  return (
    <>
      <section className="panel p-6 flex items-center gap-4">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="muted text-sm mt-1">
            {bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>
      <CategoryProducts products={products} />
    </>
  );
}
