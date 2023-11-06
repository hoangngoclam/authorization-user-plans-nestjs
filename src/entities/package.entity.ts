import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPackage } from './user-package.entity';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => UserPackage, (userPackage) => userPackage.package)
  userPackages: UserPackage[];
}
