import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Download, RotateCcw } from 'lucide-react'
import WinnersTable from './WinnersTable'
import { downloadWinnersCsv } from '../utils/csv'

const BRAND_COLORS = ['#F48CB7', '#FFB6CF', '#4A2412', '#FFFDF8']

function fireCelebration() {
  const end = Date.now() + 1400
  ;(function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 65, origin: { x: 0 }, colors: BRAND_COLORS })
    confetti({ particleCount: 6, angle: 120, spread: 65, origin: { x: 1 }, colors: BRAND_COLORS })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
  confetti({ particleCount: 140, spread: 100, startVelocity: 45, origin: { y: 0.5 }, colors: BRAND_COLORS })
}

export default function FinalScreen({ winners, onRestart }) {
  useEffect(() => {
    fireCelebration()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-6 py-2 text-center"
    >
      <span className="text-4xl" aria-hidden="true">🎊</span>
      <div>
        <h2 className="font-display text-3xl font-medium text-choco sm:text-4xl">Congratulations</h2>
        <p className="mt-1 text-choco-soft">Lucky Draw Finished</p>
      </div>

      <div className="w-full">
        <WinnersTable winners={winners} />
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <button
          onClick={() => downloadWinnersCsv(winners)}
          className="flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 font-medium text-cream shadow-button transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <Download size={18} />
          Download Winners
        </button>

        <button
          onClick={onRestart}
          className="flex items-center gap-1.5 rounded-full px-5 py-3 text-sm font-medium text-choco-soft transition-colors hover:text-choco"
        >
          <RotateCcw size={15} />
          Start a new draw
        </button>
      </div>
    </motion.div>
  )
}
