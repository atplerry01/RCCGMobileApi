import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrayerWall } from './PrayerWall';

@Entity('prayerwalluser')
export class PrayerWallUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  prayerWallId: string;

  @Column()
  userId: string;

  @Column()
  fullName: string;

  @Column()
  email: string;
  
  @Column()
  phone: string;

  @Column()
  parishName: string;

  @ManyToOne(() => PrayerWall, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "prayerWallId" })
  prayerWall: PrayerWall;
  
  @CreateDateColumn({ type: "timestamp" })
  requestDate: Date;
}
