'use client'

import { useEffect, useRef, useState } from 'react'
import { searchRecipientEmails, type RecipientSuggestion } from '../../services/giftCardService'

type RecipientEmailPickerProps = {
  value: string
  // isValid is true only when the email matches an existing account suggestion.
  onChange: (email: string, isValid: boolean) => void
  placeholder?: string
  className?: string
}

export default function RecipientEmailPicker({
  value,
  onChange,
  placeholder = 'Recipient email',
  className = '',
}: RecipientEmailPickerProps) {
  const [suggestions, setSuggestions] = useState<RecipientSuggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const query = value.trim()
    if (query.length < 2) {
      setSuggestions([])
      setNoMatch(false)
      return
    }

    let active = true
    setIsSearching(true)
    const timer = setTimeout(() => {
      searchRecipientEmails(query)
        .then((results) => {
          if (!active) return
          setSuggestions(results)
          setNoMatch(results.length === 0)
          // Auto-confirm validity if the typed value exactly matches an account.
          const exact = results.find((r) => r.email.toLowerCase() === query.toLowerCase())
          onChange(value, Boolean(exact))
        })
        .catch(() => {
          if (active) {
            setSuggestions([])
            setNoMatch(false)
          }
        })
        .finally(() => active && setIsSearching(false))
    }, 300)

    return () => {
      active = false
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function selectSuggestion(suggestion: RecipientSuggestion) {
    onChange(suggestion.email, true)
    setIsOpen(false)
    setSuggestions([])
    setNoMatch(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="email"
        value={value}
        onChange={(event) => {
          onChange(event.target.value, false)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        className={className}
      />
      {isOpen && value.trim().length >= 2 ? (
        <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto border border-[#e7d3c2] bg-white shadow-lg">
          {isSearching ? (
            <p className="px-3 py-2 text-xs text-zinc-400">Searching…</p>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <button
                key={suggestion.email}
                type="button"
                onClick={() => selectSuggestion(suggestion)}
                className="flex w-full flex-col items-start px-3 py-2 text-left text-sm transition hover:bg-[#fff2fa]"
              >
                <span className="font-medium text-[#17110d]">{suggestion.email}</span>
                {suggestion.name ? (
                  <span className="text-xs text-zinc-500">{suggestion.name}</span>
                ) : null}
              </button>
            ))
          ) : noMatch ? (
            <p className="px-3 py-2 text-xs text-rose-600">
              No account found with this email. Gift cards can only be sent to a registered user.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
