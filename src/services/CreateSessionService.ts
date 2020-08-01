import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
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
    return { user };
  }
}

export default CreateSessionService;
