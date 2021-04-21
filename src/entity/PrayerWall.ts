import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prayerwall')
export class PrayerWall extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar", { nullable: true })
  title: string;

  @Column("varchar", { nullable: true })
  summary: string;

  @Column("varchar", { nullable: true })
  details: string;

  @Column("varchar", { nullable: true })
  group_id: string;

  @Column("varchar", { nullable: true })
  division_id: string;

  @Column("varchar", { nullable: true })
  user_id: string;

  @Column("varchar", { nullable: true })
  parishName: string;

  @Column({ default: true })
  active: boolean;

  @Column("varchar", { nullable: true })
  modified_by: string;

  @Column({ default: 0 })
  deleted: boolean;

  @Column({ default: 0 })
  viewCount: number;

  @Column("varchar", { nullable: true })
  requestDate: string;

  @Column("varchar", { nullable: true })
  modified: string;

  @Column("varchar", { nullable: true })
  created: string;

}
