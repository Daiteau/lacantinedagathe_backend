import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDefined } from 'class-validator'

export class BaseEntity { 
  @PrimaryGeneratedColumn()
  @IsDefined()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', default: null })
  deleted_at: Date; 
}