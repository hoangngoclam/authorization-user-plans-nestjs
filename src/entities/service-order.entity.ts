import { User } from 'src/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class ServiceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.serviceOrders)
  service: Service;

  @ManyToOne(() => User, (user) => user.userPackages)
  user: User;
}
