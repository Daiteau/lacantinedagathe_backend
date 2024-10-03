import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Nom de la table
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}