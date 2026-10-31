import { firstWords, shareWords, wordCount } from './reveal'
import { withBold } from './richText'

/** Short facts or tips, as a simple list with small dots. `words`: show only this many, while a new answer is appearing. */
export function PointsBlock({ items, words }: { items: string[]; words?: number }) {
  const shares = shareWords(items.map(wordCount), words)
  const shown = items.flatMap((item, i) => {
    const share = shares[i]
    if (share === undefined) return [item]
    return share > 0 ? [firstWords(item, share)] : []
  })
  return (
    <ul className="flex flex-col gap-1.5">
      {shown.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-[#f6f1ee]">
          <span aria-hidden className="mt-[0.65em] h-[5px] w-[5px] shrink-0 rounded-full bg-[#a69d98]" />
          <span className="min-w-0 break-words">{withBold(item)}</span>
        </li>
      ))}
    </ul>
  )
}
