import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrayerWall } from './PrayerWall';

@Entity('rm_prayerwalluser')
export class PrayerWallUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prayerWallId: string;

  @Column("varchar", { nullable: true })
  userId: string;

  @Column("varchar", { nullable: true })
  fullName: string;

  @Column("varchar", { nullable: true })
  email: string;
  
  @Column("varchar", { nullable: true })
  phone: string;

  @Column("varchar", { nullable: true })
  parishName: string;

  @ManyToOne(() => PrayerWall, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "prayerWallId" })
  prayerWall: PrayerWall;
  
  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;
}
