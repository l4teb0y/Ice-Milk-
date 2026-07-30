import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { buildCycleSequence } from '../utils/draw'

const TOTAL_DURATION = 3000

/** Delay (ms) until the next tick, given elapsed ms since the draw started.
 *  Very fast for second 1, slower for second 2, easing into a dramatic
 *  slow stop through second 3. */
function delayForElapsed(elapsed) {
  if (elapsed < 1000) return 45
  if (elapsed < 2000) return 115
  const t = (elapsed - 2000) / 1000
  return 130 + t * t * 430
}

export default function DrawAnimation({ eligible, winner, winnerIndex, onComplete }) {
  const [display, setDisplay] = useState(winner.number)
  const [settled, setSettled] = useState(false)
  const timeoutRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const sequence = buildCycleSequence(eligible, winner, 160)
    let elapsed = 0
    let idx = 0
    setDisplay(sequence[0])

    const tick = () => {
      const d = delayForElapsed(elapsed)
      const next = elapsed + d
      if (next >= TOTAL_DURATION || idx >= sequence.length - 1) {
        setDisplay(winner.number)
        setSettled(true)
        timeoutRef.current = setTimeout(() => onCompleteRef.current(), 220)
        return
      }
      idx += 1
      elapsed = next
      setDisplay(sequence[idx])
      timeoutRef.current = setTimeout(tick, d)
    }

    timeoutRef.current = setTimeout(tick, 45)
    return () => clearTimeout(timeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner.id])

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-choco-soft">
        Drawing Winner #{winnerIndex}
      </p>

      <div className="relative flex h-52 w-52 items-center justify-center sm:h-60 sm:w-60">
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0"
          animate={{ rotate: settled ? 0 : 360 }}
          transition={settled ? { duration: 0.4 } : { duration: 3.4, ease: 'linear', repeat: Infinity }}
        >
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="#F48CB7"
            strokeWidth="3"
            strokeDasharray="4 14"
            strokeLinecap="round"
          />
        </motion.svg>

        <motion.div
          animate={settled ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-40 w-40 items-center justify-center rounded-full bg-cream shadow-card sm:h-44 sm:w-44"
        >
          <span className="font-numeric text-6xl font-bold text-choco sm:text-7xl">
            {display}
          </span>
        </motion.div>
      </div>
    </div>
  )
}
