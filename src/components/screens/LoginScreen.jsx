import { useState } from 'react'

export default function LoginScreen({ onLogin, onRegister }) {
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const err = mode === 'login'
      ? onLogin(username, password)
      : onRegister(username, password)
    if (err) setError(err)
    setLoading(false)
  }

  function switchMode(m) {
    setMode(m)
    setError('')
  }

  return (
    <div className="flex flex-col h-full justify-center px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-abu-text">ABU Repetitorium</h1>
        <p className="text-abu-muted text-sm mt-2">Prüfungsvorbereitung Lehrjahre 1–4</p>
      </div>

      <div className="bg-abu-card rounded-2xl border border-abu-border overflow-hidden">
        <div className="flex">
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mode === 'login'
                ? 'bg-abu-primary text-white'
                : 'text-abu-muted hover:text-abu-text'
            }`}
            onClick={() => switchMode('login')}
            type="button"
          >
            Anmelden
          </button>
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mode === 'register'
                ? 'bg-abu-primary text-white'
                : 'text-abu-muted hover:text-abu-text'
            }`}
            onClick={() => switchMode('register')}
            type="button"
          >
            Registrieren
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-abu-muted text-xs font-semibold uppercase tracking-wider mb-1.5">
              Benutzername
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-abu-bg border border-abu-border rounded-xl px-4 py-3 text-abu-text text-sm outline-none focus:border-abu-primary transition-colors"
              placeholder="Dein Benutzername"
              autoComplete="username"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-abu-muted text-xs font-semibold uppercase tracking-wider mb-1.5">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-abu-bg border border-abu-border rounded-xl px-4 py-3 text-abu-text text-sm outline-none focus:border-abu-primary transition-colors"
              placeholder="Dein Passwort"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-abu-primary rounded-xl text-white font-bold text-sm active:scale-[0.97] transition-transform shadow-lg shadow-blue-500/20 mt-1"
          >
            {mode === 'login' ? 'Anmelden' : 'Konto erstellen'}
          </button>
        </form>
      </div>
    </div>
  )
}
