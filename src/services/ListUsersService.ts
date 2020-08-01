import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find({
      select: ['name', 'id', 'email'],
    });
    return users;
  }
}

export default CreateUserService;
