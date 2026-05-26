import { useState } from 'react'
import ExplanationModal from './ExplanationModal.jsx'

export default function FlipCard({ question, answer, questionData, onResult }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  function handleFlip() {
    if (!isFlipped) setIsFlipped(true)
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-3">
      <div
        className="perspective flex-1 min-h-0 cursor-pointer"
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
            <p className="text-abu-text text-sm leading-relaxed whitespace-pre-wrap">
              {questionData?.summary ?? answer}
            </p>
            {questionData?.summary && (
              <>
                <div className="border-t border-slate-500 my-3" />
                <p className="text-xs font-semibold text-abu-muted uppercase tracking-wider mb-2">
                  Offizielle Lösung
                </p>
                <p className="text-abu-muted text-xs leading-relaxed whitespace-pre-wrap">{answer}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={`flex gap-2 flex-shrink-0 transition-opacity duration-200 ${
        isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <button
          className="flex-1 py-4 rounded-2xl bg-red-500/20 border-2 border-red-500 text-red-300 font-semibold text-base active:scale-[0.97] transition-transform"
          onClick={() => onResult(false)}
        >
          ✗ Falsch
        </button>
        <button
          className="w-14 py-4 rounded-2xl bg-abu-card border-2 border-abu-border text-abu-muted font-bold text-xl active:scale-[0.97] transition-transform hover:border-abu-primary hover:text-abu-primary"
          onClick={() => setShowExplanation(true)}
          title="Erklärung anzeigen"
        >
          ?
        </button>
        <button
          className="flex-1 py-4 rounded-2xl bg-green-500/20 border-2 border-green-500 text-green-300 font-semibold text-base active:scale-[0.97] transition-transform"
          onClick={() => onResult(true)}
        >
          ✓ Richtig
        </button>
      </div>

      {showExplanation && questionData && (
        <ExplanationModal question={questionData} onClose={() => setShowExplanation(false)} />
      )}
    </div>
  )
}
