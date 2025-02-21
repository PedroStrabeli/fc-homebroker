import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import crypto from 'crypto';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  createdAt!: Date;
  updatedAt!: Date; // the ! is to tell that mongo is dealing with this property, and not TS.
}

// schema com tipos

export const WalletSchema = SchemaFactory.createForClass(Wallet);
