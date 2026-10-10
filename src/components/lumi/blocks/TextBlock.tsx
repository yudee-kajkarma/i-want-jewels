import { withBold } from './richText'

/** The answer itself, in Lumi's voice. */
export function TextBlock({ text }: { text: string }) {
  return <p className="whitespace-pre-line break-words text-[14px] leading-[1.6] text-[#f6f1ee]">{withBold(text)}</p>
}
