import { Entity, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { Favorite } from '../favorites/favorite.entity';
import { Rating } from '../ratings/rating.entity';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { ContentLike } from '../content_likes/content_like.entity';
import { Recipe } from '../recipes/recipe.entity';
import { ContentPicture } from '../content_pictures/content_picture.entity';
import { ContentTag } from '../content_tags/content_tag.entity';

@Entity('content') 
export class Content extends BaseEntity {

    @Column()
    user_id: number;

    @Column()
    type: string

    @Column()
    description: string

    // Relations

    @OneToMany(() => Favorite, (favorite) => favorite.content, { onDelete: 'CASCADE' })
    favorites: Favorite[];

    @OneToMany(() => Rating, (rating) => rating.content, { onDelete: 'CASCADE' })
    ratings: Rating[];

    @OneToMany(() => Comment, (comment) => comment.content, { onDelete: 'CASCADE' })
    comments: Comment[];

    @OneToMany(() => ContentLike, (content_like) => content_like.content, { onDelete: 'CASCADE' })
    content_likes: Content[];

    @OneToMany(() => ContentPicture, (content_picture) => content_picture.content, { onDelete: 'CASCADE' })
    content_pictures: ContentPicture[];

    @OneToMany(() => ContentTag, (content_tag) => content_tag.content, { onDelete: 'CASCADE' })
    content_tags: ContentTag[];

    @OneToOne(() => Recipe, (recipe) => recipe.content, { onDelete: 'CASCADE' })
    recipe: Recipe;

    @ManyToOne(() => User, (user) => user.contents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id'})
    user: User;
}