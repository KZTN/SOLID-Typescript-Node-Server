import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const SessionsRouter = Router();

SessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const createSessionService = new CreateSessionService();
  const { user, token } = await createSessionService.execute({
    email,
    password,
  });
  delete user.password;
  return res.json({ user, token });
});

export default SessionsRouter;
