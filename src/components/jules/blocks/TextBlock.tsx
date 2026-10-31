import { RevealText } from './reveal'

/** The answer itself, in Jules's voice. `shown`: how far a new answer has flowed in (letters), while it appears. */
export function TextBlock({ text, shown }: { text: string; shown?: number }) {
  return (
    <p className="whitespace-pre-line break-words text-[14px] leading-[1.6] text-[#f6f1ee]">
      <RevealText text={text} shown={shown} />
    </p>
  )
}
