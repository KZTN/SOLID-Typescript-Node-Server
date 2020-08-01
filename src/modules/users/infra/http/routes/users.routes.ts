import { Router } from 'express';
import multer from 'multer';
import AuthMiddleware from '@shared/infra/http/middlewares/AuthMiddleware';
import uploadConfig from '@config/upload';

/*
 * List of services
 */
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (req, res) => {
  const listUsers = new ListUsersService();
  const users = await listUsers.execute();
  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const createUser = new CreateUserService();
  const user = await createUser.execute({ name, email, password });
  delete user.password;
  return res.json(user);
});
usersRouter.patch(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });
    delete user.password;
    return res.json(user);
  },
);
export default usersRouter;
