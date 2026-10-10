import { withBold } from './richText'

/** Short facts or tips, as a simple list with small dots. */
export function PointsBlock({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item, i) => (
        <li key={`${i}-${item}`} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-[#f6f1ee]">
          <span aria-hidden className="mt-[0.65em] h-[5px] w-[5px] shrink-0 rounded-full bg-[#a69d98]" />
          <span className="min-w-0 break-words">{withBold(item)}</span>
        </li>
      ))}
    </ul>
  )
}
