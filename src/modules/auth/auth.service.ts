import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from '../users/user.entity';

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
    if (!user) {
      throw new UnauthorizedException();
    }
    const validPass = this.verifyPass(user, pass);
    if(validPass){
      const payload = { sub: user.id, email: user.email };
      console.log(user.first_name, "s'est connecté")
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
      
    }
    return {
      access_token: null,
    };
  }

  async signUp(
    firstName:string, 
    lastName:string, 
    email: string, 
    password: string, 
    alias?: string,
  ) {
    console.log("Data :",firstName,lastName, email, password, alias)
    const user = await this.usersService.findOne(email);
    console.log("user :",user)
    if (user) {
      console.log("pas de user trouve")
      throw new BadRequestException('Email in use');
    }

    const hashedPassword = await this.saltPass(password);
    console.log("pass hash :",hashedPassword)
    const newUser = await this.usersService.create(
      firstName,
      lastName,
      email, 
      hashedPassword,
      alias
    );

    console.log("New User :",newUser)

    return newUser;
  }

  private async saltPass(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const saltedPassword = salt + '.' + hash.toString('hex');
    console.log(saltedPassword);
    return saltedPassword;
  }

  async verifyPass(user: User, password:string): Promise<Boolean> {
    if (!user) {
        return false;
    }

    // Extraire le salt et le hash du mot de passe stocké
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash === hash.toString('hex')) {
        return true; // Mot de passe valide
    }

    return false; // Mot de passe invalide
}
}