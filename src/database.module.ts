import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from './modules';

@Module({
  imports: [EnvModule, MongooseModule.forRoot(String(process.env.MONGO_URL))],
})
export class DatabaseModule {}
