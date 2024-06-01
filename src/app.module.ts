import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CurrencyController } from './presention/controllers/currency.controller';
import { ListCurrencyUseCase } from './application/useCases/list-currency.useCase';
import { CurrencyService } from './domain/services/currency.service';
import { CurrencyRepository } from './infra/adapters/persistence/repositories/currency.repository';
import { CurrencyRepositoryContract } from './domain/contracts/currencyRepository.contract';
import { ExternalApiServiceContract } from './domain/contracts/externalApiService.contract';
import { ExternalApiService } from './infra/external/external-api.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import { EnvModule } from './env.module';

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
    CurrencyService,
    { provide: CurrencyRepositoryContract, useClass: CurrencyRepository },
    ListCurrencyUseCase,
    { provide: ExternalApiServiceContract, useClass: ExternalApiService },
  ],
})
export class AppModule {}
