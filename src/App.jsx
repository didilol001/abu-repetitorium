import { useState } from 'react'
import { useAuth } from './hooks/useAuth.js'
import { useProgress } from './hooks/useProgress.js'
import LoginScreen from './components/screens/LoginScreen.jsx'
import HomeScreen from './components/screens/HomeScreen.jsx'
import FilterScreen from './components/screens/FilterScreen.jsx'
import QuizScreen from './components/screens/QuizScreen.jsx'
import SummaryScreen from './components/screens/SummaryScreen.jsx'

const DEFAULT_FILTER = { years: [1, 2, 3, 4], type: 'both' }

export default function App() {
  const { currentUser, login, register, logout } = useAuth()
  const [view, setView] = useState('home')
  const [filter, setFilter] = useState(DEFAULT_FILTER)
  const [sessionResult, setSessionResult] = useState(null)
  const [sessionKey, setSessionKey] = useState(0)
  const { progress, recordAnswer, getReadiness, resetProgress, loading } = useProgress(currentUser)

  function navigate(screen, extras = {}) {
    if (extras.filter) setFilter(extras.filter)
    if (extras.result) setSessionResult(extras.result)
    if (extras.presetType) {
      setFilter(f => ({ ...f, type: extras.presetType }))
    }
    if (screen === 'quiz') setSessionKey(k => k + 1)
    setView(screen)
  }

  function handleLogout() {
    logout()
    setView('home')
    setFilter(DEFAULT_FILTER)
    setSessionResult(null)
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-abu-bg">
        <div className="max-w-md mx-auto min-h-screen">
          <LoginScreen onLogin={login} onRegister={register} />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-abu-bg flex items-center justify-center">
        <div className="text-abu-muted text-sm">Fortschritt wird geladen…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-abu-bg">
      <div className="max-w-md mx-auto min-h-screen">
        {view === 'home' && (
          <HomeScreen
            navigate={navigate}
            getReadiness={getReadiness}
            resetProgress={resetProgress}
            username={currentUser}
            onLogout={handleLogout}
          />
        )}
        {view === 'filter' && (
          <FilterScreen
            navigate={navigate}
            initialFilter={filter}
          />
        )}
        {view === 'quiz' && (
          <QuizScreen
            key={sessionKey}
            navigate={navigate}
            filter={filter}
            progress={progress}
            recordAnswer={recordAnswer}
          />
        )}
        {view === 'summary' && sessionResult && (
          <SummaryScreen
            navigate={navigate}
            result={sessionResult}
            getReadiness={getReadiness}
          />
        )}
      </div>
    </div>
  )
}
