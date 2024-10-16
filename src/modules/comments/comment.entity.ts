import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { User } from '../users/user.entity';
import { Content } from '../contents/content.entity';
import { CommentLike } from '../comment_likes/comment_like.entity';

@Entity('comment') 
export class Comment extends BaseEntity {

    @Column()
    user_id: number;

    @Column()
    content_id: number;

    @Column()
    description: string

    // Relations 

    @OneToMany(() => CommentLike, (comment_like) => comment_like.comment)
    comment_likes: CommentLike[];

    @ManyToOne(() => Content, (content) => content.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}