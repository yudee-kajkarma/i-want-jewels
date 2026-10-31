import { firstWords } from './reveal'
import { withBold } from './richText'

/** The answer itself, in Jules's voice. `words`: show only this many, while a new answer is appearing. */
export function TextBlock({ text, words }: { text: string; words?: number }) {
  return (
    <p className="whitespace-pre-line break-words text-[14px] leading-[1.6] text-[#f6f1ee]">
      {withBold(words === undefined ? text : firstWords(text, words))}
    </p>
  )
}
