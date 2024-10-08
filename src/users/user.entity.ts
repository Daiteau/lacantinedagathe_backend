import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Role } from '../roles/role.entity';
import { BaseEntity } from '../bases/base.entity';
import { Favorite } from '../favorites/favorite.entity';
import { Rating } from '../ratings/rating.entity';
import { Content } from '../contents/content.entity';

@Entity('user') 
export class User extends BaseEntity {

    @Column()
    first_name:string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    alias:string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role_uuid: string;

    // Relations 

    @ManyToOne(() => Role, (role) => role.users, {
      onDelete: 'CASCADE',
      })
    @JoinColumn({ name: 'role_uuid' })
    role: Role;

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorites: Favorite[];

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[];

    @OneToMany(() => Content, (content) => content.user)
    contents: Content[];
}