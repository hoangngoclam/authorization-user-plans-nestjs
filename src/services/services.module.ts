import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceOrder } from 'src/entities/service-order.entity';
import { Service } from 'src/entities/service.entity';
import { User } from 'src/entities/user.entity';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service, User, ServiceOrder])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
