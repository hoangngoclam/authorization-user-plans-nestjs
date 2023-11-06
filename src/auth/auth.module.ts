import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'; // Tạo JwtStrategy theo hướng dẫn ở bên dưới

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // Đăng ký Passport với chiến lược jwt
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: 'Hello@ThisisME',
        signOptions: { expiresIn: '3600s' }, // Cấu hình thời gian hết hạn của JWT
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy], // Đăng ký JwtStrategy
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
