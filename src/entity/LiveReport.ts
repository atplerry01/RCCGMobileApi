import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rm_livereport')
export class LiveReport extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  details: string;

  @Column()
  reportType: string;

  @Column()
  imagePath: string;

  @Column()
  thumbImagePath: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  isApproved: number;

  @CreateDateColumn({ type: "timestamp" })
  requestDate: Date;

}
