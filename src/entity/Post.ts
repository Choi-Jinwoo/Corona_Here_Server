import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';

@Entity('Post')
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false,
  })
  title: string;

  @Column('text', {
    nullable: false,
  })
  content: string;

  @Column({
    nullable: false,
    default: 0,
  })
  view: number;

  @Column({
    nullable: false,
  })
  region: number;

  @Column('timestampz')
  @CreateDateColumn()
  created_at: Date;
}