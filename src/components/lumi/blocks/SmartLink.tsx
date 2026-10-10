'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from '@/lib/router'

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; children: ReactNode }

/**
 * Shop pages ("/…") open in place, in the visitor's language. Web addresses
 * open in a new tab. Anything else (e.g. "javascript:") is not a link at all.
 */
export function SmartLink({ to, children, ...props }: SmartLinkProps) {
  if (to.startsWith('/') && !to.startsWith('//')) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    )
  }
  if (/^https?:\/\//i.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
  return <span className={props.className}>{children}</span>
}
