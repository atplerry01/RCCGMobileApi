import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rm_livereport')
export class LiveReport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  
  @Column()
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
