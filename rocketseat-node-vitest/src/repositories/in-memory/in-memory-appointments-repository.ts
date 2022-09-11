import { areIntervalsOverlapping } from 'date-fns'
import { Appointments } from '../../entities/appointment'
import { AppointmentRepository } from '../appointments-repositories'

export class InMemoryAppointmentsRepository implements AppointmentRepository {
  public items: Appointments[] = []

  async create (appointment: Appointments): Promise<void> {
    this.items.push(appointment)
  }

  async findOverlappingAppointment (startAt: Date, endsAt: Date): Promise<Appointments | null> {
    const appointmentOverlapping = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        {
          start: startAt,
          end: endsAt
        },
        {
          start: appointment.startAt,
          end: appointment.endsAt
        }, { inclusive: true }
      )
    })

    if (appointmentOverlapping == null) {
      return null
    }

    return appointmentOverlapping
  }
}
