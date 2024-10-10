import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { Content } from '../contents/content.entity';
import { Tag } from '../tags/tag.entity';

@Entity('content_tag') 
export class ContentTag extends BaseEntity {

    @Column()
    label: number;

    @Column()
    tag_id: number;

    // Relations 

    @ManyToOne(() => Content, (content) => content.content_pictures, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @ManyToOne(() => Tag, (tag) => tag.content_tags, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tag_id' })
    tag: Tag;
}