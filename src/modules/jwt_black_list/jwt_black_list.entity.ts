import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../bases/base.entity';
import { User } from '../users/user.entity';

@Entity('jwt_black_list') 
export class JwtBlackList extends BaseEntity {
  
    @Column()
    token: string; // Colonne pour stocker le jeton JWT
  
    @Column()
    user_id: number; // Colonne pour stocker l'ID de l'utilisateur
    
    @ManyToOne(() => User, (user) => user.blacklistedTokens, { onDelete: 'CASCADE' })
    user: User; // Relation vers l'utilisateur
}