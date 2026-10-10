import type { LumiProductDetail } from '../contract'
import type { LumiBlockActions } from './BlockList'
import { ProductDetailCard } from './ProductDetailCard'

/** One product in full: choose a colour and size, then add it to the bag or buy it now. */
export function ProductBlock({ product, actions }: { product: LumiProductDetail; actions: LumiBlockActions }) {
  return <ProductDetailCard product={product} actions={actions} />
}
