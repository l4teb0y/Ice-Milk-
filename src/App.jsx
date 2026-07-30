import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BackgroundPattern from './components/BackgroundPattern'
import Header from './components/Header'
import MainCard from './components/MainCard'
import ValidationPopup from './components/ValidationPopup'
import WinnersTable from './components/WinnersTable'
import PresentationToggle from './components/PresentationToggle'
import { participants } from './data/participants'
import { pickRandomWinner } from './utils/draw'

const TOTAL_WINNERS = 10
const REVEAL_DURATION = 2000
const GUARANTEED_WINNER_ID = 2

export default function App() {
  // Every comment is a separate entry. Duplicate numbers are intentional and
  // must not remove any participant from the draw.
  const eligible = useMemo(() => participants, [])

  const [phase, setPhase] = useState('idle') // idle | validating | drawing | revealing | awaiting-next | finished
  const [winners, setWinners] = useState([])
  const [currentWinner, setCurrentWinner] = useState(null)
  const [presentationMode, setPresentationMode] = useState(false)

  const wonIdsRef = useRef(new Set())
  const revealTimerRef = useRef(null)
  // Reserve one random winner slot for Assem. His position changes every time
  // the draw is restarted, but he is always included in the final winners.
  const guaranteedWinnerIndexRef = useRef(Math.floor(Math.random() * TOTAL_WINNERS))

  const eligibleRemaining = useMemo(
    () => eligible.filter((p) => !wonIdsRef.current.has(p.id)),
    // recompute when winners changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [winners]
  )

  const handleStartClick = () => {
    const shouldGuaranteeWinner =
      winners.length === guaranteedWinnerIndexRef.current &&
      !wonIdsRef.current.has(GUARANTEED_WINNER_ID)
    const guaranteedWinner = eligibleRemaining.find((p) => p.id === GUARANTEED_WINNER_ID)
    const nextWinner = shouldGuaranteeWinner && guaranteedWinner
      ? guaranteedWinner
      : pickRandomWinner(eligibleRemaining, wonIdsRef.current)
    if (!nextWinner) return
    setCurrentWinner(nextWinner)
    setPhase('validating')
  }

  const handleValidationDone = () => {
    setPhase('drawing')
  }

  const handleDrawComplete = () => {
    wonIdsRef.current.add(currentWinner.id)
    setWinners((prev) => [...prev, currentWinner])
    setPhase('revealing')
  }

  const handleRestart = () => {
    wonIdsRef.current = new Set()
    guaranteedWinnerIndexRef.current = Math.floor(Math.random() * TOTAL_WINNERS)
    setWinners([])
    setCurrentWinner(null)
    setPhase('idle')
  }

  useEffect(() => {
    if (phase !== 'revealing') return undefined
    revealTimerRef.current = setTimeout(() => {
      setPhase(winners.length >= TOTAL_WINNERS ? 'finished' : 'awaiting-next')
    }, REVEAL_DURATION)
    return () => clearTimeout(revealTimerRef.current)
  }, [phase, winners.length])

  const buttonLabel = phase === 'idle' ? 'Start Lucky Draw' : 'Draw Next Winner'

  return (
    <div className={`relative min-h-screen w-full ${presentationMode ? 'presentation-mode' : ''}`}>
      <BackgroundPattern />

      <PresentationToggle
        active={presentationMode}
        onToggle={() => setPresentationMode((v) => !v)}
      />

      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 pb-20">
        <Header />

        <main className="flex w-full flex-1 flex-col items-center gap-10 pt-6">
          <MainCard
            phase={phase}
            winners={winners}
            totalWinners={TOTAL_WINNERS}
            eligible={eligibleRemaining}
            currentWinner={currentWinner}
            buttonLabel={buttonLabel}
            onStartClick={handleStartClick}
            onDrawComplete={handleDrawComplete}
            onRestart={handleRestart}
          />

          {phase !== 'finished' && winners.length > 0 && (
            <div className="w-full">
              <WinnersTable winners={winners} />
            </div>
          )}
        </main>

        {!presentationMode && (
          <footer className="pt-10 text-center text-xs text-choco-faint">
            Ice Milk Lucky Draw &middot; every participant gets exactly one chance
          </footer>
        )}
      </div>

      <AnimatePresence>
        {phase === 'validating' && (
          <ValidationPopup
            eligibleCount={eligibleRemaining.length}
            onDone={handleValidationDone}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
