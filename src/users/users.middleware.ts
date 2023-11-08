import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UserMiddleware');
    console.log(req);
    next();
  }
}
