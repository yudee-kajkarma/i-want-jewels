'use client'

import { cn } from '@/lib/utils'
import type { JulesBlock, JulesChatApi } from '../contract'
import { BagBlock } from './BagBlock'
import { CartAddedBlock } from './CartAddedBlock'
import { CompareBlock } from './CompareBlock'
import { GiftBalancesBlock } from './GiftBalancesBlock'
import { GiftFinderBlock } from './GiftFinderBlock'
import { LinksBlock } from './LinksBlock'
import { MessageFormBlock } from './MessageFormBlock'
import { NoticeBlock } from './NoticeBlock'
import { OrderBlock } from './OrderBlock'
import { OrdersBlock } from './OrdersBlock'
import { PointsBlock } from './PointsBlock'
import { ProductBlock } from './ProductBlock'
import { ProductsBlock } from './ProductsBlock'
import { TextBlock } from './TextBlock'
import { WishlistBlock } from './WishlistBlock'

/** What the blocks may ask the chat to do: open an order, send a form, choose and add a product, answer the gift finder. */
export type JulesBlockActions = Pick<
  JulesChatApi,
  | 'busy'
  | 'showOrder'
  | 'sendToTeam'
  | 'chooseOptions'
  | 'addToBag'
  | 'buyNow'
  | 'toggleWishlist'
  | 'isWishlisted'
  | 'answerGiftFinder'
  | 'startGiftFinder'
>

const KNOWN_TYPES = new Set<string>([
  'text', 'points', 'products', 'product', 'compare', 'links', 'notice',
  'orders', 'order', 'messageForm', 'giftBalances',
  'cartAdded', 'bag', 'wishlist', 'giftFinder',
])

/** Written words share Jules's bubble; cards, links and forms stand on their own. */
const BUBBLE_TYPES = new Set<string>(['text', 'points'])

/** Rows of cards may use the whole width (more cards show in the larger panel); single cards and bubbles keep a readable width. */
const ROW_TYPES = new Set<string>(['products', 'compare', 'wishlist'])

/** False for block types this version of the site doesn't know (e.g. from a newer saved chat). */
export const isKnownBlock = (block: { type: string }) => KNOWN_TYPES.has(block.type)

type Group = { bubble: boolean; blocks: JulesBlock[] }

/** Splits a message into runs: consecutive text and points form one bubble, everything else is drawn alone. */
function groupBlocks(blocks: JulesBlock[]): Group[] {
  const groups: Group[] = []
  for (const block of blocks) {
    if (!isKnownBlock(block)) continue
    const bubble = BUBBLE_TYPES.has(block.type)
    const last = groups[groups.length - 1]
    if (bubble && last?.bubble) last.blocks.push(block)
    else groups.push({ bubble, blocks: [block] })
  }
  return groups
}

type BlockListProps = {
  messageId: string
  blocks: JulesBlock[]
  actions: JulesBlockActions
  /** The first message of Jules's run: its bubble gets the small corner next to the avatar. */
  first?: boolean
}

/** Draws one of Jules's messages: its blocks in order, each by its own component. Unknown types are skipped. */
export function BlockList({ messageId, blocks, actions, first = false }: BlockListProps) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-2">
      {groupBlocks(blocks).map((group, i) =>
        group.bubble ? (
          <div
            key={i}
            className={cn('max-w-full space-y-2 rounded-[20px] bg-[#231e1d] px-3.5 py-2.5 md:max-w-[560px]', first && i === 0 && 'rounded-tl-[6px]')}
          >
            {group.blocks.map((block, j) => (
              <Block key={j} block={block} messageId={messageId} actions={actions} />
            ))}
          </div>
        ) : (
          <div key={i} className={cn('w-full min-w-0', !ROW_TYPES.has(group.blocks[0].type) && 'max-w-[460px]')}>
            <Block block={group.blocks[0]} messageId={messageId} actions={actions} />
          </div>
        ),
      )}
    </div>
  )
}

function Block({ block, messageId, actions }: { block: JulesBlock; messageId: string; actions: JulesBlockActions }) {
  switch (block.type) {
    case 'text':
      return <TextBlock text={block.text} />
    case 'points':
      return <PointsBlock items={block.items} />
    case 'products':
      return <ProductsBlock products={block.products} actions={actions} />
    case 'product':
      return <ProductBlock product={block.product} actions={actions} />
    case 'compare':
      return <CompareBlock products={block.products} actions={actions} />
    case 'links':
      return <LinksBlock links={block.links} />
    case 'notice':
      return <NoticeBlock tone={block.tone} text={block.text} />
    case 'orders':
      return <OrdersBlock orders={block.orders} more={block.more} busy={actions.busy} onPick={(id) => void actions.showOrder(id)} />
    case 'order':
      return <OrderBlock order={block.order} />
    case 'messageForm':
      return <MessageFormBlock messageId={messageId} done={block.done} busy={actions.busy} onSend={actions.sendToTeam} />
    case 'giftBalances':
      return <GiftBalancesBlock cards={block.cards} />
    case 'cartAdded':
      return <CartAddedBlock item={block.item} />
    case 'bag':
      return <BagBlock />
    case 'wishlist':
      return <WishlistBlock actions={actions} />
    case 'giftFinder':
      return <GiftFinderBlock messageId={messageId} block={block} actions={actions} />
    default:
      return null
  }
}
