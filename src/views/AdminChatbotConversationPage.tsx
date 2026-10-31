'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Bot, Headset, LoaderCircle, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { customerName } from '../components/admin/chatbot/ChatbotConversationsPanel'
import { apiErrorMessage, getConversation, type Conversation, type ConversationMessage } from '../services/chatbotAdminService'
import { formatDateTime } from '../utils/formatDate'

/*
 * Admin → Chatbot → one conversation: the customer's questions and Jules's
 * answers in order, with what each answer showed (products, links) and the
 * customer's 👍/👎. Read only.
 */

const AS_TYPED = { interpolation: { escapeValue: false } } as const

export default function AdminChatbotConversationPage() {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.chatbot.conversation' })
  const params = useParams<{ key?: string | string[] }>()
  const key = Array.isArray(params.key) ? params.key[0] : params.key ?? ''
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    getConversation(key)
      .then((next) => {
        if (!cancelled) setConversation(next)
      })
      .catch((failure) => {
        if (!cancelled) setError(apiErrorMessage(failure, t('errorLoad')))
      })
    return () => {
      cancelled = true
    }
  }, [key, t])

  const date = (value: string) => formatDateTime(value, i18n.language)
  const customer = conversation?.customer
  const askedForPerson = conversation?.messages.some((m) => m.tool === 'talk_to_person' || m.shown?.action === 'talk_to_person')

  return (
    <div className="min-h-screen bg-[#fffdfa]">
      <Header />
      <main className="mx-auto max-w-[1100px] px-4 py-8 lg:px-8 lg:py-10">
        <Link to="/admin/chatbot?tab=conversations" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition hover:text-[#8f2a60]">
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Link>

        {error ? <p className="mt-8 border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</p> : null}

        {!conversation && !error ? (
          <div className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            {t('loading')}
          </div>
        ) : null}

        {conversation && customer ? (
          <>
            <header className="mt-6 border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
              <h1 className="text-2xl font-bold text-[#17110d]">{customerName(customer)}</h1>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-600">
                {customer.kind === 'account' && customer.email ? <span>{customer.email}</span> : null}
                <span>{customer.kind === 'guest' ? t('guest') : t(`tiers.${conversation.tier}`, { defaultValue: conversation.tier })}</span>
                <span>{t('messages', { count: conversation.messages.length, ...AS_TYPED })}</span>
                {conversation.messages.length ? <span>{date(conversation.messages[0].at)}</span> : null}
              </div>
              {askedForPerson ? (
                <p className="mt-4 inline-flex flex-wrap items-center gap-2 border border-[#8f2a60]/30 bg-[#fffdfa] px-3 py-2 text-sm text-[#8f2a60]">
                  <Headset className="h-4 w-4" />
                  {t('askedForPerson')}
                  <Link to="/admin/tickets" className="font-bold underline underline-offset-2">{t('openTickets')}</Link>
                </p>
              ) : null}
            </header>

            <ol className="mt-6 space-y-6">
              {conversation.messages.map((message, index) => (
                <li key={`${message.at}-${index}`}>
                  <Exchange message={message} date={date(message.at)} />
                </li>
              ))}
            </ol>
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}

function Exchange({ message, date }: { message: ConversationMessage; date: string }) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.chatbot.conversation' })
  const shown = message.shown

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-[#17110d] px-4 py-3 text-sm text-white sm:max-w-[70%]">
          <p className="whitespace-pre-wrap break-words">{message.question}</p>
          <p className="mt-1 text-right text-[11px] text-white/60">{date} · {message.locale.toUpperCase()}</p>
        </div>
      </div>

      <div className="flex justify-start gap-2">
        <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#eadfd4] bg-white text-[#8f2a60]">
          <Bot className="h-4 w-4" />
        </span>
        <div className="max-w-[85%] border border-[#eadfd4] bg-white px-4 py-3 text-sm text-[#17110d] sm:max-w-[70%]">
          {message.answer ? (
            <p className="whitespace-pre-wrap break-words">{message.answer}</p>
          ) : (
            <p className="italic text-zinc-500">{t(`outcomes.${message.outcome}`, { defaultValue: t('noAnswer') })}</p>
          )}

          {shown?.action ? (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8f2a60]">
              {shown.action === 'talk_to_person' ? <Headset className="h-3.5 w-3.5" /> : null}
              {t(`actions.${shown.action}`, { defaultValue: shown.action })}
            </p>
          ) : null}

          {shown && shown.products.length > 0 ? (
            <div className="mt-3 border-t border-[#f3ece4] pt-2">
              <p className="text-xs font-semibold text-zinc-500">{t('showedProducts', { count: shown.products.length, ...AS_TYPED })}</p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {shown.products.map((product) => (
                  <li key={product.slug}>
                    <Link to={`/products/${product.slug}`} prefetch={false} target="_blank" className="inline-block border border-[#eadfd4] bg-[#fffdfa] px-2 py-1 text-xs text-[#17110d] hover:border-[#8f2a60]">
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {shown && shown.links.length > 0 ? (
            <div className="mt-3 border-t border-[#f3ece4] pt-2">
              <p className="text-xs font-semibold text-zinc-500">{t('showedLinks')}</p>
              <ul className="mt-1 space-y-0.5">
                {shown.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noreferrer" className="text-xs text-[#8f2a60] underline-offset-2 hover:underline">{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-400">
            {message.productSlug ? <span>{t('onProduct', { slug: message.productSlug, ...AS_TYPED })}</span> : null}
            {message.usedAI && message.aiModel ? <span>{message.aiModel}</span> : null}
            {message.feedback === 'up' ? <span className="inline-flex items-center gap-1 font-semibold text-emerald-700"><ThumbsUp className="h-3.5 w-3.5" />{t('helpful')}</span> : null}
            {message.feedback === 'down' ? <span className="inline-flex items-center gap-1 font-semibold text-red-700"><ThumbsDown className="h-3.5 w-3.5" />{t('notHelpful')}</span> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
