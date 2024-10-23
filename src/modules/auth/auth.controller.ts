import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto, SignUpUserDto } from '../users/users.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body :LoginUserDto ) {
    console.log("Login controller")
    return this.authService.signIn(body.email, body.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() body :SignUpUserDto ) {
    console.log("Signup controller")
    return this.authService.signUp(
      body.first_name, 
      body.last_name, 
      body.email, 
      body.password, 
      body.alias
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}