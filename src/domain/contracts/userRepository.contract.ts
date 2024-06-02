import { UserEntity } from '@local:src/domain';

export abstract class UserRepositoryContract {
  abstract save(user: UserEntity): Promise<UserEntity>;
  abstract findById(id: string): Promise<UserEntity | undefined>;
  abstract findByEmail(email: string): Promise<UserEntity>;
}
