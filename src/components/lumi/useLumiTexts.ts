'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Lumi's texts are written in English first and translated after. The site
 * sends the browser only the page's own language (no English copy to fall
 * back on), so a text a language doesn't have yet would show as its key
 * ("chat.lumi.home.help"). Until a language has Lumi's texts, the English
 * ones are loaded once and used for the missing ones; Lumi waits for them
 * instead of showing keys. Languages that have them load nothing extra.
 */

/** A few texts from each part of Lumi: one missing means the language doesn't have them all yet. */
const MARKERS = [
  'chat.lumi.askLumi',
  'chat.lumi.home.help',
  'chat.lumi.chips.giftIdeas',
  'chat.lumi.context.chips.pairs',
  'chat.lumi.shop.addToBag',
  'chat.lumi.gift.title',
  'chat.lumi.status.seen',
  'chat.lumi.feedback.label',
]

/** True once every text Lumi shows can be shown (in the page's language, or else in English). */
export function useLumiTexts(): boolean {
  const { i18n } = useTranslation('common')
  const language = i18n.language
  const missing = MARKERS.some((key) => !i18n.exists(key))
  /** The language the English texts were added for. */
  const [filled, setFilled] = useState<string | null>(null)

  useEffect(() => {
    if (!missing) return
    let current = true
    import('../../locales/en/common.json').then(
      (english) => {
        i18n.addResourceBundle('en', 'common', english.default, true, false)
        if (current) setFilled(language)
      },
      () => {
        // Couldn't load (offline): Lumi stays hidden on this page rather than showing keys.
      },
    )
    return () => {
      current = false
    }
  }, [missing, i18n, language])

  return !missing || filled === language
}
