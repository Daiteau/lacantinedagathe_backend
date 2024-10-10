import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { User } from '../users/user.entity';
import { Content } from '../contents/content.entity';

@Entity('favorite') 
export class Favorite extends BaseEntity {

    @Column()
    user_id: number;

    @Column()
    content_id: number;

    // Relations

    @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Content, (content) => content.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content_id' })
    content: Content;
}