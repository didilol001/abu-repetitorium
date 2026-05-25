/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        abu: {
          bg: '#0f172a',
          card: '#1e293b',
          border: '#334155',
          primary: '#3b82f6',
          correct: '#22c55e',
          wrong: '#ef4444',
          neutral: '#64748b',
          text: '#f1f5f9',
          muted: '#94a3b8',
        },
      },
    },
  },
  plugins: [],
}
