import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceOrder } from 'src/entities/service-order.entity';
import { Service } from 'src/entities/service.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ServiceOrder)
    private serviceOrderRepository: Repository<ServiceOrder>,
  ) {}

  async findAll() {
    const services = await this.servicesRepository.find({
      relations: { category: true },
    });
    return services;
  }
  async registerService(
    serviceId: number,
    userId: number,
  ): Promise<ServiceOrder> {
    // Tìm thông tin dịch vụ và người dùng
    const service = await this.servicesRepository.findOne({
      where: { id: serviceId },
    });
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!service || !user) {
      throw new NotFoundException('Dịch vụ hoặc người dùng không tồn tại');
    }

    const newServiceOrder = new ServiceOrder();
    newServiceOrder.serviceId = serviceId;
    newServiceOrder.userId = userId;

    return this.serviceOrderRepository.save(newServiceOrder);
  }
}
