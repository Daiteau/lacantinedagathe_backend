import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (user) {
      throw new BadRequestException('Email in use');
    }

    const hashedPassword = await this.saltPass(password);
    const newUser = await this.usersService.create(email, hashedPassword);

    return newUser;
  }

  private async saltPass(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const saltedPassword = salt + '.' + hash.toString('hex');
    console.log(saltedPassword);
    return saltedPassword;
  }
}