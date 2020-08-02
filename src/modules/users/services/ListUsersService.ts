import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';

class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }
}

export default CreateUserService;
