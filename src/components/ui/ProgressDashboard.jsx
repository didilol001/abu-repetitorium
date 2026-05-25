import ProgressBar from './ProgressBar.jsx'

export default function ProgressDashboard({ getReadiness }) {
  const overall = getReadiness([1, 2, 3, 4])
  const y1 = getReadiness([1])
  const y2 = getReadiness([2])
  const y3 = getReadiness([3])
  const y4 = getReadiness([4])

  return (
    <div className="space-y-2">
      <ProgressBar label="Gesamt" value={overall} />
      <div className="border-t border-abu-border pt-2 space-y-2">
        <ProgressBar label="1. Lehrjahr" value={y1} />
        <ProgressBar label="2. Lehrjahr" value={y2} />
        <ProgressBar label="3. Lehrjahr" value={y3} />
        <ProgressBar label="4. Lehrjahr" value={y4} />
      </div>
    </div>
  )
}
