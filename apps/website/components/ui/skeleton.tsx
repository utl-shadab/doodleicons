export function LibrarySkeleton() {
  return (
    <div
      className="library-skeleton"
      role="status"
      aria-label="Loading icon library"
    >
      <span className="sr-only">Loading icons…</span>
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-search" />
      <div className="skeleton-layout">
        <div className="skeleton skeleton-sidebar" />
        <div className="skeleton-cards">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="skeleton skeleton-card" />
          ))}
        </div>
        <div className="skeleton skeleton-sidebar" />
      </div>
    </div>
  );
}
export function ContentSkeleton() {
  return (
    <div className="content-page" role="status" aria-label="Loading page">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-search" />
      <div className="skeleton skeleton-content" />
    </div>
  );
}
