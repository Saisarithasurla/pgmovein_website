export default function PropertyCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="skeleton h-48 w-full" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="skeleton h-3 w-full" />
        <div className="flex justify-between">
          <div className="skeleton h-5 w-24" />
          <div className="skeleton h-4 w-16" />
        </div>
      </div>
    </article>
  );
}
