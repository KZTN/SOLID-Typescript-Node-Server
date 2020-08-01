import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

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
      throw new Error('Incorret email or password');
    }

    const passwordhatched = await compare(password, user.password);
    if (!passwordhatched) {
      throw new Error('Incorret email or password');
    }
    const token = sign({}, '3e89ef0d13f5ed4a85ca4c279b009abb', {
      subject: user.id,
      expiresIn: '7d',
    });
    return { user, token };
  }
}

export default CreateSessionService;
