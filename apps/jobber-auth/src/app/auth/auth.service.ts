import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';
import { Response } from 'express';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login({ email, password }: LoginInput, response: Response) {
    const user = await this.verifyUser(email, password);
    const expires = new Date();
    expires.setMilliseconds(
      expires.getTime() + parseInt(this.configService.get('JWT_EXPIRATION'))
    );

    const tokenPayload = { userID: user.id, email: user.email };
    const accessToken = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: false,
      expires,
    });
    return user;
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException('Email or password is incorrect');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
