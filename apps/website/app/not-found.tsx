import Link from "next/link";
export default function NotFound() {
  return (
    <div className="error-state">
      <p className="eyebrow">404</p>
      <h1>This little corner is empty.</h1>
      <p>Try searching the library for an icon instead.</p>
      <Link href="/" className="button primary">
        Explore icons
      </Link>
    </div>
  );
}
