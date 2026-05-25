import { useState, useEffect } from 'react'
import { useSession } from '../../hooks/useSession.js'
import OptionButton from '../ui/OptionButton.jsx'
import FlipCard from '../ui/FlipCard.jsx'
import YearBadge from '../ui/YearBadge.jsx'

export default function QuizScreen({ navigate, filter, progress, recordAnswer }) {
  const session = useSession(filter, progress)

  const [selected, setSelected] = useState(new Set())
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setSelected(new Set())
    setRevealed(false)
  }, [session.currentIndex])

  function handleOptionClick(index) {
    if (revealed) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  function handlePruefen() {
    if (selected.size === 0 || !session.currentQuestion) return
    const q = session.currentQuestion
    const correctSet = new Set(q.correct)
    const wasCorrect =
      selected.size === correctSet.size &&
      [...selected].every(i => correctSet.has(i))
    session.submitAnswer(wasCorrect)
    recordAnswer(q.id, wasCorrect)
    setRevealed(true)
  }

  function handleWeiter() {
    if (session.isFinished) return
    session.advance()
  }

  function handleFlipResult(wasCorrect) {
    if (!session.currentQuestion) return
    session.submitAnswer(wasCorrect)
    recordAnswer(session.currentQuestion.id, wasCorrect)
    session.advance()
  }

  useEffect(() => {
    if (!session.isFinished) return
    const correct = session.answers.filter(a => a.wasCorrect).length
    navigate('summary', {
      result: {
        answers: session.answers,
        total: session.total,
        correct,
        filter,
        mcAnswered: session.mcAnswered,
        textAnswered: session.textAnswered,
      },
    })
  }, [session.isFinished])

  if (session.isFinished) return null

  const q = session.currentQuestion
  if (!q) return null

  const progress_pct = Math.round((session.currentIndex / session.total) * 100)

  return (
    <div className="h-full flex flex-col px-4 pt-4 pb-4">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <button
          className="text-abu-muted p-2 rounded-xl hover:bg-abu-card active:scale-95 transition-all text-lg"
          onClick={() => navigate('home')}
        >
          ✕
        </button>
        <div className="flex items-center gap-2">
          <YearBadge year={q.year} />
          <span className="text-abu-muted text-sm">
            {session.currentIndex + 1} / {session.total}
          </span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-abu-border rounded-full mb-4 overflow-hidden flex-shrink-0">
        <div
          className="h-full bg-abu-primary rounded-full transition-all duration-300"
          style={{ width: `${progress_pct}%` }}
        />
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        {q.type === 'multiple_choice' ? (
          <MCQuestion
            question={q}
            selected={selected}
            revealed={revealed}
            onOptionClick={handleOptionClick}
            onPruefen={handlePruefen}
            onWeiter={handleWeiter}
          />
        ) : (
          <div className="flex flex-col h-full">
            <p className="text-abu-muted text-xs font-semibold uppercase tracking-wider mb-2 flex-shrink-0">
              Karteikarte
            </p>
            <FlipCard
              key={q.id}
              question={q.question}
              answer={q.answer}
              onResult={handleFlipResult}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function MCQuestion({ question, selected, revealed, onOptionClick, onPruefen, onWeiter }) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-abu-card rounded-2xl p-4 border border-abu-border flex-shrink-0 mb-3">
        <p className="text-abu-muted text-xs font-semibold uppercase tracking-wider mb-2">
          Multiple Choice
        </p>
        <p className="text-abu-text text-sm leading-relaxed">{question.question}</p>
      </div>

      <div className="flex flex-col gap-2 flex-1 justify-evenly">
        {question.options.map((opt, i) => (
          <OptionButton
            key={i}
            label={opt}
            selected={selected.has(i)}
            revealed={revealed}
            isCorrect={question.correct.includes(i)}
            onClick={() => onOptionClick(i)}
          />
        ))}
      </div>

      <div className="flex-shrink-0 pt-3">
        {!revealed ? (
          <button
            className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
              selected.size > 0
                ? 'bg-abu-primary text-white active:scale-[0.97] shadow-lg shadow-blue-500/20'
                : 'bg-abu-border text-abu-neutral cursor-not-allowed'
            }`}
            onClick={onPruefen}
            disabled={selected.size === 0}
          >
            Prüfen
          </button>
        ) : (
          <button
            className="w-full py-4 rounded-2xl bg-abu-card border-2 border-abu-border text-abu-text font-bold text-base active:scale-[0.97] transition-all"
            onClick={onWeiter}
          >
            Weiter →
          </button>
        )}
      </div>
    </div>
  )
}
