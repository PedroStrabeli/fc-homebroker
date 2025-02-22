import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetPresenter } from './asset.presenter';
import { Asset } from './entities/asset.entity';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async create(@Body() createAssetDto: CreateAssetDto) {
    const asset = await this.assetsService.create(createAssetDto);
    return new AssetPresenter(asset);
  }

  @Get()
  async findAll() {
    const assets = await this.assetsService.findAll();
    return assets.map((asset: Asset) => new AssetPresenter(asset));
  }

  @Get(':symbol')
  async findOne(@Param('symbol') symbol: string) {
    // teria que fazer sanity check para ver se existe antesde converter pro presenter
    const asset = await this.assetsService.findOne(symbol);
    return new AssetPresenter(asset!);
  }

  //+id transforma em inteiro

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
  //   return this.assetsService.update(+id, updateAssetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.assetsService.remove(+id);
  // }
}
