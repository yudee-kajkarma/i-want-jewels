'use client';

import { useTranslation } from 'react-i18next';
import { Link } from '@/lib/router';

type MobileStickyActionsProps = {
  productsHref?: string;
  contactHref?: string;
};

/**
 * Mobile-only action bar for article pages.
 *
 * Render it directly before <Footer />: `sticky bottom-0` pins it to the
 * viewport bottom while reading, and once its natural spot above the footer
 * scrolls into view it stays there, so it never overlaps the footer.
 */
export default function MobileStickyActions({
  productsHref = '/products',
  contactHref = '/contact',
}: MobileStickyActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="sticky bottom-0 z-20 border-t border-zinc-200 bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(31,39,50,0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <Link
          to={productsHref}
          className="inline-flex items-center justify-center bg-[#1f2732] px-3 py-3 text-center font-poppins text-[11px] font-medium uppercase tracking-[0.18em] text-white transition active:bg-pink-500"
        >
          {t('common.viewAllProducts')}
        </Link>
        <Link
          to={contactHref}
          className="inline-flex items-center justify-center border border-pink-400 bg-white px-3 py-3 text-center font-poppins text-[11px] font-medium uppercase tracking-[0.18em] text-pink-500 transition active:bg-pink-50"
        >
          {t('footer.contactUs')}
        </Link>
      </div>
    </div>
  );
}
