import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('DateGraph')
export default class DateGraph extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    nullable: false,
  })
  date: string;

  @Column({
    nullable: false
  })
  number: number;
}