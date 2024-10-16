import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { Content } from '../contents/content.entity';
import { Picture } from '../pictures/picture.entity';

@Entity('content_picture') 
export class ContentPicture extends BaseEntity {

    @Column()
    user_id: number;

    @Column()
    picture_id: number;

    // Relations 

    @ManyToOne(() => Content, (content) => content.content_pictures, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @ManyToOne(() => Picture, (picture) => picture.content_pictures, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'picture_id' })
    picture: Picture;
}