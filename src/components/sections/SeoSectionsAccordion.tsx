'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type {
  SeoExtendedSection,
  SeoExtendedTable,
  SeoStandardSection,
} from '../../types/product'

type SeoSectionsAccordionProps = {
  sections: SeoExtendedSection[]
  fallbackTitle: string
  fallbackOpeningParagraph?: string
}

function splitParagraphs(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function SeoTable({ table }: { table: SeoExtendedTable }) {
  return (
    <div className="mt-5 overflow-x-auto">
      {table.tableName ? (
        <p className="mb-2 font-play text-[13px] font-medium uppercase tracking-[0.18em] text-zinc-700">
          {table.tableName}
        </p>
      ) : null}
      <table className="w-full border-collapse text-left text-[13px] text-zinc-700 sm:text-[14px]">
        <thead>
          <tr className="border-y border-zinc-300 bg-zinc-50">
            {table.columns.map((column) => (
              <th
                key={column}
                className="px-3 py-2.5 font-play text-[12px] font-medium uppercase tracking-[0.14em] text-zinc-900 sm:px-4 sm:py-3 sm:text-[13px]"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-zinc-200 last:border-b-0"
            >
              {table.columns.map((column) => (
                <td
                  key={column}
                  className="px-3 py-2.5 align-top leading-6 sm:px-4 sm:py-3"
                >
                  {row[column] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StandardAccordionItem({
  section,
  isOpen,
  onToggle,
}: {
  section: SeoStandardSection
  isOpen: boolean
  onToggle: () => void
}) {
  const readMoreParagraphs = splitParagraphs(section.readMoreDropdown)
  const hasBody =
    section.quickAnswer.trim().length > 0 ||
    section.tables.length > 0 ||
    readMoreParagraphs.length > 0

  return (
    <article className="border-b border-zinc-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition hover:text-pink-500"
        aria-expanded={isOpen}
        disabled={!hasBody}
      >
        <span className="pr-3 font-play text-[15px] font-medium text-zinc-900 sm:text-[17px]">
          {section.h2}
        </span>
        {hasBody ? (
          <ChevronDown
            className={`mt-1 h-5 w-5 shrink-0 text-zinc-500 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            strokeWidth={1.6}
          />
        ) : null}
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 text-[14px] leading-7 text-zinc-600">
            {section.quickAnswer ? (
              <p className="max-w-[860px] whitespace-pre-line">
                {section.quickAnswer}
              </p>
            ) : null}

            {section.tables.map((table, index) => (
              <SeoTable key={`${table.tableName}-${index}`} table={table} />
            ))}

            {readMoreParagraphs.length > 0 ? (
              <div className="mt-5 max-w-[860px] space-y-4">
                {readMoreParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function SeoSectionsAccordion({
  sections,
  fallbackTitle,
  fallbackOpeningParagraph,
}: SeoSectionsAccordionProps) {
  const intro = sections.find(
    (section): section is Extract<SeoExtendedSection, { sectionType: 'intro' }> =>
      section.sectionType === 'intro',
  )
  const standardSections = sections.filter(
    (section): section is SeoStandardSection =>
      section.sectionType === 'standard-h2',
  )

  const [openIndex, setOpenIndex] = useState<number | null>(
    standardSections.length > 0 ? 0 : null,
  )

  const heading = intro?.h1?.trim() || fallbackTitle
  const openingParagraph =
    intro?.openingParagraph?.trim() || fallbackOpeningParagraph || ''

  return (
    <div className="font-poppins">
      <h2 className="font-play text-[20px] font-bold tracking-[-0.01em] text-zinc-900 sm:text-[26px]">
        {heading}
      </h2>
      {openingParagraph ? (
        <p className="mt-4 max-w-[60rem] whitespace-pre-line text-[14px] leading-7 text-zinc-500">
          {openingParagraph}
        </p>
      ) : null}

      {standardSections.length > 0 ? (
        <div className="mt-10 border-t border-zinc-200">
          {standardSections.map((section, index) => (
            <StandardAccordionItem
              key={`${section.h2}-${index}`}
              section={section}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
