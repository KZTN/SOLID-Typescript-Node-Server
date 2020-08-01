import 'reflect-metadata';
import express, { Request, Response, NextFunction, response } from 'express';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import routes from './routes';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});
app.listen(3333, () => {
  console.log('Server started on port 3333');
});
