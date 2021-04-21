import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rm_livereport')
export class LiveReport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  title: string;

  @Column("varchar", { nullable: true })
  details: string;

  @Column("varchar", { nullable: true })
  reportType: string;

  @Column("varchar", { nullable: true })
  imagePath: string;

  @Column("varchar", { nullable: true })
  thumbImagePath: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  isApproved: number;

  
  @Column("varchar", { nullable: true })
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
