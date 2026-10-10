import { CircleCheck } from 'lucide-react'

/** What a form turns into once it has done its job: one calm line with a tick. */
export function FormDone({ text }: { text: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#1e1a19] px-3 py-1.5 text-[12.5px] font-medium text-[#f6f1ee] motion-safe:animate-lumi-fade">
      <CircleCheck aria-hidden className="h-4 w-4 shrink-0 text-[#4ade80]" />
      {text}
    </p>
  )
}
