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
    if (!user || user.refreshToken) {
      console.error("Non autorisé : user not found or already logged in")
      throw new UnauthorizedException("Vous n'êtes pas autorisé à accéder à cette ressource");
    }

    const validPass = await this.verifyPass(user, pass);
    if(validPass){
      const payload = { sub: user.id, role: user.role.label};
      console.log(user.first_name, "s'est connecté le", new Date());

      const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
      const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '15d' });

      await this.usersService.updateRefreshToken(user.id, refreshToken);
      console.log("Autorisé")
      return {
        access_token: accessToken
      };
    }
    console.log("Non autorisé")
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
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.saltPass(password);
    const newUser = await this.usersService.create(
      firstName,
      lastName,
      email, 
      hashedPassword,
      alias
    );

    return newUser;
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<{ access_token: string, refresh_token: string }> {
    const user = await this.usersService.findOneById(userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    const newAccessToken = await this.jwtService.signAsync(payload);
    const newRefreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });

    await this.usersService.updateRefreshToken(user.id, newRefreshToken);

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }

  async signOut(userId: number): Promise<void> {
    console.log("Déconnexion de l'utilisateur", userId);
    await this.usersService.updateRefreshToken(userId, null);
  }

  private async saltPass(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const saltedPassword = salt + '.' + hash.toString('hex');
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