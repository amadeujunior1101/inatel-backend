import { Injectable } from '@nestjs/common';
import { UserEntity } from '@local:src/domain';
import { UserRepositoryContract } from '@local:src/domain/contracts';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository implements UserRepositoryContract {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.userModel.create(user);
    return createdUser.toObject();
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userModel.findOne({ email }).exec();
  }
}
