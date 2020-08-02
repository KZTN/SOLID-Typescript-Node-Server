import { Router } from 'express';
import multer from 'multer';
import AuthMiddleware from '@shared/infra/http/middlewares/AuthMiddleware';
import uploadConfig from '@config/upload';

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

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (req, res) => {
  const usersRepository = new UsersRepository();

  const listUsers = new ListUsersService(usersRepository);
  const users = await listUsers.execute();
  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const usersRepository = new UsersRepository();

  const createUser = new CreateUserService(usersRepository);
  const user = await createUser.execute({ name, email, password });
  delete user.password;
  return res.json(user);
});
usersRouter.patch(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    const usersRepository = new UsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);
    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });
    delete user.password;
    return res.json(user);
  },
);
export default usersRouter;
