import Image from "next/image";
import Link from "next/link";
import { banglaDate } from "@/lib/format";
import type { Category } from "@/types";
import NavLinks from "@/components/NavLinks";
import UserInfo from "@/components/UserInfo";
export default function Header({ categories }: { categories: Category[] }) {
  return (
    <header className="site-header">
      <div className="container-width header-top">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="বাজার দর হোম"
        >
          <Image
            src="/logo-icon.png"
            alt=""
            width={40}
            height={40}
            className="rounded-xl"
            priority
          />
          <div>
            <p className="font-bold text-xl">বাজার দর</p>
            <p className="text-[11px] muted">{banglaDate()}</p>
          </div>
        </Link>
        <UserInfo />
      </div>
      <div className="border-t border-[var(--border)]">
        <NavLinks categories={categories} />
      </div>
    </header>
  );
}
