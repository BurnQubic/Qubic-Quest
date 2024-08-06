import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }
    const newUser = await this.usersService.createUser(email, password);
    return this.login(newUser);
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const existingUser = await this.usersService.findByEmail(req.user.email);
    if (existingUser) {
      return this.login(existingUser);
    }

    // Create a new user if they don't exist
    const newUser = await this.usersService.createUser(req.user.email, null);
    return this.login(newUser);
  }
}