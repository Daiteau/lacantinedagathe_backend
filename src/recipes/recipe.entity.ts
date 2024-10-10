import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { Content } from '../contents/content.entity';
import { difficultyEnum } from './recipe-difficulty.enum';

@Entity('recipe') 
export class Recipe extends BaseEntity {

    @Column()
    content_id: number;

    @Column()
    title: string;

    @Column() // En MINUTES
    preparation_time: number;

    @Column() // En MINUTES
    cooking_time: number;

    @Column({ type: 'enum', enum: difficultyEnum })
    difficulty: difficultyEnum;

    @Column() // Nombre de parts
    serving: number;

    // Relations 

    @OneToOne(() => Content, (content) => content.recipe, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content_uuid' })
    content: Content;
}