import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { Favorite } from '../favorites/favorite.entity';
import { Rating } from '../ratings/rating.entity';
import { User } from '../users/user.entity';

@Entity('content') 
export class Content extends BaseEntity {

    @Column()
    user_uuid: string

    @Column()
    type: string

    @Column()
    description: string

    // Relations 

    @OneToMany(() => Favorite, (favorite) => favorite.content)
    favorites: Favorite[];

    @OneToMany(() => Rating, (rating) => rating.content)
    ratings: Rating[];

    @ManyToOne(() => User, (user) => user.contents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid' })
    user: User;
}