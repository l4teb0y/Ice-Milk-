import { motion } from 'framer-motion'

const CUP_PATH = 'M8 6 L56 6 L49 70 Q32 80 15 70 Z'

/**
 * Signature element: progress toward 10 winners rendered as a glass of
 * strawberry milk filling up, rather than a generic progress bar.
 */
export default function MilkProgress({ count, total = 10 }) {
  const ratio = Math.min(count / total, 1)
  // Cup interior spans roughly y=8 (empty) to y=70 (full).
  const liquidTop = 70 - ratio * 62

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-[90px] w-[68px]">
        <svg viewBox="0 0 64 84" width="68" height="90" className="overflow-visible">
          <defs>
            <clipPath id="cup-clip">
              <path d={CUP_PATH} />
            </clipPath>
          </defs>

          {/* glass outline */}
          <path d={CUP_PATH} fill="#FFFDF8" stroke="#4A2412" strokeWidth="2" strokeLinejoin="round" />

          {/* liquid fill, clipped to cup shape */}
          <g clipPath="url(#cup-clip)">
            <motion.rect
              x="0"
              width="64"
              height="90"
              fill="#F48CB7"
              initial={false}
              animate={{ y: liquidTop }}
              transition={{ type: 'spring', stiffness: 90, damping: 16 }}
            />
            {/* wave line riding the surface of the liquid */}
            <motion.path
              d="M0 0 Q8 -2.5 16 0 T32 0 T48 0 T64 0 V6 H0 Z"
              fill="#FFB6CF"
              initial={false}
              animate={{ y: liquidTop }}
              transition={{ type: 'spring', stiffness: 90, damping: 16 }}
            />
          </g>

          {/* rim highlight */}
          <path d="M8 6 L56 6" stroke="#4A2412" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* little rising bubbles for life, subtle */}
        {ratio > 0 && ratio < 1 && (
          <>
            <motion.span
              className="absolute left-[26px] top-[40px] h-1 w-1 rounded-full bg-cream/70"
              animate={{ y: [-2, -18], opacity: [0, 0.8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute left-[36px] top-[48px] h-[3px] w-[3px] rounded-full bg-cream/70"
              animate={{ y: [-2, -22], opacity: [0, 0.7, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            />
          </>
        )}
      </div>

      <div className="text-center">
        <p className="font-numeric text-3xl font-semibold text-choco">
          {count}
          <span className="text-choco-soft"> / {total}</span>
        </p>
        <p className="text-sm tracking-wide text-choco-soft">Winners</p>
      </div>
    </div>
  )
}
