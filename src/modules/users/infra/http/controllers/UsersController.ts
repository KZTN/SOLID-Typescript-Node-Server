import { Response, Request } from 'express';
/*
 *List of repositories
 */
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

/*
 * List of services
 */
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersController {
  public async list(req: Request, res: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const listUsers = new ListUsersService(usersRepository);
    const users = await listUsers.execute();
    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository);
    const user = await createUser.execute({ name, email, password });
    delete user.password;
    return res.json(user);
  }

  public async updateAvatar(req: Request, res: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);
    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });
    delete user.password;
    return res.json(user);
  }
}
