export default function OptionButton({ label, selected, revealed, isCorrect, onClick }) {
  let className =
    'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 '

  if (!revealed) {
    if (selected) {
      className += 'border-blue-400 bg-blue-500/20 text-abu-text'
    } else {
      className += 'border-abu-border bg-abu-card text-abu-text hover:border-abu-primary hover:bg-abu-primary/10 active:scale-[0.98]'
    }
  } else {
    if (isCorrect) {
      className += 'border-green-500 bg-green-500/20 text-green-300'
    } else if (selected && !isCorrect) {
      className += 'border-red-500 bg-red-500/20 text-red-300'
    } else {
      className += 'border-abu-border bg-abu-card text-abu-neutral'
    }
  }

  return (
    <button className={className} onClick={onClick} disabled={revealed}>
      <span className="flex items-start gap-2">
        {revealed && (
          <span className="mt-0.5 flex-shrink-0">
            {isCorrect ? '✓' : selected ? '✗' : ''}
          </span>
        )}
        <span>{label}</span>
      </span>
    </button>
  )
}
