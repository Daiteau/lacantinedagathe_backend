import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from './user.entity';
import { Paths } from '../../constants/paths';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    // Endpoint pour créer un nouvel utilisateur
    @Post(Paths.USERS.CREATE)
    async create(@Body() body: { email: string, password: string }): Promise<User> {
      const { email, password } = body;
      return this.usersService.create(email, password);
    }
  
    // Endpoint pour récupérer tous les utilisateurs
    @Get(Paths.USERS.FIND_ALL)
    async findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }
  
    // Endpoint pour récupérer un utilisateur par ID ou EMAIL
    @Get(Paths.USERS.FIND_ONE(':/param'))
    async findOne(@Param('param') param: number | string): Promise<User> {
      return this.usersService.findOne(param);
    }

    // Endpoint pour récupérer tous les utilisateurs actifs
    @Get(Paths.USERS.FIND_ALL_ACTIVE)
    async findAllActive(): Promise<User[]> {
      return this.usersService.findAllActive();
    }
  
    // Endpoint pour récupérer tous les utilisateurs supprimés
    @Get(Paths.USERS.FIND_ALL_DELETED)
    async findAllDeleted(): Promise<User[]> {
      return this.usersService.findAllDeleted();
    }
  
    @Put(Paths.USERS.DELETE(':id'))
    async delete(@Param('id') id: number): Promise<void> {
      await this.usersService.delete(id);
    }
}