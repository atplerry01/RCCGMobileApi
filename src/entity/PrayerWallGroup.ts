import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prayerwall_group')
export class PrayerWallGroup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar", { nullable: true })
  title: string;

  @Column("varchar", { nullable: true })
  description: string;

  @Column("varchar", { nullable: true })
  division_id: string;

  @Column("varchar", { nullable: true })
  prayer_date: string;

  @Column("varchar", { nullable: true })
  start_time: string;

  @Column("varchar", { nullable: true })
  end_time: Date;

  @Column({ default: 0 })
  deleted: boolean;

  @Column({ default: true })
  active: boolean;

  @Column("varchar", { nullable: true })
  modified_by: string;

  @Column("varchar", { nullable: true })
  modified: string;

  @Column("varchar", { nullable: true })
  created: string;
}
