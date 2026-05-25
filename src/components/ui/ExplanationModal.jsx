import { useEffect } from 'react'

export default function ExplanationModal({ question, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-abu-card rounded-2xl border border-abu-border w-full max-w-sm p-5 max-h-[70vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-abu-text text-sm uppercase tracking-wider">Erklärung</span>
          <button className="text-abu-muted hover:text-abu-text transition-colors text-lg" onClick={onClose}>✕</button>
        </div>

        {question.type === 'multiple_choice' ? (
          <div className="space-y-2">
            <p className="text-abu-muted text-xs mb-3">Alle Antworten im Überblick — richtig und falsch:</p>
            {question.options.map((opt, i) => {
              const correct = question.correct.includes(i)
              return (
                <div
                  key={i}
                  className={`flex items-start gap-2 p-2.5 rounded-xl text-sm leading-relaxed ${
                    correct
                      ? 'bg-green-500/15 border border-green-500/30 text-green-300'
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}
                >
                  <span className="flex-shrink-0 font-bold mt-0.5">{correct ? '✓' : '✗'}</span>
                  <span>{opt}</span>
                </div>
              )
            })}
          </div>
        ) : (
          <div>
            <p className="text-abu-muted text-xs uppercase tracking-wider mb-2">Musterantwort zur Erinnerung</p>
            <p className="text-abu-text text-sm leading-relaxed whitespace-pre-wrap">{question.answer}</p>
          </div>
        )}
      </div>
    </div>
  )
}
