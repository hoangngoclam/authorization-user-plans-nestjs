import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ServiceOrder } from './service-order.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.service)
  serviceOrders: ServiceOrder[];

  @ManyToOne(() => Category, (category) => category.services)
  category: Category;
}
