import { useState, useMemo } from 'react'
import { getQuestions } from '../data/index.js'

function getRecentStreak(rec) {
  if (!rec || rec.history.length === 0) return 0
  let streak = 0
  for (let i = rec.history.length - 1; i >= 0; i--) {
    if (rec.history[i]) streak++
    else break
  }
  return streak
}

function buildQueue(questions, progressMap) {
  return questions
    .map(q => {
      const rec = progressMap[q.id]
      const streak = getRecentStreak(rec)
      const weight = Math.max(1, 4 - streak)
      return { ...q, _priority: Math.random() * weight }
    })
    .sort((a, b) => b._priority - a._priority)
}

export function useSession(filter, progress) {
  const questions = useMemo(
    () => getQuestions(filter.years, filter.type),
    [filter.years, filter.type]
  )

  const [queue] = useState(() => buildQueue(questions, progress))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  const currentQuestion = queue[currentIndex] || null
  const isFinished = currentIndex >= queue.length

  function submitAnswer(wasCorrect) {
    if (!currentQuestion) return
    setAnswers(prev => [...prev, { id: currentQuestion.id, wasCorrect, type: currentQuestion.type }])
  }

  function advance() {
    setCurrentIndex(i => i + 1)
  }

  const mcAnswered = answers.filter(a => {
    const q = queue.find(x => x.id === a.id)
    return q && q.type === 'multiple_choice'
  })
  const textAnswered = answers.filter(a => {
    const q = queue.find(x => x.id === a.id)
    return q && q.type === 'text'
  })

  return {
    queue,
    currentQuestion,
    currentIndex,
    isFinished,
    answers,
    mcAnswered,
    textAnswered,
    submitAnswer,
    advance,
    total: queue.length,
  }
}
