import { getFlavorLabel } from '../components/WinnersTable'

export function downloadWinnersCsv(winners, filename = 'ice-milk-lucky-draw-winners.csv') {
  const header = ['الفائز', 'الرقم', 'الاسم', 'الصوص المختار']
  const ordinals = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر']
  const rows = winners.map((w, i) => [`الفائز ${ordinals[i] ?? i + 1}`, w.number, w.name, getFlavorLabel(w.flavor)])

  const escapeCell = (value) => {
    const str = String(value)
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  const csv = [header, ...rows].map((row) => row.map(escapeCell).join(',')).join('\r\n')

  // BOM so Excel opens UTF-8 (Arabic names, etc.) correctly.
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
