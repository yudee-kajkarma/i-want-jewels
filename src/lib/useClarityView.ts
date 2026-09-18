'use client'
import { useEffect, useRef } from 'react'
import { trackClarity, type ClarityEvent } from './clarity'

export function useClarityView(event: ClarityEvent, ready: boolean, key = 'view') {
  const sent = useRef('')
  useEffect(() => {
    const identity = `${event}:${key}`
    if (ready && sent.current !== identity && trackClarity(event)) sent.current = identity
  }, [event, ready, key])
}
