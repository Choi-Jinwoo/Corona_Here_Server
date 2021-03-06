import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('PostFile')
export default class PostFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 1024,
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false
  })
  fk_post_idx: number;
}