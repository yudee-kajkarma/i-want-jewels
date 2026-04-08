'use client'

import NextLink from 'next/link'
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from 'next/navigation'
import { useEffect, useMemo, type AnchorHTMLAttributes, type ReactNode } from 'react'

type NavigateOptions = {
  replace?: boolean
  state?: unknown
}

type LocationLike = {
  pathname: string
  search: string
  state: unknown
  key: string
}

type LinkComponentProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  children: ReactNode
}

const navigationStatePrefix = 'iwj-navigation-state:'
const navigationStateParam = '__nav'

function createNavigationStateKey() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function persistNavigationState(state: unknown): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  const key = createNavigationStateKey()
  window.sessionStorage.setItem(`${navigationStatePrefix}${key}`, JSON.stringify(state))

  return key
}

function readNavigationState(key: string | null): unknown {
  if (!key || typeof window === 'undefined') {
    return null
  }

  const rawValue = window.sessionStorage.getItem(`${navigationStatePrefix}${key}`)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue)
  } catch {
    window.sessionStorage.removeItem(`${navigationStatePrefix}${key}`)
    return null
  }
}

function buildTargetUrl(target: string, stateKey?: string | null): string {
  if (typeof window === 'undefined') {
    return target
  }

  const url = new URL(target, window.location.origin)

  if (stateKey) {
    url.searchParams.set(navigationStateParam, stateKey)
  }

  return `${url.pathname}${url.search}${url.hash}`
}

export function Link({ to, children, ...props }: LinkComponentProps) {
  return (
    <NextLink href={to} {...props}>
      {children}
    </NextLink>
  )
}

export function useNavigate() {
  const router = useRouter()

  return (to: string, options?: NavigateOptions) => {
    const stateKey = options?.state ? persistNavigationState(options.state) : null
    const nextUrl = buildTargetUrl(to, stateKey)

    if (options?.replace) {
      router.replace(nextUrl)
      return
    }

    router.push(nextUrl)
  }
}

export function useLocation(): LocationLike {
  const pathname = usePathname() ?? '/'
  const search = typeof window === 'undefined' ? '' : window.location.search
  const stateKey = useMemo(() => new URLSearchParams(search).get(navigationStateParam), [search])
  const state = useMemo(() => readNavigationState(stateKey), [stateKey])

  useEffect(() => {
    if (!stateKey || typeof window === 'undefined') {
      return
    }

    const url = new URL(window.location.href)
    url.searchParams.delete(navigationStateParam)
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
  }, [stateKey])

  return {
    pathname,
    search,
    state,
    key: `${pathname}${search}`,
  }
}

export function useParams<T extends Record<string, string | string[]> = Record<string, string | string[]>>() {
  return (useNextParams() ?? {}) as T
}

export function useSearchParams() {
  const searchParams = useNextSearchParams()

  return [searchParams ?? new URLSearchParams(), () => undefined] as const
}

export function Navigate({ to, replace = false, state }: { to: string; replace?: boolean; state?: unknown }) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(to, { replace, state })
  }, [navigate, replace, state, to])

  return null
}