import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';

@Entity('comment_like') 
export class CommentLike extends BaseEntity {

    @Column()
    user_id: number;

    @Column()
    comment_id: number;

    // Relations 

    @ManyToOne(() => Comment, (comment) => comment.comment_likes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'comment_id' })
    comment: Comment;

    @ManyToOne(() => User, (user) => user.comment_likes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}