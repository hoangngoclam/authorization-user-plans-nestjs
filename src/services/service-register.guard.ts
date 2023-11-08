import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { Service } from 'src/entities/service.entity';
import { ServicesService } from './services.service';

@Injectable()
export class ServiceRegisterGuard implements CanActivate {
  constructor(private readonly servicesService: ServicesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ExecutionContext & {
      user: JwtPayload;
      params: { serviceId: string };
    } = context.switchToHttp().getRequest();
    const { user, params } = request;
    console.log('user: ', user);
    console.log('parram: ', params);
    console.log('context: ', context);

    const serviceRegisterInfo: Service = await this.servicesService.findById(
      parseInt(params.serviceId),
    );

    console.log('serviceRegistInfo: ', serviceRegisterInfo);

    const countInMonth = 8;

    switch (user.package) {
      case 'SMART':
        return false;
      case 'CAT_PRO':
        if (serviceRegisterInfo.category.categoryName == 'Event') {
          return true;
        }
        return false;
      case 'LIGHT':
        if (countInMonth <= 10) {
          return true;
        }
        return false;
      default:
        return true;
    }
  }
}
