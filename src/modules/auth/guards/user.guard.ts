import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { Request } from 'express';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    
    // Vérifie si un en-tête spécifique 'x-auth-token' est présent
    const authToken = request.headers['x-auth-token'];

    if (Array.isArray(authToken)) {
        throw new UnauthorizedException('Multiple auth tokens are not allowed');
    }
    
    if (!authToken) {
        throw new UnauthorizedException('Missing auth token');
    }

    try {
      // Décoder le jeton et récupérer le payload
      const payload = await this.jwtService.verify(authToken);
      
      // Extraire l'ID de l'utilisateur (ou tout autre champ que tu as stocké)
      const userId = payload.sub; // ou payload.userId, selon comment tu as structuré le payload

      const userRole = await this.usersService.getRole(userId);
      if(userRole !== 'regular'){
        if(userRole !== 'admin'){
            throw new UnauthorizedException('Access denied : Valid role required.');
        }
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid auth token');
    }
  }
}