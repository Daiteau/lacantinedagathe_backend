import { Entity, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { BaseEntity } from '../bases/base.entity';

@Entity('role')
export class Role extends BaseEntity {

  @Column({ unique: true })
  label: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[]; // Un rôle peut être associé à plusieurs utilisateurs

}