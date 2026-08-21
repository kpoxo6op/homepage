'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export default function Definition({ children, text }: { children: ReactNode; text: string }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return

    const close = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  return (
    <span ref={containerRef} className="relative inline">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="cursor-help border-b border-dotted border-gray-600 bg-transparent p-0 font-[inherit] text-inherit focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gray-500 dark:border-gray-300"
      >
        {children}
      </button>
      {open && (
        <span className="absolute right-0 bottom-[calc(100%+6px)] z-50 w-80 max-w-[calc(100vw-2rem)] rounded border border-dotted border-gray-500 bg-white px-2 py-1.5 text-xs leading-normal text-gray-800 shadow-sm sm:right-auto sm:left-1/2 sm:-translate-x-1/2 dark:bg-gray-900 dark:text-gray-100">
          {text}
        </span>
      )}
    </span>
  )
}
