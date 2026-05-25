import year1 from './year1.js'
import year2 from './year2.js'
import year3 from './year3.js'
import year4 from './year4.js'

export const allQuestions = [...year1, ...year2, ...year3, ...year4]

export { year1, year2, year3, year4 }

export function getQuestions(years = [1, 2, 3, 4], type = 'both') {
  return allQuestions.filter(q => {
    const yearMatch = years.includes(q.year)
    const typeMatch =
      type === 'both' ||
      (type === 'mc' && q.type === 'multiple_choice') ||
      (type === 'text' && q.type === 'text')
    return yearMatch && typeMatch
  })
}

export const YEAR_QUESTION_COUNTS = {
  1: year1.length,
  2: year2.length,
  3: year3.length,
  4: year4.length,
}
