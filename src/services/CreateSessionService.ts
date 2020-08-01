import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/Auth';
import AppError from '../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}
class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppError('Incorret email or password', 401);
    }

    const passwordhatched = await compare(password, user.password);
    if (!passwordhatched) {
      throw new AppError('Incorret email or password', 401);
    }
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return { user, token };
  }
}

export default CreateSessionService;
