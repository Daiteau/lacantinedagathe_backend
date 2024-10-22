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
    email: string, 
    password: string
  ): Promise<User> {
    if(await this.usersRepository.findOne({ where: { email } })) {
      throw new ConflictException('Email already in use');
    }
    const user = this.usersRepository.create({ email, password });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(param: number | string): Promise<User> {
    const whereCondition = typeof param === 'number' ? { id: param } : { email: param };
    const user = await this.usersRepository.findOne({ where: whereCondition });

    if (!user) {
        throw new NotFoundException(`User with param ${param} not found`);
    }
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