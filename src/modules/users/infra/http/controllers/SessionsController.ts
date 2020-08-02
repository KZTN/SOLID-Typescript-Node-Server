import { Response, Request } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const usersRepository = new UsersRepository();

    const createSessionService = new CreateSessionService(usersRepository);
    const { user, token } = await createSessionService.execute({
      email,
      password,
    });
    delete user.password;
    return res.json({ user, token });
  }
}
