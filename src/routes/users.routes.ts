import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

/* usersRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
}); */

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default usersRouter;
