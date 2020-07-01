import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prayerrequest')
export class PrayerRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  details: string;

  @Column()
  parishName: string;

  @Column({ default: false })
  isTreated: boolean;

  @CreateDateColumn({ type: "timestamp" })
  requestDate: Date;
}
