import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoriteCurrenciesDocument = FavoriteCurrenciesEntity & Document;

@Schema({ collection: 'favorites' })
export class FavoriteCurrenciesEntity {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  currenciesName: string;
}

export const FavoriteCurrenciesSchema = SchemaFactory.createForClass(
  FavoriteCurrenciesEntity,
);
