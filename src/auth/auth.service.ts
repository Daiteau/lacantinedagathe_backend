import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // Injecte JwtService
  ) {}

  // Authentifier et générer un token JWT
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }

    // Création du payload pour le JWT
    const payload = { username: user.email, sub: user.id };
    
    // Génération et retour du JWT
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
