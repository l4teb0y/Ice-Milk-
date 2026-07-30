import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import MilkProgress from './MilkProgress'
import DrawAnimation from './DrawAnimation'
import WinnerReveal from './WinnerReveal'
import FinalScreen from './FinalScreen'

export default function MainCard({
  phase,
  winners,
  totalWinners,
  eligible,
  currentWinner,
  buttonLabel,
  onStartClick,
  onDrawComplete,
  onRestart,
}) {
  const isDrawing = phase === 'drawing'
  const isRevealing = phase === 'revealing'
  const isFinished = phase === 'finished'
  const showButton = phase === 'idle' || phase === 'awaiting-next'

  return (
    <>
      {/* Dim + focus overlay while the wheel is spinning or a winner is shown */}
      <AnimatePresence>
        {(isDrawing || isRevealing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-20 bg-choco/25"
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        animate={{ scale: isDrawing || isRevealing ? 1.03 : 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 mx-auto w-full max-w-md rounded-card bg-cream px-7 py-9 shadow-card sm:px-10 sm:py-11"
      >
        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.div key="finished" exit={{ opacity: 0 }}>
              <FinalScreen winners={winners} onRestart={onRestart} />
            </motion.div>
          ) : isDrawing ? (
            <motion.div
              key="drawing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <DrawAnimation
                eligible={eligible}
                winner={currentWinner}
                winnerIndex={winners.length + 1}
                onComplete={onDrawComplete}
              />
            </motion.div>
          ) : isRevealing ? (
            <motion.div
              key="revealing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <WinnerReveal winner={currentWinner} winnerIndex={winners.length} />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-choco-soft">
                Current Progress
              </p>

              <MilkProgress count={winners.length} total={totalWinners} />

              {showButton && (
                <button
                  onClick={onStartClick}
                  className="group flex items-center gap-2 rounded-full bg-pink px-8 py-4 font-medium text-cream shadow-button transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Sparkles size={18} className="transition-transform group-hover:rotate-12" />
                  {buttonLabel}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
