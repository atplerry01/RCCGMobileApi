import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prayerrequest')
export class PrayerRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  title: string;

  @Column("varchar", { nullable: true })
  details: string;

  @Column("varchar", { nullable: true })
  parishName: string;

  @Column("varchar", { nullable: true })
  requestDate: string;
  
  @Column("varchar", { nullable: true })
  division_id: string;

  @Column("varchar", { nullable: true })
  user_Id: string;
  
  @Column({ default: 0 })
  deleted: number;

  @Column({ default: 1 })
  active: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column("varchar", { nullable: true })
  modified_by: string;

}
