import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pastorblog')
export class PastorBlog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  subject: string;

  @Column("varchar", { nullable: true })
  blogger: string;

  @Column("varchar", { nullable: true })
  summary: string;

  @Column("varchar", { nullable: true })
  details: string;

  @Column("varchar", { nullable: true })
  imagePath: string;

  @Column("varchar", { nullable: true })
  thumbImagePath: string;

  @Column("varchar", { nullable: true })
  parishName: string;

  // @Column({ default: false })
  // isApproved: boolean;

  // @OneToMany(() => BlogVideo, a => a.pastorBlog)
  // blogVideos: BlogVideo[];

  // @OneToMany(() => BlogAudio, a => a.pastorBlog)
  // blogAudios: BlogAudio[];

  // @Column("varchar", { nullable: true })
  // transcribeId: string;
  
  // @ManyToOne(() => Transcribe, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: "transcribeId" })
  // transcribe: Transcribe;

  @Column({ nullable: true })
  division_id: string;

  @Column({ nullable: true })
  user_id: string;

  @Column({ default: 0 })
  deleted: boolean;

  @Column({ default: 1 })
  active: boolean;

  @Column("varchar", { nullable: true })
  modified_by: string;

  @Column({ default: 1 })
  viewCount: boolean;

  @CreateDateColumn({ type: "timestamp" })
  requestDate: Date;
}
