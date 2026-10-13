"use client";
import Link from "next/link";
export function ErrorState({ reset }: { reset: () => void }) {
  return (
    <div className="error-state">
      <p className="eyebrow">Something went wrong</p>
      <h1>Let’s give that another try.</h1>
      <p>The library could not load. Your downloaded icons are unaffected.</p>
      <div className="inline-actions">
        <button className="button primary" onClick={reset}>
          Try again
        </button>
        <Link className="button" href="/">
          Back to library
        </Link>
      </div>
    </div>
  );
}
