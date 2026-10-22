'use client'

import { useEffect, useRef } from 'react'

interface Props {
  name: string
  label: string
}

// A silent clip that only plays while it is on screen.
export default function Loop({ name, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.muted = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={`/static/videos/about-me/${name}.mp4`}
      poster={`/static/videos/about-me/${name}-poster.webp`}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
    />
  )
}
