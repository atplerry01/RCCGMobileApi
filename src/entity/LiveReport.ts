import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('livereport')
export class LiveReport extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  reportType: string;

  @Column()
  imagePath: string;

  @Column()
  thumbImagePath: string;

  @Column({ default: 0 })
  viewCount: number;

  @CreateDateColumn({ type: "timestamp" })
  requestDate: Date;
}
