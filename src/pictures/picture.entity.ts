import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { ContentPicture } from '../content_pictures/content_picture.entity';

@Entity('picture') 
export class Picture extends BaseEntity {

    @Column()
    label: string;

    @Column()
    src: string;

    // Relations

    @OneToMany(() => ContentPicture, (content_picture) => content_picture.picture, { onDelete: 'CASCADE' })
    content_pictures: ContentPicture[];
}