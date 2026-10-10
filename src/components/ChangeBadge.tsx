import { bn } from "@/lib/format";
import type { Product } from "@/types";
export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const direction = change.dir;
  return (
    <span className={`change-badge ${direction}`}>
      {direction === "up" ? "▲" : direction === "down" ? "▼" : "—"}{" "}
      {bn(Math.abs(change.pct))}%
    </span>
  );
}
