import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserEntity,
  UserRepositoryContract,
  FavoriteCurrencyRepositoryContract,
  FavoriteCurrenciesEntity,
} from '@local:src/domain';
import {
  UserRepository,
  FavoriteCurrencyRepository,
} from '@local:src/infra/repositories';
import {
  FavoriteCurrenciesSchema,
  UserSchema,
} from '@local:src/infra/database/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserSchema },
      { name: FavoriteCurrenciesEntity.name, schema: FavoriteCurrenciesSchema },
    ]),
  ],
  providers: [
    {
      provide: UserRepositoryContract,
      useClass: UserRepository,
    },
    {
      provide: FavoriteCurrencyRepositoryContract,
      useClass: FavoriteCurrencyRepository,
    },
  ],
  exports: [
    {
      provide: UserRepositoryContract,
      useClass: UserRepository,
    },
    {
      provide: FavoriteCurrencyRepositoryContract,
      useClass: FavoriteCurrencyRepository,
    },
  ],
})
export class RepositoriesModule {}
