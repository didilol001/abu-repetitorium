const yearColors = {
  1: 'bg-blue-500',
  2: 'bg-purple-500',
  3: 'bg-orange-500',
  4: 'bg-emerald-500',
}

export default function YearBadge({ year }) {
  if (!year) return null
  const color = yearColors[year] || 'bg-gray-500'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold text-white ${color}`}>
      LJ {year}
    </span>
  )
}
