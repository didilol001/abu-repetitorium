import React, { useState, useCallback, useEffect } from 'react'
import { allQuestions } from '../data/index.js'
import { supabase } from '../lib/supabase.js'

export function useProgress(username) {
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(!!username)

  useEffect(() => {
    if (!username) {
      setProgress({})
      setLoading(false)
      return
    }

    setLoading(true)
    supabase
      .from('progress')
      .select('question_id, attempts, correct, history')
      .eq('username', username)
      .then(({ data }) => {
        if (data) {
          const map = {}
          for (const row of data) {
            map[row.question_id] = {
              attempts: row.attempts,
              correct: row.correct,
              history: row.history,
            }
          }
          setProgress(map)
        }
        setLoading(false)
      })
  }, [username])

  const progressRef = React.useRef(progress)
  progressRef.current = progress

  const recordAnswer = useCallback((id, wasCorrect) => {
    const rec = progressRef.current[id] || { attempts: 0, correct: 0, history: [] }
    const history = [...rec.history, wasCorrect].slice(-5)
    const next = {
      attempts: rec.attempts + 1,
      correct: rec.correct + (wasCorrect ? 1 : 0),
      history,
    }

    setProgress(prev => ({ ...prev, [id]: next }))

    supabase
      .from('progress')
      .upsert(
        { username, question_id: id, ...next, updated_at: new Date().toISOString() },
        { onConflict: 'username,question_id' }
      )
      .then(({ error }) => {
        if (error) console.error('Supabase upsert error:', error)
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

  const resetProgress = useCallback(async () => {
    await supabase.from('progress').delete().eq('username', username)
    setProgress({})
  }, [username])

  return { progress, recordAnswer, getReadiness, resetProgress, loading }
}
