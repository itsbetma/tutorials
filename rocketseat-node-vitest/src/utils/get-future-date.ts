import { setYear, parseISO } from 'date-fns'

/**
 * Receives an date and add a year to it.
 * */
export function getFutureDate (date: string) {
  return setYear(parseISO(date), new Date().getFullYear() + 1)
}
