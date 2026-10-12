import type { JulesProductDetail } from '../contract'
import type { JulesBlockActions } from './BlockList'
import { ProductDetailCard } from './ProductDetailCard'

/** One product in full: choose a colour and size, then add it to the bag or buy it now. */
export function ProductBlock({ product, actions }: { product: JulesProductDetail; actions: JulesBlockActions }) {
  return <ProductDetailCard product={product} actions={actions} />
}
