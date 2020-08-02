import { Router } from 'express';
import multer from 'multer';
import AuthMiddleware from '@shared/infra/http/middlewares/AuthMiddleware';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';

const UserController = new UsersController();
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', UserController.list);

usersRouter.post('/', UserController.create);
usersRouter.patch(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  UserController.updateAvatar,
);
export default usersRouter;
