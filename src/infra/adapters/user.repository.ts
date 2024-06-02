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
    const createdUser = await this.userModel.create(user); // Usar create em vez de new + save
    return createdUser.toObject(); // Retornar o documento completo como um objeto
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    // const user = await this.userModel.findOne({ id }).exec();
    // return user ? (user.toObject() as UserEntity) : undefined;
    return await this.userModel.findOne({ _id: id }).exec();
  }
}
