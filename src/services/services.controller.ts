import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServicesService } from './services.service';

// @UseInterceptors(GetServiceInterceptor)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    console.log(req.user);
    return this.servicesService.findAll();
  }

  @Post(':serviceId/register')
  @UseGuards(AuthGuard('jwt'))
  registerService(@Param('serviceId') serviceId: number, @Req() req) {
    return this.servicesService.registerService(serviceId, req?.user.id);
  }
}
