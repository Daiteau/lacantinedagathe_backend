import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    
    // Crée un payload incluant l'ID de l'utilisateur et d'autres informations
    const payload = { sub: user.id };

    // Génère le jeton JWT avec expiration
    const token = this.jwtService.sign(payload, { expiresIn: '6h' }); // Le jeton expire dans 6 heure
    return { access_token: token }; // Retourne le jeton au client
  }
}
