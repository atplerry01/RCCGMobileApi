import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rm_prayerrequest')
export class PrayerRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  fullName: string;

  @Column("varchar", { nullable: true })
  email: string;

  @Column("varchar", { nullable: true })
  phone: string;

  @Column()
  details: string;


  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  userCount: number;

  @Column({ default: true })
  isActive: boolean;


  @Column({ default: false })
  isTreated: boolean;

  @Column({ default: '00' })
  division_id: string;

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
