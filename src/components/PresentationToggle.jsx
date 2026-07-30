import { Maximize2, Minimize2 } from 'lucide-react'

export default function PresentationToggle({ active, onToggle }) {
  const handleClick = async () => {
    try {
      if (!active && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen()
      } else if (active && document.exitFullscreen && document.fullscreenElement) {
        await document.exitFullscreen()
      }
    } catch {
      // Fullscreen can be denied by the browser/OS — presentation styling still applies.
    }
    onToggle()
  }

  return (
    <button
      onClick={handleClick}
      className={`fixed right-4 top-4 z-30 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium shadow-soft backdrop-blur transition-all sm:right-6 sm:top-6 ${
        active
          ? 'bg-choco/10 text-choco/50 hover:bg-choco/20 hover:text-choco'
          : 'bg-cream text-choco-soft hover:text-choco'
      }`}
      title={active ? 'Exit presentation mode' : 'Presentation mode'}
    >
      {active ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
      <span className="hidden sm:inline">{active ? 'Exit presentation' : 'Presentation mode'}</span>
    </button>
  )
}
