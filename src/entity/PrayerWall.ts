import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrayerWallUser } from './PrayerWallUser';

@Entity('rm_prayerwall')
export class PrayerWall extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  details: string;

  @Column()
  parishName: string;

  @Column()
  phone: string;

  @Column()
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

  @CreateDateColumn({ type: "timestamp" })
  requestDate: Date;
}
