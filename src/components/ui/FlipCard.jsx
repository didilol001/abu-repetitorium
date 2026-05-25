import { useState } from 'react'

export default function FlipCard({ question, answer, onResult }) {
  const [isFlipped, setIsFlipped] = useState(false)

  function handleFlip() {
    if (!isFlipped) setIsFlipped(true)
  }

  function handleResult(wasCorrect) {
    onResult(wasCorrect)
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        className="perspective w-full cursor-pointer"
        style={{ height: '260px' }}
        onClick={handleFlip}
      >
        <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="flip-card-front bg-abu-card border-2 border-abu-border">
            <p className="text-xs font-semibold text-abu-muted uppercase tracking-wider mb-3">
              Frage
            </p>
            <p className="text-abu-text text-base leading-relaxed">{question}</p>
            {!isFlipped && (
              <p className="mt-4 text-abu-muted text-xs">Tippen zum Aufdecken</p>
            )}
          </div>
          <div className="flip-card-back bg-slate-700 border-2 border-slate-500">
            <p className="text-xs font-semibold text-abu-muted uppercase tracking-wider mb-3">
              Antwort
            </p>
            <p className="text-abu-text text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="flex gap-3">
          <button
            className="flex-1 py-3 rounded-xl bg-red-500/20 border-2 border-red-500 text-red-300 font-semibold text-sm active:scale-[0.97] transition-transform"
            onClick={() => handleResult(false)}
          >
            ✗ Falsch
          </button>
          <button
            className="flex-1 py-3 rounded-xl bg-green-500/20 border-2 border-green-500 text-green-300 font-semibold text-sm active:scale-[0.97] transition-transform"
            onClick={() => handleResult(true)}
          >
            ✓ Richtig
          </button>
        </div>
      )}
    </div>
  )
}
