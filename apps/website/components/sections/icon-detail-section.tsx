import Link from "next/link";
import type { IconDefinition } from "doodle-icon";
import { Explorer } from "./explorer";
export function IconDetailSection({ icon }: { icon: IconDefinition }) {
  return (
    <div className="detail-page">
      <header className="detail-heading">
        <Link href="/">← Back to the library</Link>
        <h1>{icon.name}</h1>
      </header>
      <Explorer
        data={{
          icons: [icon],
          categories: [],
          total: 1,
          matching: 1,
          query: "",
          category: "all",
          page: 1,
          pages: 1,
        }}
      />
    </div>
  );
}
