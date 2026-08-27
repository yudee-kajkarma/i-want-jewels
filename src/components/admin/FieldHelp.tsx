'use client'

type Props = {
  /** Short plain-language explanation shown on hover/focus. */
  text: string
}

/**
 * Small "?" badge that reveals a one-line explanation, mirroring the hints DHL
 * shows beside its own shipment fields. Keyboard focusable so the hint is not
 * mouse-only, and `title` is set as a fallback for touch devices.
 */
export default function FieldHelp({ text }: Props) {
  return (
    <span className="group relative ml-1 inline-flex align-middle">
      <button
        type="button"
        tabIndex={0}
        aria-label={text}
        title={text}
        className="flex h-3.5 w-3.5 cursor-help items-center justify-center rounded-full border border-[#d9b6cd] text-[9px] font-bold leading-none text-[#a86d92] transition hover:border-[#d24a90] hover:text-[#d24a90] focus:outline-none focus:ring-1 focus:ring-[#d24a90]"
      >
        ?
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 w-56 -translate-x-1/2 rounded border border-[#e3bfd6] bg-white px-2.5 py-1.5 text-[10px] font-normal normal-case leading-relaxed tracking-normal text-[#4f2040] opacity-0 shadow-lg transition-opacity duration-100 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
      </span>
    </span>
  )
}
