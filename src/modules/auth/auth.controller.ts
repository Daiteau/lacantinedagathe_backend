import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto, SignUpUserDto } from '../users/users.dto'
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService 
  ) {
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body :LoginUserDto ) {
    const response = await this.authService.signIn(body.email, body.password);
    return response;
  } 

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() body :SignUpUserDto ) {
    console.log("Signup controller")
    return this.authService.signUp(
      body.first_name, 
      body.last_name, 
      body.email, 
      body.password, 
      body.alias
    );
  }

  @Post('refresh')
  async refresh(@Body() body: { userId: number, refreshToken: string }) {
    return this.authService.refreshTokens(body.userId, body.refreshToken);
  }

  @Post('logout')
  async logout(@Body() body: { token: string }) {
    const payload = this.jwtService.verify(body.token);
    const userId = payload.sub;
    await this.authService.signOut(userId);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


/**
 * L'utilisateur se login, on crée le refresh token et on le stock en base
 * On envoie l'access token au client
 * Le client stock l'access token dans l'application (pas dans le local storage mais dans la mémoire de l'application (in-memory: state) )
 * On envoie l'access token dans l'en-tête de chaque requête
 */
}