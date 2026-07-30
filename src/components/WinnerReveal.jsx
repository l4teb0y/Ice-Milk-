import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { getFlavorLabel } from './WinnersTable'

const BRAND_COLORS = ['#F48CB7', '#FFB6CF', '#4A2412', '#FFFDF8']

function fireConfetti() {
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 42,
    origin: { y: 0.6 },
    colors: BRAND_COLORS,
    scalar: 0.9,
    ticks: 220,
  })
  confetti({
    particleCount: 50,
    spread: 100,
    startVelocity: 30,
    origin: { y: 0.55 },
    colors: BRAND_COLORS,
    scalar: 0.7,
    ticks: 200,
  })
}

export default function WinnerReveal({ winner, winnerIndex }) {
  useEffect(() => {
    fireConfetti()
  }, [winner.id])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="flex flex-col items-center gap-3 py-2 text-center"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.05 }}
        className="text-4xl"
        aria-hidden="true"
      >
        🎉
      </motion.span>

      <h2 className="font-display text-2xl font-medium text-choco sm:text-3xl">
        مبروك!
      </h2>

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-deep">
        الفائز {winnerIndex}
      </p>

      <div className="relative my-2 flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36">
        <svg viewBox="0 0 140 140" className="absolute inset-0">
          <path
            d="M70 8 C100 4 132 24 130 58 C128 90 108 118 72 130 C36 120 10 92 10 58 C10 24 40 12 70 8 Z"
            fill="#FFB6CF"
            opacity="0.5"
          />
        </svg>
        <span className="relative font-numeric text-5xl font-bold text-choco sm:text-6xl">
          {winner.number}
        </span>
      </div>

      <p className="font-display text-xl font-medium text-choco sm:text-2xl">{winner.name}</p>

      <div className="mt-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-choco-soft">
          الصوص المختار
        </p>
        <p className="text-base font-medium text-pink-deep">{getFlavorLabel(winner.flavor)}</p>
      </div>
    </motion.div>
  )
}
