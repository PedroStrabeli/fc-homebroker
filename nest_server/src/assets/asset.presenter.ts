import { Asset } from './entities/asset.entity';

export class AssetPresenter {
  constructor(private asset: Asset) {}

  toJSON() {
    return {
      _id: this.asset._id,
      name: this.asset.name,
      symbol: this.asset.symbol,
      image_url: `http://localhost:9000/${this.asset.image}`,
      price: this.asset.price,
    };
  }
}
