import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AssetPresenter } from 'src/assets/asset.presenter';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const asset = await this.ordersService.create(createOrderDto);
    return new AssetPresenter(asset);
  }

  @Get()
  async findAll(@Query('walletId') walletId: string) {
    // aqui passaria do header de autenticação da request, mas vamos usar query param
    const asset = await this.ordersService.findAll({
      walletId,
    });
    return new AssetPresenter(asset);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // teria que fazer sanity check para ver se existe antesde converter pro presenter
    const asset = await this.ordersService.findOne(id);
    return new AssetPresenter(asset!);
  }
}
