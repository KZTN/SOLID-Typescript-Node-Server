import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

class CreateUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find({
      select: ['name', 'id', 'email', 'avatar'],
    });
    return users;
  }
}

export default CreateUserService;
