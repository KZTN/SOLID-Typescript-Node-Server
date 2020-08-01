import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
class UpdateUserAvatar {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new Error('Not permited: User not authenticaded');
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    await userRepository.save(user);
    return user;
  }
}
export default UpdateUserAvatar;
