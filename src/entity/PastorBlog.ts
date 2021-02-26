import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogAudio } from './BlogAudio';
import { BlogVideo } from './BlogVideo';
import { Transcribe } from './Transcribe';

@Entity('rm_pastorblog')
export class PastorBlog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  blogger: string;

  @Column()
  summary: string;

  @Column()
  details: string;

  @Column()
  imagePath: string;

  @Column()
  thumbImagePath: string;

  @Column({ default: false })
  isApproved: boolean;

  @OneToMany(() => BlogVideo, a => a.pastorBlog)
  blogVideos: BlogVideo[];

  @OneToMany(() => BlogAudio, a => a.pastorBlog)
  blogAudios: BlogAudio[];

  @Column("varchar", { nullable: true })
  transcribeId: string;
  
  @ManyToOne(() => Transcribe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "transcribeId" })
  transcribe: Transcribe;

  
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
