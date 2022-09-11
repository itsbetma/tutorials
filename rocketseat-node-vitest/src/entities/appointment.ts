export interface AppointmentsProps {
  customer: string
  startAt: Date
  endsAt: Date
}
export class Appointments {
  private readonly props: AppointmentsProps

  get customer (): string {
    return this.props.customer
  }

  get startAt (): Date {
    return this.props.startAt
  }

  get endsAt (): Date {
    return this.props.endsAt
  }

  constructor (props: AppointmentsProps) {
    const { startAt, endsAt } = props

    if (startAt <= new Date()) {
      throw new Error('Start date is smaller than today')
    }
    if (endsAt <= startAt) {
      throw new Error('Ends date is smaller than startAt')
    }
    this.props = props
  }
}
