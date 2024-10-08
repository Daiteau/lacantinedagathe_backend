import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { BaseEntity } from '../bases/base.entity';
import {Content} from '../contents/content.entity';

@Entity('rating')
export class Rating extends BaseEntity {

    @Column()
    content_uuid: string;

    @Column()
    rating: number;

    // Relations

    @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid' })
    user: User;

    @ManyToOne(() => Content, (content) => content.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content_uuid' })
    content: Content;
}