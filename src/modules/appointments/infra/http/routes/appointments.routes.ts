import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const AppointmentController = new AppointmentsController();
appointmentsRouter.get('/', AppointmentController.list);

appointmentsRouter.post('/', AppointmentController.create);

export default appointmentsRouter;
