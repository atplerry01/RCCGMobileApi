import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PastorBlog } from "./PastorBlog";
import { Transcribe } from "./Transcribe";

@Entity("rm_blogtranscribe")
export class BlogTranscribe extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true })
    pastorBlogId: string;

    @ManyToOne(() => PastorBlog, { nullable: true })
    @JoinColumn({ name: "pastorBlogId" })
    pastorBlog: PastorBlog;

    @Column("varchar", { nullable: true })
    transcribeId: string;

    @ManyToOne(() => Transcribe, { nullable: true })
    @JoinColumn({ name: "transcribeId" })
    transcribe: Transcribe;
    
    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;
}