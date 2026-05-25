import ProgressDashboard from '../ui/ProgressDashboard.jsx'

export default function SummaryScreen({ navigate, result, getReadiness }) {
  const { correct, total, mcAnswered, textAnswered } = result

  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  const mcCorrect = mcAnswered.filter(a => a.wasCorrect).length
  const textCorrect = textAnswered.filter(a => a.wasCorrect).length

  let emoji = '😐'
  if (pct >= 90) emoji = '🏆'
  else if (pct >= 70) emoji = '✅'
  else if (pct >= 50) emoji = '📚'

  return (
    <div className="h-full flex flex-col px-4 py-4">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-4 pb-2">
          <div className="text-center pt-2">
            <div className="text-5xl mb-2">{emoji}</div>
            <h1 className="text-2xl font-bold text-abu-text">
              {correct} / {total}
            </h1>
            <p className={`text-3xl font-bold mt-1 ${
              pct >= 70 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {pct}%
            </p>
            <p className="text-abu-muted text-sm mt-1">Session abgeschlossen</p>
          </div>

          {(mcAnswered.length > 0 || textAnswered.length > 0) && (
            <div className="bg-abu-card rounded-2xl p-4 border border-abu-border">
              <h2 className="text-xs font-semibold text-abu-muted uppercase tracking-wider mb-3">Aufschlüsselung</h2>
              <div className="space-y-2">
                {mcAnswered.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-abu-muted">Multiple Choice</span>
                    <span className="text-abu-text font-semibold">
                      {mcCorrect} / {mcAnswered.length}
                    </span>
                  </div>
                )}
                {textAnswered.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-abu-muted">Karteikarten</span>
                    <span className="text-abu-text font-semibold">
                      {textCorrect} / {textAnswered.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-abu-card rounded-2xl p-4 border border-abu-border">
            <h2 className="text-xs font-semibold text-abu-muted uppercase tracking-wider mb-3">Prüfungsbereitschaft</h2>
            <ProgressDashboard getReadiness={getReadiness} />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 flex flex-col gap-3 pt-3 border-t border-abu-border mt-2">
        <button
          className="w-full py-4 bg-abu-primary rounded-2xl text-white font-bold text-base active:scale-[0.97] transition-transform shadow-lg shadow-blue-500/20"
          onClick={() => navigate('quiz', { filter: result.filter })}
        >
          Nochmals
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="py-3 bg-abu-card border border-abu-border rounded-xl text-abu-text font-semibold text-sm active:scale-[0.97] transition-transform"
            onClick={() => navigate('filter')}
          >
            Andere Auswahl
          </button>
          <button
            className="py-3 bg-abu-card border border-abu-border rounded-xl text-abu-text font-semibold text-sm active:scale-[0.97] transition-transform"
            onClick={() => navigate('home')}
          >
            Zur Übersicht
          </button>
        </div>
      </div>
    </div>
  )
}
