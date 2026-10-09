"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types";
export default function NavLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="পণ্যের বিভাগ" className="nav-row container-width">
      {categories.map((category) => {
        const active = pathname === `/category/${category.slug}`;
        return (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            aria-current={active ? "page" : undefined}
            className={active ? "nav-link active" : "nav-link"}
          >
            {category.icon} {category.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}
