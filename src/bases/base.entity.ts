import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity { 
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  uuid: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deleted_at: Date;
}