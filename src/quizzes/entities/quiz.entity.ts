import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Block } from '../block';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  blocks: Block[];

  @Column({ default: false })
  published: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
