import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: 0 })
  viewCount: number;

  @CreateDateColumn({ type: "timestamp" })
  requestDate: Date;
}
