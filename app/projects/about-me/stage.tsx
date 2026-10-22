'use client'

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import Link from '@/components/Link'
import s from './about.module.css'

export interface Theme {
  bg: string
  ink: string
  soft: string
  accent: string
}

export interface ChapterLink {
  id: string
  label: string
}

interface Props {
  chapters: ChapterLink[]
  initial: Theme
  className?: string
  children: ReactNode
}

const vars = (t: Theme) =>
  ({ '--bg': t.bg, '--ink': t.ink, '--soft': t.soft, '--accent': t.accent }) as CSSProperties

export default function Stage({ chapters, initial, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    root.setAttribute('data-ready', '')
    root.focus({ preventScroll: true })

    const top = (el: HTMLElement) =>
      el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop

    const themed = Array.from(root.querySelectorAll<HTMLElement>('[data-bg]'))
    const chapterEls = chapters
      .map((c) => root.querySelector<HTMLElement>(`#${c.id}`))
      .filter((el): el is HTMLElement => el !== null)

    // The section crossing the middle of the screen sets the colours.
    const themeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          const { bg, ink, soft, accent } = el.dataset
          if (bg) root.style.setProperty('--bg', bg)
          if (ink) root.style.setProperty('--ink', ink)
          if (soft) root.style.setProperty('--soft', soft)
          if (accent) root.style.setProperty('--accent', accent)
        }
      },
      { root, rootMargin: '-50% 0px -50% 0px' }
    )
    themed.forEach((el) => themeObserver.observe(el))

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = chapterEls.indexOf(entry.target as HTMLElement)
          if (index >= 0) setActive(index)
        }
      },
      { root, rootMargin: '-50% 0px -50% 0px' }
    )
    chapterEls.forEach((el) => chapterObserver.observe(el))

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-shown', '')
          revealObserver.unobserve(entry.target)
        }
      },
      { root, rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    )
    root.querySelectorAll(`.${s.reveal}`).forEach((el) => revealObserver.observe(el))

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const max = root.scrollHeight - root.clientHeight
        root.style.setProperty('--progress', String(max > 0 ? root.scrollTop / max : 0))
      })
    }
    root.addEventListener('scroll', onScroll, { passive: true })

    // Presenter keys: right and left jump between chapters, the rest scrolls as usual.
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target && /^(input|textarea|select)$/i.test(target.tagName)) return
      const step =
        event.key === 'ArrowRight' || event.key === 'l'
          ? 1
          : event.key === 'ArrowLeft' || event.key === 'h'
            ? -1
            : 0
      if (!step) return
      event.preventDefault()
      const y = root.scrollTop
      const tops = chapterEls.map(top)
      const next =
        step > 0 ? tops.find((t) => t > y + 8) : [...tops].reverse().find((t) => t < y - 8)
      if (next !== undefined) root.scrollTo({ top: next, behavior: 'smooth' })
    }
    window.addEventListener('keydown', onKey)

    return () => {
      themeObserver.disconnect()
      chapterObserver.disconnect()
      revealObserver.disconnect()
      root.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(frame)
    }
  }, [chapters])

  const go = (id: string) => {
    const root = ref.current
    const el = root?.querySelector<HTMLElement>(`#${id}`)
    if (!root || !el) return
    const y = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop
    root.scrollTo({ top: y, behavior: 'smooth' })
  }

  const current = chapters[active]

  return (
    <div
      ref={ref}
      className={`${s.stage} ${className ?? ''}`}
      style={vars(initial)}
      tabIndex={-1}
      aria-label="Get to know me"
    >
      <div className={s.progress} aria-hidden="true" />
      <div className={s.grain} aria-hidden="true" />

      <header className={s.topbar}>
        <Link href="/">Boris as Code</Link>
        <p className={s.where} aria-live="polite">
          <span>{String(active).padStart(2, '0')}</span>
          <b>{current?.label}</b>
        </p>
      </header>

      <nav className={s.rail} aria-label="Chapters">
        {chapters.map((c, i) => (
          <button key={c.id} type="button" aria-current={i === active} onClick={() => go(c.id)}>
            <span>{c.label}</span>
            {String(i).padStart(2, '0')}
          </button>
        ))}
      </nav>

      <p className={s.keys} data-hidden={active > 0 || undefined} aria-hidden="true">
        <kbd>←</kbd>
        <kbd>→</kbd> chapters
      </p>

      <div className={s.content}>{children}</div>
    </div>
  )
}
