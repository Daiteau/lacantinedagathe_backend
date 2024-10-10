import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { BaseEntity } from '../bases/base.entity';
import {Content} from '../contents/content.entity';

@Entity('rating')
export class Rating extends BaseEntity {

    @Column()
    content_id: number;

    @Column({ default: 0 })
    rating: number;

    // Relations

    @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Content, (content) => content.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content_id' })
    content: Content;
}