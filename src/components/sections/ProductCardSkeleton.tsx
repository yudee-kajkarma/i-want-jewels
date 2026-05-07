export default function ProductCardSkeleton() {
    return (
        <article className="overflow-hidden border border-[#eadfd4] bg-white shadow-[0_18px_45px_rgba(92,63,37,0.08)]">
            <div className="shimmer-surface h-[328px] w-full bg-[#f6efe8]" />
            <div className="space-y-3 px-5 pb-5 pt-4">
                <div className="shimmer-surface h-3 w-3/4  " />
                <div className="shimmer-surface h-3 w-1/3  " />
                <div className="shimmer-surface h-6 w-1/2  " />
            </div>
        </article>
    );
}
