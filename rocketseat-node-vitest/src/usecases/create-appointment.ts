import { Appointments } from '../entities/appointment'
import { AppointmentRepository } from '../repositories/appointments-repositories'

interface CreateAppointmentRequest {
  customer: string
  startAt: Date
  endsAt: Date
}

type CreatAppointmentResponse = Appointments

export class CreateAppointment {
  constructor (private readonly appointmentRepository: AppointmentRepository) { }
  async execute ({
    customer,
    startAt,
    endsAt
  }: CreateAppointmentRequest): Promise<CreatAppointmentResponse> {
    const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(startAt, endsAt)

    if (overlappingAppointment != null) {
      throw new Error('Another appointment overlaps this appointment')
    }

    const appoinments = new Appointments({
      customer,
      startAt,
      endsAt
    })

    await this.appointmentRepository.create(appoinments)

    return appoinments
  }
}
