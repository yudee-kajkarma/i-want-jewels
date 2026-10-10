import type { LumiProductDetail } from '../contract'
import type { LumiBlockActions } from './BlockList'
import { ProductDetailCard } from './ProductDetailCard'
import { SnapRow } from './SnapRow'

/** Two to four products in full, side by side in a sliding row; each can be added on its own. */
export function CompareBlock({ products, actions }: { products: LumiProductDetail[]; actions: LumiBlockActions }) {
  return (
    <SnapRow arrows={products.length > 1} arrowTop="top-[30px]">
      {products.map((product) => (
        <li key={product.slug} className="w-[276px] shrink-0 snap-start">
          <ProductDetailCard product={product} actions={actions} compact />
        </li>
      ))}
    </SnapRow>
  )
}
