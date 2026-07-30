/**
 * Removes participants whose `number` has already appeared earlier in the
 * list. The first occurrence of a number is kept; later ones are dropped.
 */
export function dedupeByNumber(participants) {
  const seen = new Set()
  const unique = []
  for (const p of participants) {
    if (seen.has(p.number)) continue
    seen.add(p.number)
    unique.push(p)
  }
  return unique
}

/**
 * Cryptographically strong random integer in [0, max).
 * Falls back to Math.random if the Web Crypto API is unavailable.
 */
function randomIndex(max) {
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const buffer = new Uint32Array(1)
    // Rejection sampling avoids modulo bias.
    const limit = Math.floor(0xffffffff / max) * max
    let value
    do {
      window.crypto.getRandomValues(buffer)
      value = buffer[0]
    } while (value >= limit)
    return value % max
  }
  return Math.floor(Math.random() * max)
}

/**
 * Picks one truly random winner from the pool of participants who have not
 * won yet. Returns null if the pool is exhausted.
 */
export function pickRandomWinner(eligibleParticipants, wonIds) {
  const remaining = eligibleParticipants.filter((p) => !wonIds.has(p.id))
  if (remaining.length === 0) return null
  const index = randomIndex(remaining.length)
  return remaining[index]
}

/**
 * Builds a display sequence of numbers for the cycling wheel animation,
 * always ending on the winner's number so the animation lands correctly.
 */
export function buildCycleSequence(eligibleParticipants, winner, length = 40) {
  const pool = eligibleParticipants.length ? eligibleParticipants : [winner]
  const sequence = []
  for (let i = 0; i < length - 1; i++) {
    const idx = randomIndex(pool.length)
    sequence.push(pool[idx].number)
  }
  sequence.push(winner.number)
  return sequence
}
