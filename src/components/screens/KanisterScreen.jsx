import { getQuestions } from '../../data/index.js'

const CHUNK_SIZE = 15

function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
}

function getChunkProgress(chunk, progress) {
  let learned = 0
  for (const q of chunk) {
    const rec = progress[q.id]
    if (!rec || rec.attempts === 0 || rec.history.length === 0) continue
    if (rec.history.filter(Boolean).length / rec.history.length >= 0.6) learned++
  }
  return learned
}

export default function KanisterScreen({ navigate, filter, progress }) {
  const questions = getQuestions(filter.years, filter.type)
  const chunks = chunkArray(questions, CHUNK_SIZE)

  return (
    <div className="h-full flex flex-col px-4 py-4">
      <div className="flex items-center gap-3 mb-5 flex-shrink-0">
        <button
          className="text-abu-muted p-2 rounded-xl hover:bg-abu-card active:scale-95 transition-all"
          onClick={() => navigate('filter')}
        >
          ←
        </button>
        <div>
          <h1 className="text-lg font-bold text-abu-text">Kanister wählen</h1>
          <p className="text-xs text-abu-muted">{questions.length} Fragen · {chunks.length} Kanister à {CHUNK_SIZE}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-2">
        {chunks.map((chunk, i) => {
          const learned = getChunkProgress(chunk, progress)
          const pct = Math.round((learned / chunk.length) * 100)
          const isDone = pct === 100

          return (
            <button
              key={i}
              className="w-full bg-abu-card rounded-2xl border border-abu-border p-4 text-left active:scale-[0.98] transition-transform"
              onClick={() => navigate('quiz', { filter: { ...filter, questionIds: chunk.map(q => q.id) } })}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-abu-text text-sm">Kanister {i + 1}</span>
                <span className={`text-xs font-semibold ${isDone ? 'text-green-400' : 'text-abu-muted'}`}>
                  {learned}/{chunk.length} gelernt
                </span>
              </div>
              <p className="text-xs text-abu-muted mb-3">
                Frage {i * CHUNK_SIZE + 1}–{Math.min((i + 1) * CHUNK_SIZE, questions.length)}
              </p>
              <div className="h-1.5 bg-abu-border rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${isDone ? 'bg-green-500' : 'bg-abu-primary'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
