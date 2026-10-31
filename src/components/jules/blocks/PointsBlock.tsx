import { RevealText, shareLetters, visibleLength } from './reveal'

/** Short facts or tips, as a simple list with small dots. `shown`: how far a new answer has flowed in (letters), while it appears. */
export function PointsBlock({ items, shown }: { items: string[]; shown?: number }) {
  const shares = shareLetters(items.map(visibleLength), shown)
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item, i) => {
        const share = shares[i]
        // Not reached yet: the next tip appears when the one before it is written.
        if (share !== undefined && share <= 0) return null
        return (
          <li key={i} className={`flex gap-2.5 text-[13.5px] leading-[1.6] text-[#f6f1ee]${share !== undefined ? ' motion-safe:animate-jules-fade' : ''}`}>
            <span aria-hidden className="mt-[0.65em] h-[5px] w-[5px] shrink-0 rounded-full bg-[#a69d98]" />
            <span className="min-w-0 break-words">
              <RevealText text={item} shown={share} />
            </span>
          </li>
        )
      })}
    </ul>
  )
}
