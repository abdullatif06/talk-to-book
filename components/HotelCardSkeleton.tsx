// TalkToBook — hotel card skeleton (shimmer) shown while a search is running.
// Mirrors HotelCard's shape so the results swap in without layout shift.
export default function HotelCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className="shimmer h-44 w-full" />
      <div className="flex flex-col gap-3 p-4">
        <div className="shimmer h-5 w-3/4 rounded" />
        <div className="shimmer h-4 w-1/3 rounded" />
        <div className="flex gap-2">
          <div className="shimmer h-6 w-20 rounded-full" />
          <div className="shimmer h-6 w-24 rounded-full" />
        </div>
        <div className="shimmer h-12 w-full rounded" />
        <div className="mt-1 flex items-center justify-between">
          <div className="shimmer h-7 w-16 rounded" />
          <div className="shimmer h-9 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}
