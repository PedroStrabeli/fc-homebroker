import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import crypto from 'crypto';

export type AssetDocument = HydratedDocument<Asset>;

@Schema({ timestamps: true })
export class Asset {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop()
  name: string;

  @Prop({ unique: true, index: true })
  symbol: string;

  @Prop()
  image: string;

  // @Prop({ type: mongoose.Types.Decimal128 })
  @Prop()
  price: number;

  createdAt!: Date;
  updatedAt!: Date; // the ! is to tell that mongo is dealing with this property, and not TS.
}

// schema com tipos

export const AssetSchema = SchemaFactory.createForClass(Asset);
