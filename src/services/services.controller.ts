import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServiceRegisterGuard } from './service-register.guard';
import { GetServiceInterceptor } from './services.interceptor';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('/all')
  @UseInterceptors(GetServiceInterceptor)
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    console.log(req.user);
    return this.servicesService.findAll();
  }

  @Post(':serviceId/register')
  @UseGuards(AuthGuard('jwt'), ServiceRegisterGuard)
  registerService(@Param('serviceId') serviceId: number, @Req() req) {
    return this.servicesService.registerService(serviceId, req?.user.id);
  }
}
