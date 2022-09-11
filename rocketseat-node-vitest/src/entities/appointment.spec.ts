import { expect, test } from 'vitest'
import { getFutureDate } from '../utils/get-future-date'
import { Appointments } from './appointment'

test('Create appoinment', () => {
  const startDate = getFutureDate('2022-08-10')
  const endDate = getFutureDate('2022-08-11')

  const appointment = new Appointments({
    customer: 'Marco',
    startAt: startDate,
    endsAt: endDate
  })
  expect(appointment).toBeInstanceOf(Appointments)
  expect(appointment.customer).toEqual('Marco')
})

test('Cannot create an appointment with end date before start date', () => {
  const startDate = getFutureDate('2022-08-10')
  const endDate = getFutureDate('2022-08-09')

  expect(() => {
    return new Appointments({
      customer: 'Marco',
      startAt: startDate,
      endsAt: endDate
    })
  }).toThrow()
})
