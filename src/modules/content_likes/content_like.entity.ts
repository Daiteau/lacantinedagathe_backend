import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { Content } from '../contents/content.entity';
import { User } from '../users/user.entity';

@Entity('content_like') 
export class ContentLike extends BaseEntity {

    @Column()
    user_id: number;

    @Column()
    content_id: number;

    // Relations 

    @ManyToOne(() => Content, (content) => content.content_likes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @ManyToOne(() => User, (user) => user.content_likes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}