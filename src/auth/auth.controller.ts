import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginPayload: LoginUserDto) {
    return this.authService.login(loginPayload);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Req() req) {
    const user = await this.authService.register(createUserDto);
    req.login(user, (err) => {
      if (err) {
        throw err;
      }
    });
    return user; // Trả về thông tin đăng ký
  }
}
