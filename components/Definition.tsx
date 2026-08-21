'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import type { ReactNode } from 'react'

export default function Definition({ children, text }: { children: ReactNode; text: string }) {
  return (
    <Popover as="span" className="relative inline">
      <PopoverButton className="focus-visible:ring-primary-500 cursor-help border-b-[0.5px] border-dotted border-gray-500 bg-transparent p-0 font-[inherit] text-inherit focus:outline-none focus-visible:ring-2">
        {children}
      </PopoverButton>
      <PopoverPanel
        as="span"
        anchor="top"
        className="z-50 max-w-xs rounded border border-dotted border-gray-500 bg-white px-2 py-1.5 text-xs leading-normal text-gray-800 shadow-sm [--anchor-gap:6px] dark:bg-gray-900 dark:text-gray-100"
      >
        {text}
      </PopoverPanel>
    </Popover>
  )
}
