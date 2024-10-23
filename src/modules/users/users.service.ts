import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './user.entity';

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
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(param: number | string): Promise<User> {
    console.log("findOne execution")
    const whereCondition = typeof param === 'number' ? { id: param } : { email: param };
    console.log("wherecondition :", whereCondition)
    const user = await this.usersRepository.findOne({ where: whereCondition });
    console.log("findOne user: ",user)
    
    return user;
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
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['role', 'favorites', 'ratings', 'contents', 'comments', 'commentLikes', 'contentLikes', 'blacklistedTokens'] });
    return user;
  }
}