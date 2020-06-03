import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('prayerwall')
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

  @Column({ default: 0 })
  viewCount: number;

  @CreateDateColumn({ type: "timestamp" })
  requestDate: Date;
}
