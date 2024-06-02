import { Injectable } from '@nestjs/common';
import { FavoriteCurrenciesEntity } from '@local:src/domain';
import { FavoriteCurrencyRepositoryContract } from '@local:src/domain/contracts';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FavoriteCurrencyRepository
  implements FavoriteCurrencyRepositoryContract
{
  constructor(
    @InjectModel(FavoriteCurrenciesEntity.name)
    private favoriteModel: Model<FavoriteCurrenciesEntity>,
  ) {}

  async save(
    favorite: FavoriteCurrenciesEntity,
  ): Promise<FavoriteCurrenciesEntity> {
    const createdFavorite = new this.favoriteModel(favorite);
    return await createdFavorite.save();
  }

  async update(favorite: FavoriteCurrenciesEntity): Promise<void> {
    const createdUser = new this.favoriteModel(favorite);
    await createdUser.updateOne();
  }

  async findById(id: string): Promise<FavoriteCurrenciesEntity | undefined> {
    return await this.favoriteModel.findOne({ userId: id }).exec();
  }
}
