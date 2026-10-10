import { cache } from "react";
import type { Category, Product } from "@/types";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

async function request<T>(path: string): Promise<T | null> {
  const response = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: 60 },
  });
  if (response.status === 404) return null;
  if (!response.ok)
    throw new Error("বাজারের তথ্য পাওয়া যাচ্ছে না। আবার চেষ্টা করুন।");
  return response.json() as Promise<T>;
}

export const getProducts = cache(async (): Promise<Product[]> => {
  const products = await request<Product[]>("/products");
  if (!Array.isArray(products)) 
    throw new Error("Invalid product response");
  return products;
});

export const getCategories = cache(async (): Promise<Category[]> => {
  const categories = await request<Category[]>("/categories");
  if (!Array.isArray(categories)) 
    throw new Error("Invalid category response");
  return categories;
});

export const getCategory = cache(async (slug: string) => {
  const category = await request<Category>(
    `/categories/${encodeURIComponent(slug)}`,
  );
  return category?.id ? category : null;
});

export async function getCategoryProducts(slug: string): Promise<Product[]> {
  const products = await request<Product[]>(
    `/products?category=${encodeURIComponent(slug)}`,
  );
  if (products === null) return [];
  if (!Array.isArray(products)) 
    throw new Error("Invalid product response");
  return products;
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  const match = products.find((product) => product.slug === slug);
  if (!match) return null;
  const product = await request<Product>(`/products/${match.id}`);
  return product?.id ? product : null;
}
