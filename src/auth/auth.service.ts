import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUserPassword(loginUserDto);

    if (!user) {
      throw new UnauthorizedException('Sai thông tin đăng nhập');
    }

    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      package: '',
    };

    if (user.userPackages.length > 0) {
      payload.package = user.userPackages[0].package.name;
    }
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserDto;

    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser = await this.userService.findOneByEmail(email);

    if (existingUser) {
      throw new Error('Email đã được sử dụng.');
    }
    return this.userService.create({ email, password, name });
  }
}
