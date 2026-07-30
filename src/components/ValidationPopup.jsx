import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'

const STAGE_TIMING = [150, 420, 680] // ms at which each check line appears
const TOTAL_DURATION = 2800

function CheckLine({ children, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.li
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 text-choco"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink/15 text-pink-deep">
            <Check size={13} strokeWidth={3} />
          </span>
          <span className="text-[15px]">{children}</span>
        </motion.li>
      )}
    </AnimatePresence>
  )
}

export default function ValidationPopup({ eligibleCount, onDone }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timers = STAGE_TIMING.map((delay, i) =>
      setTimeout(() => setStage(i + 1), delay)
    )
    const closeTimer = setTimeout(onDone, TOTAL_DURATION)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(closeTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-choco/20 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="mx-6 w-[300px] rounded-[22px] bg-cream px-7 py-7 shadow-card sm:w-[340px]"
      >
        <p className="mb-4 text-center text-sm font-medium tracking-wide text-choco-soft">
          {stage === 0 ? 'جارٍ تجهيز المشاركين…' : 'جاهز للسحب'}
        </p>
        <ul className="flex flex-col gap-3">
          <CheckLine visible={stage >= 1}>تم تحميل المشاركين</CheckLine>
          <CheckLine visible={stage >= 2}>فلترة الأرقام المكررة</CheckLine>
          <CheckLine visible={stage >= 3}>عدد المشاركين : {eligibleCount}</CheckLine>
        </ul>
      </motion.div>
    </motion.div>
  )
}
