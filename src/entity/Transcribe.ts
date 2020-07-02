import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rm_transcribe")
export class Transcribe extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    subject: string;
  
    @Column()
    summary: string;
  
    @Column()
    details: string;
  
    @Column()
    filePath: string;
    
    @Column({ default: 0 })
    viewCount: number;
  
    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;
}