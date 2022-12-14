import { test, expect } from 'vitest'
import { getFutureDate } from './get-future-date'

test('Increase date in one Year', () => {
  const year = new Date().getFullYear()
  expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(2023)
})
