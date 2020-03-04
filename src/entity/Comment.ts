import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';

@Entity('Comment')
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('text', {
    nullable: false,
  })
  content: string;

  @Column('timestampz')
  @CreateDateColumn()
  created_at: Date;

  @Column({
    nullable: false
  })
  fk_post_idx: number;
}