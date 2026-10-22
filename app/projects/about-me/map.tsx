import { CSSProperties } from 'react'
import { land, places, routes, viewBox } from './map-data'
import s from './about.module.css'

type Place = keyof typeof places

// Which side of its dot each label sits on, chosen to stay clear of the routes.
const side: Record<Place, string> = {
  vostok: s.aboveRight,
  vladivostok: s.belowLeft,
  moscow: s.belowRight,
  auckland: s.left,
}

const km = Object.fromEntries(routes.map((r) => [r.to, r.km])) as Partial<Record<Place, number>>

// How far Vostok-2 is from everything: a dot map with straight lines over the globe.
export default function VostokMap() {
  return (
    <figure className={`${s.map} ${s.reveal}`}>
      <div className={s.mapCanvas}>
        <svg viewBox={viewBox} aria-hidden="true">
          <path className={s.mapLand} d={land} />
          {routes.map((r, i) => (
            <path
              key={r.to}
              className={s.mapRoute}
              d={r.d}
              pathLength={1}
              style={{ '--i': i } as CSSProperties}
            />
          ))}
        </svg>

        {(Object.keys(places) as Place[]).map((key, i) => {
          const p = places[key]
          const distance = km[key]
          return (
            <div
              key={key}
              className={s.mapPoint}
              data-home={key === 'vostok' || undefined}
              style={{ left: `${p.x}%`, top: `${p.y}%`, '--i': i } as CSSProperties}
            >
              <p className={`${s.mapLabel} ${side[key]}`}>
                <span>{p.name}</span>
                {distance ? <b>{distance.toLocaleString('en-NZ')} km</b> : <b>Born here</b>}
              </p>
            </div>
          )
        })}
      </div>
      <figcaption className={s.caption}>Straight-line distances from Vostok-2.</figcaption>
    </figure>
  )
}
