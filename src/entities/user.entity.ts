import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Service } from './service.entity';
import { UserPackage } from './user-package.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserPackage, (userPackage) => userPackage.user)
  userPackages: UserPackage[];

  @OneToMany(() => Service, (service) => service.serviceOrders)
  services: Service[];
}
