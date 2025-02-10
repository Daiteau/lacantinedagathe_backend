import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './user.entity';
import { Users } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    alias?: string,
  ): Promise<User> {
    const user = this.usersRepository.create({first_name, last_name, email, password, alias });
    const result = await this.usersRepository.save(user);
    const userdata = {
      id: result.id,
      roleId: result.role_id
    }
    return result;
  }

  async findAll(): Promise<Users[]> {
    const users: User[] = await this.usersRepository.find({
      select: [
        'id', 
        'created_at',
        'first_name', 
        'last_name', 
        'alias', 
        'email', 
        'role_id'
      ], // Colonnes spécifiques
      where: { deleted_at: null }, // Utilisateurs non supprimés
    }, );

    return users;
  }

  async findOne(param: number | string): Promise<User> {
    const whereCondition = typeof param === 'number' ? { id: param } : { email: param };
    const user = await this.usersRepository.findOne({ where: whereCondition, relations: ['role'] });
    return user;
  }

  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findAllActive(): Promise<User[]> {
    return this.usersRepository.find({ where: { deleted_at: null } });
  }

  async findAllDeleted(): Promise<User[]> {
    return this.usersRepository.find({ where: { deleted_at: Not(null) } });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.update(id, { deleted_at: new Date() });
  }

  async getRole(id: number): Promise<string> {
    const user = await this.findOne(id);
    return user.role.label;
  }

  async findFullOne(id: number): Promise<User>{
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['role', 'favorites', 'ratings', 'contents', 'comments', 'commentLikes', 'contentLikes'] });
    return user;
  }

  async updateRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.usersRepository.update(userId, { refreshToken });
  }
}