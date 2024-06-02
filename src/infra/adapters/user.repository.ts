import { Injectable } from '@nestjs/common';
import { UserEntity } from '@local:src/domain';
import { UserRepositoryContract } from '@local:src/domain/contracts';

@Injectable()
export class UserRepository implements UserRepositoryContract {
  private user: UserEntity[] = [];

  async save(user: UserEntity): Promise<void> {
    this.user.push(user);
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return this.user.find((user) => user.id === id);
  }
}
