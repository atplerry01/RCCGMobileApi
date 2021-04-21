import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rm_prayerroom')
export class PrayerRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar", { nullable: true })
  title: string;

  @Column("varchar", { nullable: true })
  summary: string;

  @Column("varchar", { nullable: true })
  details: string;

  @Column("varchar", { nullable: true })
  division_id: string;

  @Column({ default: true })
  userCount: number;

  @Column({ default: true })
  active: boolean;

  @Column("varchar", { nullable: true })
  modified_by: string;

  @Column({ default: 0 })
  deleted: boolean;

  @Column("varchar", { nullable: true })
  modified: string;

  @Column("varchar", { nullable: true })
  created: string;

}
