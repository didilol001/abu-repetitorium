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
        className="bg-abu-card rounded-2xl border border-abu-border w-full max-w-sm p-5 max-h-[75vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-abu-text text-sm uppercase tracking-wider">Erklärung</span>
          <button className="text-abu-muted hover:text-abu-text transition-colors text-lg" onClick={onClose}>✕</button>
        </div>

        {question.type === 'multiple_choice' ? (
          <div>
            <p className="text-abu-text text-sm leading-relaxed">
              {question.explanation ?? 'Keine Erklärung vorhanden.'}
            </p>
            <div className="mt-4 pt-4 border-t border-abu-border">
              <p className="text-abu-muted text-xs uppercase tracking-wider mb-2">Richtige Antwort(en)</p>
              <div className="space-y-1.5">
                {question.correct.map(i => (
                  <div key={i} className="flex items-start gap-2 text-sm text-green-300">
                    <span className="flex-shrink-0 font-bold mt-0.5">✓</span>
                    <span>{question.options[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-abu-muted text-xs uppercase tracking-wider mb-1">Kurzfassung</p>
            <p className="text-abu-text text-sm leading-relaxed mb-4">
              {question.summary ?? question.answer}
            </p>
            {question.summary && (
              <div className="pt-4 border-t border-abu-border">
                <p className="text-abu-muted text-xs uppercase tracking-wider mb-1">Offizielle Lösung</p>
                <p className="text-abu-muted text-sm leading-relaxed whitespace-pre-wrap">{question.answer}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
