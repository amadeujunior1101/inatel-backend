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

  async update(filter: any, update: any, options?: any): Promise<void> {
    await this.favoriteModel.updateOne(filter, update, options);
  }

  async findById(
    userId: string,
  ): Promise<FavoriteCurrenciesEntity | undefined> {
    return await this.favoriteModel.findOne({ userId }).exec();
  }
}
