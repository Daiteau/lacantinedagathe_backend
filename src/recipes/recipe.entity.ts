import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { Content } from '../contents/content.entity';
import { difficultyEnum } from './recipe-difficulty.enum';

@Entity('recipe') 
export class Recipe extends BaseEntity {

    @Column()
    content_id: number;  

    @Column({ type: 'json', nullable: true })
    recipe_data: { 
        title: string, 
        preparation_time: string,
        cooking_time: number,
        difficulty: difficultyEnum,
        serving: number
    };

    // Relations 

    @OneToOne(() => Content, (content) => content.recipe, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content_uuid' })
    content: Content;
}