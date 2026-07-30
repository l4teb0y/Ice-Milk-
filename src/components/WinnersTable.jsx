import { AnimatePresence, motion } from 'framer-motion'

const FLAVOR_LABELS = {
  Pistachio: 'فستق',
  'Salted Caramel': 'كراميل مملح',
  Strawberry: 'فراولة',
  'Belgian Chocolate': 'شيكولاتة بلجيكي',
  'Vanilla Bean': 'فانيليا',
  Mango: 'مانجو',
  Coconut: 'جوز هند',
  Hazelnut: 'بندق',
  'Rose Kunafa': 'كونافة روز',
  'Oreo Crunch': 'أوريو',
  'Lotus Biscoff': 'لوتس',
  Blueberry: 'توت أزرق',
  'Pecan Praline': 'بيكان',
  'Mint Choco Chip': 'مينت شيكولاتة',
  'Turkish Delight': 'ملبن',
  Saffron: 'زعفران',
  'Fig & Honey': 'تين وعسل',
  'Dark Cherry': 'كرز دارك',
  'Cookies & Cream': 'كوكيز أند كريم',
  Tiramisu: 'تيراميسو',
}

export function getFlavorLabel(flavor) {
  return FLAVOR_LABELS[flavor] ?? flavor ?? 'غير محدد'
}

const ORDINALS = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر']

function getWinnerLabel(index) {
  return `الفائز ${ORDINALS[index] ?? index + 1}`
}

export default function WinnersTable({ winners }) {
  if (winners.length === 0) return null

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto rounded-[22px] bg-cream shadow-soft">
      <div className="min-w-[480px]">
        <div dir="rtl" className="grid grid-cols-[1.3fr_0.7fr_1.6fr_1.3fr] gap-2 border-b border-choco/10 px-5 py-3 text-[11px] font-semibold text-choco-soft sm:px-6">
          <span>الفائز</span>
          <span>الرقم</span>
          <span>الاسم</span>
          <span>الصوص المختار</span>
        </div>

        <ul>
          <AnimatePresence initial={false}>
            {winners.map((w, i) => (
              <motion.li
                key={w.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                dir="rtl"
                className={`grid grid-cols-[1.3fr_0.7fr_1.6fr_1.3fr] gap-2 px-5 py-3 text-sm text-choco sm:px-6 ${
                  i % 2 === 1 ? 'bg-pink/5' : ''
                }`}
              >
                <span className="font-semibold text-pink-deep">{getWinnerLabel(i)}</span>
                <span className="font-numeric">{w.number}</span>
                <span className="truncate font-medium">{w.name}</span>
                <span className="truncate text-choco-soft">{getFlavorLabel(w.flavor)}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}
