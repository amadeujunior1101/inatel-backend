import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CurrencyController, UserController } from '@local:src/presentation';
import {
  GetFavoriteCurrenciesUseCase,
  ListCurrencyUseCase,
  UpdateFavoriteCurrenciesUseCase,
} from '@local:src/application';
import {
  CurrencyQuoteByDateApiServiceContract,
  CurrencyQuoteApiServiceContract,
} from '@local:src/domain';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import { CurrencyQuoteApiService } from '@local:src/infra/http/';
import { CurrencyGateway } from '@local:src/infra';
import {
  InitializationService,
  CurrencyQuoteByDateApiService,
} from '@local:src/infra/http';
import { DatabaseModule } from '@local:src/database.module';
import { AuthModule, EnvModule, RepositoriesModule } from '@local:src/modules';

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
    RepositoriesModule,
    AuthModule,
  ],
  controllers: [UserController, CurrencyController],
  providers: [
    ListCurrencyUseCase,
    GetFavoriteCurrenciesUseCase,
    UpdateFavoriteCurrenciesUseCase,
    CurrencyGateway,
    InitializationService,
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
