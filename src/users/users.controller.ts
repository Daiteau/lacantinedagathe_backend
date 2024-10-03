import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  async createUser(@Body() body: { email: string; password: string }) {
    return this.usersService.create(body.email, body.password);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    await this.usersService.remove(id);
    return { message: `User with ID ${id} deleted successfully` };
  }
}