import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogAudio } from './BlogAudio';
import { BlogVideo } from './BlogVideo';
import { Transcribe } from './Transcribe';

@Entity('pastorblog')
export class PastorBlog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column()
  parishName: string;

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


  @CreateDateColumn({ type: "timestamp" })
  requestDate: Date;
  
}
