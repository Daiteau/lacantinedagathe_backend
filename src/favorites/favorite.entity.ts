import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { User } from '../users/user.entity';
import { Content } from '../contents/content.entity';

@Entity('favorite') 
export class Favorite extends BaseEntity {

    @Column()
    user_uuid:string;

    @Column()
    content_uuid: string;

    // Relations

    @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid' })
    user: User;

    @ManyToOne(() => Content, (content) => content.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content_uuid' })
    content: Content;
}