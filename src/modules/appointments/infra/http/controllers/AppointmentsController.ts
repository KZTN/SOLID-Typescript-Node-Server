import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import { Request, Response } from 'express';

export default class AppointmentsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const appointmentsRepository = new AppointmentRepository();
    const appointments = await appointmentsRepository.find();
    return res.json(appointments);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;
    const parsedDate = parseISO(date);
    const appointmentsRepository = new AppointmentRepository();

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });
    return res.json(appointment);
  }
}
