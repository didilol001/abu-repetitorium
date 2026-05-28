import { useState } from 'react'
import { getQuestions } from '../../data/index.js'

const YEAR_COLORS = {
  1: 'bg-blue-500 border-blue-500',
  2: 'bg-purple-500 border-purple-500',
  3: 'bg-orange-500 border-orange-500',
  4: 'bg-emerald-500 border-emerald-500',
}

function countWeak(questions, progress) {
  return questions.filter(q => {
    const rec = progress[q.id]
    if (!rec || rec.attempts === 0 || rec.history.length === 0) return false
    return rec.history.filter(Boolean).length / rec.history.length < 0.6
  }).length
}

export default function FilterScreen({ navigate, initialFilter, progress = {} }) {
  const [years, setYears] = useState(initialFilter.years)
  const [type, setType] = useState(initialFilter.type)
  const [weakOnly, setWeakOnly] = useState(initialFilter.weakOnly ?? false)

  function toggleYear(y) {
    if (y === 'all') {
      setYears([1, 2, 3, 4])
      return
    }
    setYears(prev => {
      if (prev.includes(y)) {
        if (prev.length === 1) return prev
        return prev.filter(x => x !== y)
      }
      return [...prev, y].sort()
    })
  }

  const allFiltered = getQuestions(years, type)
  const questionCount = weakOnly ? countWeak(allFiltered, progress) : allFiltered.length
  const weakCount = countWeak(allFiltered, progress)

  function handleStart() {
    navigate('quiz', { filter: { years, type, weakOnly } })
  }

  function handleKanister() {
    navigate('kanister', { filter: { years, type } })
  }

  return (
    <div className="h-full flex flex-col px-4 py-4">
      <div className="flex items-center gap-3 mb-5 flex-shrink-0">
        <button
          className="text-abu-muted p-2 rounded-xl hover:bg-abu-card active:scale-95 transition-all"
          onClick={() => navigate('home')}
        >
          ←
        </button>
        <h1 className="text-lg font-bold text-abu-text">Lernmodus wählen</h1>
      </div>

      <div className="bg-abu-card rounded-2xl p-4 border border-abu-border mb-4 flex-shrink-0">
        <h2 className="text-xs font-semibold text-abu-muted uppercase tracking-wider mb-3">Lehrjahr</h2>
        <div className="grid grid-cols-5 gap-2">
          <button
            className={`py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${
              years.length === 4
                ? 'bg-abu-primary/20 border-abu-primary text-abu-primary'
                : 'border-abu-border bg-abu-border/20 text-abu-muted'
            }`}
            onClick={() => toggleYear('all')}
          >
            Alle
          </button>
          {[1, 2, 3, 4].map(y => (
            <button
              key={y}
              className={`py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${
                years.includes(y)
                  ? `${YEAR_COLORS[y]} text-white`
                  : 'border-abu-border bg-abu-border/20 text-abu-muted'
              }`}
              onClick={() => toggleYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-abu-card rounded-2xl p-4 border border-abu-border mb-4 flex-shrink-0">
        <h2 className="text-xs font-semibold text-abu-muted uppercase tracking-wider mb-3">Fragentyp</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'mc', label: 'Multiple Choice' },
            { value: 'both', label: 'Beides' },
            { value: 'text', label: 'Karteikarten' },
          ].map(opt => (
            <button
              key={opt.value}
              className={`py-3 px-2 rounded-xl border-2 text-xs font-semibold transition-all active:scale-95 ${
                type === opt.value
                  ? 'bg-abu-primary/20 border-abu-primary text-abu-primary'
                  : 'border-abu-border bg-abu-border/20 text-abu-muted'
              }`}
              onClick={() => setType(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-abu-card rounded-2xl p-4 border border-abu-border mb-4 flex-shrink-0">
        <h2 className="text-xs font-semibold text-abu-muted uppercase tracking-wider mb-3">Modus</h2>
        <button
          className={`w-full py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all active:scale-95 flex items-center justify-between ${
            weakOnly
              ? 'bg-red-500/20 border-red-500 text-red-300'
              : 'border-abu-border bg-abu-border/20 text-abu-muted'
          }`}
          onClick={() => setWeakOnly(w => !w)}
        >
          <span>Nur schwache Fragen</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${weakOnly ? 'bg-red-500/30 text-red-300' : 'bg-abu-border text-abu-muted'}`}>
            {weakCount}
          </span>
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex-shrink-0">
        <p className="text-center text-abu-muted text-sm mb-3">
          {questionCount} Fragen ausgewählt
        </p>
        <button
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            questionCount > 0
              ? 'bg-abu-primary text-white active:scale-[0.97] shadow-lg shadow-blue-500/20'
              : 'bg-abu-border text-abu-neutral cursor-not-allowed'
          }`}
          onClick={handleStart}
          disabled={questionCount === 0}
        >
          Starten ({questionCount})
        </button>
        {allFiltered.length > 15 && !weakOnly && (
          <button
            className="w-full mt-3 py-3 rounded-2xl border-2 border-abu-border text-abu-muted text-sm font-medium active:scale-[0.97] transition-transform hover:border-abu-neutral hover:text-abu-text"
            onClick={handleKanister}
          >
            Als Kanister (15er) lernen
          </button>
        )}
      </div>
    </div>
  )
}
