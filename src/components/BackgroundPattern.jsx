// A very subtle, hand-drawn repeating pattern of dessert doodles.
// Rendered as line art at low opacity so it reads as texture, never as content.
export default function BackgroundPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05] text-choco" aria-hidden="true">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="dessert-tile" width="260" height="260" patternUnits="userSpaceOnUse" patternTransform="rotate(6)">
            {/* waffle */}
            <g transform="translate(18,20)" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
              <rect x="0" y="0" width="26" height="26" rx="5" />
              <line x1="8.6" y1="2" x2="8.6" y2="24" />
              <line x1="17.3" y1="2" x2="17.3" y2="24" />
              <line x1="2" y1="8.6" x2="24" y2="8.6" />
              <line x1="2" y1="17.3" x2="24" y2="17.3" />
            </g>

            {/* strawberry */}
            <g transform="translate(150,10)" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 6 C20 6 24 14 20 22 C17 28 7 28 4 22 C0 14 4 6 12 6 Z" />
              <path d="M12 6 L9 0 M12 6 L12 -1 M12 6 L15 0" />
              <circle cx="8" cy="14" r="0.6" fill="currentColor" />
              <circle cx="14" cy="12" r="0.6" fill="currentColor" />
              <circle cx="11" cy="19" r="0.6" fill="currentColor" />
              <circle cx="16" cy="19" r="0.6" fill="currentColor" />
            </g>

            {/* chocolate square */}
            <g transform="translate(60,70)" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
              <rect x="0" y="0" width="22" height="22" rx="3" />
              <line x1="0" y1="11" x2="22" y2="11" />
              <line x1="11" y1="0" x2="11" y2="22" />
            </g>

            {/* pancake stack */}
            <g transform="translate(190,90)" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
              <ellipse cx="12" cy="22" rx="13" ry="4" />
              <ellipse cx="12" cy="15" rx="12" ry="3.6" />
              <ellipse cx="12" cy="8.5" rx="11" ry="3.4" />
              <path d="M3 6 Q12 12 21 5" strokeWidth="1.1" />
            </g>

            {/* ice cream cone */}
            <g transform="translate(30,140)" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12 L20 12 L12 30 Z" />
              <line x1="7.5" y1="16" x2="13" y2="24" strokeWidth="1" />
              <line x1="16.5" y1="16" x2="11" y2="24" strokeWidth="1" />
              <path d="M4 12 C4 5 20 5 20 12 C20 16 4 16 4 12 Z" />
              <path d="M9 5 C9 2 15 2 15 5" strokeWidth="1" />
            </g>

            {/* milkshake */}
            <g transform="translate(120,150)" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6 L20 6 L17 28 L7 28 Z" />
              <path d="M6.5 6 C10 10 14 10 17.5 6" strokeWidth="1" />
              <line x1="14" y1="0" x2="10" y2="10" />
            </g>

            {/* donut */}
            <g transform="translate(210,190)" stroke="currentColor" strokeWidth="1.4" fill="none">
              <circle cx="12" cy="12" r="11" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="8" cy="4" r="0.6" fill="currentColor" stroke="none" />
              <circle cx="19" cy="9" r="0.6" fill="currentColor" stroke="none" />
              <circle cx="17" cy="20" r="0.6" fill="currentColor" stroke="none" />
              <circle cx="5" cy="17" r="0.6" fill="currentColor" stroke="none" />
            </g>

            {/* oreo */}
            <g transform="translate(75,210)" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
              <rect x="0" y="0" width="26" height="9" rx="4.5" />
              <rect x="0" y="14" width="26" height="9" rx="4.5" />
              <line x1="3" y1="11.5" x2="23" y2="11.5" strokeWidth="1" />
              <circle cx="6" cy="4.5" r="0.5" fill="currentColor" stroke="none" />
              <circle cx="13" cy="4.5" r="0.5" fill="currentColor" stroke="none" />
              <circle cx="20" cy="4.5" r="0.5" fill="currentColor" stroke="none" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dessert-tile)" />
      </svg>
    </div>
  )
}
