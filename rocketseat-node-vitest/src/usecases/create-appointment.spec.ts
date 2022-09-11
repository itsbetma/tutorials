import { describe, expect, it } from "vitest";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { getFutureDate } from "../utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment", () => {
  it("Should be able to create an Appointment", async () => {
    const inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(inMemoryAppointmentsRepository);

    const startDate = getFutureDate("2022-08-10");
    const endDate = getFutureDate("2022-08-15");

    await createAppointment.execute({
      customer: "Marco",
      startAt: startDate,
      endsAt: endDate,
    })

    expect(
      createAppointment.execute({
        customer: "Marco",
        startAt: getFutureDate('2022-08-12'),
        endsAt: getFutureDate('2022-08-18'),
      })
    ).rejects.toBeInstanceOf(Error)

    expect(
      createAppointment.execute({
        customer: "Marco",
        startAt: getFutureDate('2022-08-8'),
        endsAt: getFutureDate('2022-08-12'),
      })
    ).rejects.toBeInstanceOf(Error)

    expect(
      createAppointment.execute({
        customer: "Marco",
        startAt: getFutureDate('2022-08-12'),
        endsAt: getFutureDate('2022-08-18'),
      })
    ).rejects.toBeInstanceOf(Error)
  });
});
