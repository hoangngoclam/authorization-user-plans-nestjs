import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Package } from './package.entity';
import { User } from './user.entity';

@Entity()
export class UserPackage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userPackages)
  user: User;

  @ManyToOne(() => Package, (packageE) => packageE.userPackages)
  package: Package;
}
