import { createPortal } from 'react-dom'
import type { CSSProperties } from 'react'

const petalSources = Object.values(
  import.meta.glob('./assets/marigold_petals/*.svg', { eager: true, import: 'default' }),
) as string[]

const fallingPetals = Array.from({ length: 18 }, (_, index) => ({
  src: petalSources[(index * 5) % petalSources.length],
  left: `${(index * 53) % 100}%`,
  size: 12 + ((index * 7) % 11),
  duration: 16 + ((index * 3) % 12),
  delay: -((index * 2.4) % 18),
  drift: `${(index % 2 === 0 ? -1 : 1) * (24 + ((index * 13) % 48))}px`,
  turn: `${(index % 2 === 0 ? -1 : 1) * (220 + ((index * 47) % 280))}deg`,
  opacity: 0.72 + ((index * 3) % 4) * 0.06,
}))

export function PetalRain() {
  return createPortal(
    <div className="petal-rain" aria-hidden="true">
      {fallingPetals.map((petal, index) => (
        <span
          className="petal"
          key={`${petal.src}-${index}`}
          style={{
            left: petal.left,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
            '--drift': petal.drift,
          } as CSSProperties}
        >
          <img
            src={petal.src}
            alt=""
            style={{
              width: petal.size,
              animationDuration: `${petal.duration * 0.72}s`,
              '--turn': petal.turn,
            } as CSSProperties}
          />
        </span>
      ))}
    </div>,
    document.body,
  )
}
