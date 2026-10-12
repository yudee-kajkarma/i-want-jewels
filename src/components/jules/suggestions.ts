/**
 * Jules's question library, as shown on the Home and Explore screens. The ids
 * match the backend's list (Ecom_Backend_Services/src/ai/jules/suggestions.ts),
 * which knows each question's answer path; the texts are translations
 * (chat.jules.suggestions.<id>) and the topic names chat.jules.categories.<id>.
 */

export const JULES_CATEGORIES = ['shop', 'gifts', 'sizing', 'materials', 'care', 'styling', 'delivery', 'orders'] as const
export type JulesCategory = (typeof JULES_CATEGORIES)[number]

export type JulesSuggestion = { id: string; category: JulesCategory; top?: boolean }

export const JULES_SUGGESTIONS: JulesSuggestion[] = [
  { id: 'best-earrings', category: 'shop', top: true },
  { id: 'popular-necklaces', category: 'shop' },
  { id: 'rings-under-200', category: 'shop' },
  { id: 'most-affordable', category: 'shop' },
  { id: 'rose-gold', category: 'shop' },
  { id: 'bracelet-prices', category: 'shop' },

  { id: 'gifts-under-150', category: 'gifts', top: true },
  { id: 'gift-cards', category: 'gifts' },
  { id: 'anniversary-gift', category: 'gifts' },
  { id: 'birthday-gift', category: 'gifts' },

  { id: 'ring-size', category: 'sizing', top: true },
  { id: 'necklace-length', category: 'sizing' },
  { id: 'face-shape', category: 'sizing' },
  { id: 'band-width', category: 'sizing' },

  { id: 'lab-grown-real', category: 'materials', top: true },
  { id: 'gold-plated-silver', category: 'materials' },
  { id: 'gold-filled-vs-plated', category: 'materials' },
  { id: 'rhodium-plated', category: 'materials' },

  { id: 'shower', category: 'care', top: true },
  { id: 'clean-gold-plated', category: 'care' },
  { id: 'untangle-necklace', category: 'care' },
  { id: 'pendant-flipping', category: 'care' },

  { id: 'navy-dress', category: 'styling' },
  { id: 'job-interview', category: 'styling' },
  { id: 'wedding-guest', category: 'styling' },
  { id: 'square-neck', category: 'styling' },

  { id: 'delivery-time', category: 'delivery', top: true },
  { id: 'returns', category: 'delivery' },

  { id: 'track-order', category: 'orders' },
  { id: 'talk-person', category: 'orders' },
]

export const JULES_TOP_SUGGESTIONS = JULES_SUGGESTIONS.filter((s) => s.top)

export const findJulesSuggestion = (id: string) => JULES_SUGGESTIONS.find((s) => s.id === id)
