import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { WalletAsset } from './entities/wallet-asset.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name)
    private walletSchema: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
    @InjectConnection() private conn: mongoose.Connection,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }

  findAll() {
    return this.walletSchema.find();
  }

  findOne(id: string) {
    return this.walletSchema.findById(id).populate([
      {
        path: 'assets', // walletasset
        populate: ['asset'],
      },
    ]);
  }

  async createWalletAsset(data: {
    walletId: string;
    assetId: string;
    shares: number;
  }) {
    const session = await this.conn.startSession();
    session.startTransaction();
    try {
      // precisa executar as duas operações, senão é inconsistente
      const docs = await this.walletAssetSchema.create(
        [
          {
            wallet: data.walletId,
            asset: data.assetId,
            shares: data.shares,
          },
        ],
        { session },
      );
      const walletAsset = docs[0];
      await this.walletSchema.updateOne(
        { _id: data.walletId },
        { $push: { assets: walletAsset._id } },
        { session },
      );
      await session.commitTransaction();
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
