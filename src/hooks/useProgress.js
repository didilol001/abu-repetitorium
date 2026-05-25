import { useState, useCallback } from 'react'
import { allQuestions } from '../data/index.js'

function storageKey(username) {
  return `abu_progress_v1_${username}`
}

function loadProgress(username) {
  try {
    const raw = localStorage.getItem(storageKey(username))
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveProgress(username, data) {
  try {
    localStorage.setItem(storageKey(username), JSON.stringify(data))
  } catch {}
}

export function useProgress(username) {
  const [progress, setProgress] = useState(() => loadProgress(username))

  const recordAnswer = useCallback((id, wasCorrect) => {
    setProgress(prev => {
      const rec = prev[id] || { attempts: 0, correct: 0, history: [] }
      const history = [...rec.history, wasCorrect].slice(-5)
      const updated = {
        ...prev,
        [id]: {
          attempts: rec.attempts + 1,
          correct: rec.correct + (wasCorrect ? 1 : 0),
          history,
        },
      }
      saveProgress(username, updated)
      return updated
    })
  }, [username])

  const getReadiness = useCallback((years = [1, 2, 3, 4]) => {
    const questions = allQuestions.filter(q => years.includes(q.year))
    if (questions.length === 0) return 0
    const learned = questions.filter(q => {
      const rec = progress[q.id]
      if (!rec || rec.attempts === 0) return false
      return rec.correct / rec.attempts >= 0.6
    })
    return Math.round((learned.length / questions.length) * 100)
  }, [progress])

  const resetProgress = useCallback(() => {
    localStorage.removeItem(storageKey(username))
    setProgress({})
  }, [username])

  return { progress, recordAnswer, getReadiness, resetProgress }
}
