import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CurrencyController } from '@local:src/presentation';
import { ListCurrencyUseCase } from '@local:src/application';
import {
  CurrencyQuoteByDateApiServiceContract,
  CurrencyService,
  CurrencyRepositoryContract,
  CurrencyQuoteApiServiceContract,
} from '@local:src/domain';
import { CurrencyRepository } from '@local:src/infra/adapters';
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
  ],
  controllers: [CurrencyController],
  providers: [
    ListCurrencyUseCase,
    CurrencyService,
    CurrencyGateway,
    InitializationService,
    {
      provide: CurrencyRepositoryContract,
      useClass: CurrencyRepository,
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
