import ProgressDashboard from '../ui/ProgressDashboard.jsx'

export default function HomeScreen({ navigate, getReadiness, resetProgress, username, onLogout }) {
  const overall = getReadiness([1, 2, 3, 4])

  function handleReset() {
    if (confirm('Wirklich den gesamten Fortschritt zurücksetzen?')) {
      resetProgress()
    }
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-abu-text">ABU Repetitorium</h1>
          <p className="text-abu-muted text-sm mt-0.5">Hallo, <span className="text-abu-text font-medium">{username}</span></p>
        </div>
        <button
          className="text-abu-muted text-xs px-3 py-1.5 rounded-lg border border-abu-border hover:text-abu-text hover:border-abu-neutral transition-colors"
          onClick={onLogout}
        >
          Abmelden
        </button>
      </div>

      <div className="bg-abu-card rounded-2xl p-5 border border-abu-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-abu-text">Prüfungsbereitschaft</h2>
          <span className={`text-2xl font-bold ${
            overall >= 70 ? 'text-green-400' : overall >= 40 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {overall}%
          </span>
        </div>
        <ProgressDashboard getReadiness={getReadiness} />
      </div>

      <button
        className="w-full py-4 bg-abu-primary rounded-2xl text-white font-bold text-lg active:scale-[0.97] transition-transform shadow-lg shadow-blue-500/20"
        onClick={() => navigate('filter')}
      >
        Lernen starten
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          className="py-3 bg-abu-card rounded-xl border border-abu-border text-abu-text text-sm font-medium active:scale-[0.97] transition-transform"
          onClick={() => navigate('filter', { presetType: 'mc' })}
        >
          Nur Multiple Choice
        </button>
        <button
          className="py-3 bg-abu-card rounded-xl border border-abu-border text-abu-text text-sm font-medium active:scale-[0.97] transition-transform"
          onClick={() => navigate('filter', { presetType: 'text' })}
        >
          Nur Karteikarten
        </button>
      </div>

      <button
        className="text-abu-muted text-xs text-center py-2"
        onClick={handleReset}
      >
        Fortschritt zurücksetzen
      </button>
    </div>
  )
}
