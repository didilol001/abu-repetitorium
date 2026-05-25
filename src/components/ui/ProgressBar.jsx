export default function ProgressBar({ label, value, showPercent = true }) {
  const clampedValue = Math.min(100, Math.max(0, value))

  let colorClass = 'bg-red-500'
  if (clampedValue >= 90) colorClass = 'bg-green-500'
  else if (clampedValue >= 70) colorClass = 'bg-green-400'
  else if (clampedValue >= 40) colorClass = 'bg-yellow-400'

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-abu-muted">{label}</span>
        {showPercent && (
          <span className="text-xs font-semibold text-abu-text">{clampedValue}%</span>
        )}
      </div>
      <div className="w-full h-2 bg-abu-border rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
