import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Vérifie si un accessToken est présent dans l'en-tête Authorization
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new UnauthorizedException('Missing auth token');
    }

    const authToken = authHeader.split(' ')[1];

    try {
      // Décoder le jeton et récupérer le payload
      const payload = await this.jwtService.verify(authToken);
      console.log("Verified Payload", payload);
      
      // Extraire l'ID de l'utilisateur (ou tout autre champ que tu as stocké)
      const userId = payload.sub; // ou payload.userId, selon comment tu as structuré le payload

      if (await this.usersService.getRole(userId) !== 'admin') {
        throw new UnauthorizedException('Access denied: Admin role required.');
      }

      return true; // Autorise l'accès
    } catch (error) {
      console.log("Invalid auth token", error);
      throw new UnauthorizedException('Invalid auth token');
    }
  }
}