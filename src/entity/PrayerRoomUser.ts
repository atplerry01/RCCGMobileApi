import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rm_prayerroomuser')
export class PrayerRoomUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  prayerRoomId: string;

  @Column("varchar", { nullable: true })
  user_id: string;

  @Column("varchar", { nullable: true })
  fullName: string;

  @Column("varchar", { nullable: true })
  email: string;
  
  @Column("varchar", { nullable: true })
  phone: string;

  @Column("varchar", { nullable: true })
  parishName: string;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;
}
