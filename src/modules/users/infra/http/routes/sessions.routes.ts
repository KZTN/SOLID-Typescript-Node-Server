import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const SessionsRouter = Router();
const SessionController = new SessionsController();
SessionsRouter.post('/', SessionController.create);

export default SessionsRouter;
