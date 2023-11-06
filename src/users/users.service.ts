import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userPackages', 'userPackage')
      .leftJoinAndSelect('userPackage.package', 'package')
      .getMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOne(id);
    const updatedUser = { ...existingUser, ...updateUserDto };
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const existingUser = await this.findOne(id);
    await this.usersRepository.remove(existingUser);
  }

  async validateUserPassword(loginData: {
    email: string;
    password: string;
  }): Promise<User | null> {
    const { email, password } = loginData;
    const user = await this.findOneByEmail(email);

    if (user && password == user.password) {
      return user;
    }

    return null;
  }
}
