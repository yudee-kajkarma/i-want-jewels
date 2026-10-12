import { Fragment, type ReactNode } from 'react'

/**
 * Shows **bold** as bold and keeps everything else as plain text. Nothing is
 * read as HTML, so an answer can never inject markup.
 */
export function withBold(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}
