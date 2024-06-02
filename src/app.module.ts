import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CurrencyController, UserController } from '@local:src/presentation';
import {
  CreateUserUseCase,
  GetFavoriteCurrenciesUseCase,
  ListCurrencyUseCase,
} from '@local:src/application';
import {
  CurrencyQuoteByDateApiServiceContract,
  CurrencyQuoteApiServiceContract,
  UserEntity,
  UserSchema,
  UserRepositoryContract,
  FavoriteCurrencyRepositoryContract,
  FavoriteCurrenciesEntity,
  FavoriteCurrenciesSchema,
} from '@local:src/domain';
import {
  FavoriteCurrencyRepository,
  UserRepository,
} from '@local:src/infra/adapters';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import { EnvModule } from '@local:src/env.module';
import { CurrencyQuoteApiService } from '@local:src/infra/http/';
import { CurrencyGateway } from '@local:src/infra';
import {
  InitializationService,
  CurrencyQuoteByDateApiService,
} from '@local:src/infra/http';
import { DatabaseModule } from './database.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EnvModule,
    HttpModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserSchema },
      { name: FavoriteCurrenciesEntity.name, schema: FavoriteCurrenciesSchema },
    ]),
  ],
  controllers: [UserController, CurrencyController],
  providers: [
    CreateUserUseCase,
    ListCurrencyUseCase,
    GetFavoriteCurrenciesUseCase,
    CurrencyGateway,
    InitializationService,
    {
      provide: UserRepositoryContract,
      useClass: UserRepository,
    },
    {
      provide: FavoriteCurrencyRepositoryContract,
      useClass: FavoriteCurrencyRepository,
    },
    {
      provide: CurrencyQuoteApiServiceContract,
      useClass: CurrencyQuoteApiService,
    },
    {
      provide: CurrencyQuoteByDateApiServiceContract,
      useClass: CurrencyQuoteByDateApiService,
    },
  ],
})
export class AppModule {}
