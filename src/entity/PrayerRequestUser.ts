import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrayerRequest } from './PrayerRequest';

@Entity('rm_prayerrequestuser')
export class PrayerRequestUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prayerRequestId: string;

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

  @ManyToOne(() => PrayerRequest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "prayerRequestId" })
  prayerRequest: PrayerRequest;
  
  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;
}
