import type { ReactNode } from 'react'

export default function Definition({
  children,
  id,
  text,
}: {
  children: ReactNode
  id: string
  text: string
}) {
  return (
    <span className="inline">
      <button
        type="button"
        popoverTarget={id}
        className="cursor-help border-b border-dotted border-gray-600 bg-transparent p-0 font-[inherit] text-inherit focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gray-500 dark:border-gray-300"
      >
        {children}
      </button>
      <span
        id={id}
        popover="auto"
        className="m-auto w-80 max-w-[calc(100vw-2rem)] rounded border border-dotted border-gray-500 bg-white px-3 py-2 text-sm leading-normal text-gray-800 shadow-sm backdrop:bg-transparent dark:bg-gray-900 dark:text-gray-100"
      >
        {text}
      </span>
    </span>
  )
}
