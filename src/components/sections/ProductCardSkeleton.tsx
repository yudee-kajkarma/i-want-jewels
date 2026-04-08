export default function ProductCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[#eadfd4] bg-white shadow-[0_18px_45px_rgba(92,63,37,0.08)]">
      <div className="shimmer-surface h-[328px] w-full bg-[#f6efe8]" />
      <div className="space-y-3 px-5 pb-5 pt-4">
        <div className="flex gap-2">
          <div className="shimmer-surface h-7 w-16 rounded-full" />
          <div className="shimmer-surface h-7 w-24 rounded-full" />
        </div>
        <div className="shimmer-surface h-3 w-3/4 rounded-full" />
        <div className="shimmer-surface h-6 w-1/2 rounded-full" />
        <div className="shimmer-surface h-4 w-1/3 rounded-full" />
        <div className="flex items-end justify-between pt-3">
          <div className="space-y-2">
            <div className="shimmer-surface h-6 w-24 rounded-full" />
            <div className="shimmer-surface h-4 w-20 rounded-full" />
          </div>
          <div className="shimmer-surface h-10 w-32 rounded-full" />
        </div>
      </div>
    </article>
  )
}