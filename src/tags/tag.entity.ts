import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { ContentPicture } from '../content_pictures/content_picture.entity';
import { tagEnum } from '../tags/tag-type.enum';
import { ContentTag } from '../content_tags/content_tag.entity'; 

@Entity('tag') 
export class Tag extends BaseEntity {

    @Column()
    label: string;

    @Column({ type: 'enum', enum: tagEnum })
    type: tagEnum;

    // Relations

    @OneToMany(() => ContentTag, (content_tag) => content_tag.tag, { onDelete: 'CASCADE' })
    content_tags: ContentTag[];
}