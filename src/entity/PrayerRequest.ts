import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prayerrequest')
export class PrayerRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  details: string;

  @Column()
  parishName: string;

  @Column({ default: 0})
  viewCount: number;

  @CreateDateColumn({ type: "timestamp" })
  requestDate: Date;
}
