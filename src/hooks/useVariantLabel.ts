import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Maps a canonical `variant_name` to a localized, human-readable metal label.
 *
 * Order items persist only the canonical enum — `order.service.ts` writes
 * `variant_name: variant.variant_name` and never copies the variant's own
 * `title`. So an order item knows it is `"gold"`, not `"Yellow Gold"`. Cart
 * items are unaffected because they carry a separate `variantTitle`.
 *
 * Note `silver` is the storage value for **White Gold**, matching the admin
 * product form (`variantNameOptions` in `adminProductHelpers`). Rendering the
 * raw value would mislabel the metal, not merely lowercase it.
 *
 * Keys are reused from the product filters rather than duplicated: those three
 * strings are already human-translated in all six locales, and a second copy
 * would be free to drift from the first.
 */
const VARIANT_LABEL_KEYS: Record<string, string> = {
  gold: 'productsFilters.yellowGold',
  'yellow gold': 'productsFilters.yellowGold',
  silver: 'productsFilters.whiteGold',
  'white gold': 'productsFilters.whiteGold',
  'rose gold': 'productsFilters.roseGold',
  'pink gold': 'productsFilters.roseGold',
  'gift card': 'cart.giftCard',
};

/** Presentable rendering for a value with no mapping (e.g. a metal added later). */
function toTitleCase(value: string): string {
  return value
    .split(' ')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

/**
 * Returns a formatter for order/cart item variant names. Empty string when
 * there is no value, so call sites keep their own "default variant" fallback.
 */
export function useVariantLabel() {
  const { t } = useTranslation('common');

  return useCallback(
    (variantName?: string | null): string => {
      const raw = (variantName ?? '').trim();
      if (!raw) {
        return '';
      }

      const key = VARIANT_LABEL_KEYS[raw.toLowerCase()];
      return key ? t(key) : toTitleCase(raw);
    },
    [t],
  );
}
