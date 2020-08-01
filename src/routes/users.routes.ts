import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (req, res) => {
  const listUsers = new ListUsersService();
  const users = await listUsers.execute();
  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    delete user.password;
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
usersRouter.patch(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    return res.json({ msg: 'ok' });
  },
);
export default usersRouter;
