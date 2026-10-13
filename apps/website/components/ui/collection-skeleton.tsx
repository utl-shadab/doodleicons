export function CollectionSkeleton() {
  return (
    <div
      className="collections-page"
      role="status"
      aria-label="Loading visual collections"
    >
      <div
        className="skeleton"
        style={{ width: "55%", height: 70, marginBottom: 24 }}
      />
      <div
        className="skeleton"
        style={{ width: "75%", height: 24, marginBottom: 60 }}
      />
      <div className="collection-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="skeleton" key={index} style={{ height: 290 }} />
        ))}
      </div>
      <span className="sr-only">Loading collections…</span>
    </div>
  );
}
