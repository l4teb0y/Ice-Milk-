import { motion } from 'framer-motion'

function IceMilkMark() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path
        d="M22 4C29 4 33 11 30 18C34 20 35 26 31 30C33 34 30 40 24 40C22 40 20.5 39 20 37.5C18.5 39.5 15.5 40 13 38C10 40 5 38 5 33C5 30 7 28 9 27C6 24 6 19 10 16.5C9 11 14 5 20 6.5C20.5 5 21 4 22 4Z"
        fill="#F48CB7"
        stroke="#4A2412"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 22C16 24 20 24 22 21C24 24 28 24 30 22"
        stroke="#4A2412"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-4 pb-2 pt-10 text-center sm:pt-14"
    >
      <div className="flex items-center gap-2.5">
        <IceMilkMark />
        <span className="font-display text-xl font-medium tracking-tight text-choco sm:text-2xl">
          Ice Milk
        </span>
      </div>

      <h1 className="font-display text-4xl font-medium italic tracking-tight text-choco sm:text-5xl">
        Lucky Draw
      </h1>

      <p className="max-w-xs text-sm text-choco-soft sm:text-base">
        Choosing today&rsquo;s winners fairly and randomly.
      </p>
    </motion.header>
  )
}
