import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { Service } from 'src/entities/service.entity';

@Injectable()
export class GetServiceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: ExecutionContext & { user: JwtPayload } = context
      .switchToHttp()
      .getRequest();
    const { user } = request;
    console.log('user: ', user);
    return next.handle().pipe(
      map((data) => {
        data as Service[];
        switch (user.package) {
          case 'PRO':
          case 'LIGHT':
            if (Array.isArray(data)) {
              data.forEach((item) => {
                item.allow_order = true;
              });
            }
            break;
          case 'CAT_PRO':
            if (Array.isArray(data)) {
              data.forEach((item) => {
                if (item.category.categoryName == 'Event') {
                  item.allow_order = true;
                } else {
                  item.allow_order = false;
                }
              });
            }
            break;
          default:
            if (Array.isArray(data)) {
              data.forEach((item) => {
                item.allow_order = false;
              });
            }
            break;
        }
        return data;
      }),
    );
  }
}
