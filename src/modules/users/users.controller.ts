import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from './user.entity';
import { Users } from '../users/users.dto'
import { Paths } from '../../constants/paths';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    // Endpoint pour créer un nouvel utilisateur
    // @Post(Paths.USERS.CREATE)
    // async create(@Body() body: { email: string, password: string }): Promise<User> {
    //   const { email, password } = body;
    //   return this.usersService.create(email, password);
    // }
  
    // Endpoint pour récupérer tous les utilisateurs
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    @Get()
    async findAll(): Promise<Users[]> {
      return this.usersService.findAll();
      // console.log("pas d'erreur")
      // return [{
      //   id: 1,
      //   created_at: new Date(),
      //   updated_at: new Date(),
      //   deleted_at: null,
      //   first_name: "noe",
      //   last_name: "fil",
      //   alias: "daito",
      //   email: "noe@example.com",
      //   password: "pass",
      //   role_id:1,
      //   favorites:null,
      //   ratings: null,
      //   contents: null,
      //   comments:null,
      //   role:null,
      //   comment_likes:null, 
      //   content_likes: null,
      // }]
    }
  
    // Endpoint pour récupérer un utilisateur par ID ou EMAIL
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    @Get(Paths.USERS.FIND_ONE(':/param'))
    async findOne(@Param('param') param: number | string): Promise<User> {
      return this.usersService.findOne(param);
    }

    // Endpoint pour récupérer tous les utilisateurs actifs
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    @Get(Paths.USERS.FIND_ALL_ACTIVE)
    async findAllActive(): Promise<User[]> {
      return this.usersService.findAllActive();
    }
  
    // Endpoint pour récupérer tous les utilisateurs supprimés
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    @Get(Paths.USERS.FIND_ALL_DELETED)
    async findAllDeleted(): Promise<User[]> {
      return this.usersService.findAllDeleted();
    }
  
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    @Put(Paths.USERS.DELETE(':id'))
    async delete(@Param('id') id: number): Promise<void> {
      await this.usersService.delete(id);
    }
}