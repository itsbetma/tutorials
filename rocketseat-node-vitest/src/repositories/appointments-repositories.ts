import { Appointments } from '../entities/appointment'

export interface AppointmentRepository {
  create: (appointment: Appointments) => Promise<void>
  findOverlappingAppointment: (startAt: Date, endsAt: Date) => Promise<Appointments | null>
}
