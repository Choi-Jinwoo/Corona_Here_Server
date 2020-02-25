import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity
} from 'typeorm';

@Entity('Infectee')
export default class Infectee extends BaseEntity {
  @PrimaryColumn()
  idx: number;

  @Column({
    nullable: false,
  })
  age: number;

  @Column({
    nullable: false,
  })
  gender: number;

  @Column({
    nullable: false,
  })
  type: number;

  @Column('text')
  comment: string;
}