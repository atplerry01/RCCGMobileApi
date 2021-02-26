import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrayerWallUser } from './PrayerWallUser';

@Entity('rm_prayerwall')
export class PrayerWall extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  details: string;

  @Column("varchar", { nullable: true })
  phone: string;

  @Column("varchar", { nullable: true })
  whatsapp: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  userCount: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  hasRange: boolean;
  
  @OneToMany(() => PrayerWallUser, a => a.prayerWall)
  prayerWallUsers: PrayerWallUser[];

  @CreateDateColumn({ type: "timestamp", nullable: true })
  startDate: Date;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  endDate: Date;

  
  
  @Column()
  division_id: number;

  @Column({ default: 0 })
  deleted: boolean;

  @Column({ default: 1 })
  active: boolean;

  @Column("varchar", { nullable: true })
  modified_by: string;

  @Column("varchar", { nullable: true })
  time_created: string;

  @Column("varchar", { nullable: true })
  time_modified: string;
  
  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;
}
