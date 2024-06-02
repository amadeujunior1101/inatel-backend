import { UserEntity } from '@local:src/domain';

export abstract class UserRepositoryContract {
  abstract save(user: UserEntity): Promise<void>;
  abstract findById(id: string): Promise<UserEntity | undefined>;
}
