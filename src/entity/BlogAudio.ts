import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Audio } from "./Audio";
import { PastorBlog } from "./PastorBlog";

@Entity("blogaudio")
export class BlogAudio extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", { nullable: true })
    pastorBlogId: string;

    @Column("varchar", { nullable: true })
    audioId: string;

    @ManyToOne(() => PastorBlog, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "pastorBlogId" })
    pastorBlog: PastorBlog;
    
    @ManyToOne(() => Audio, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "audioId" })
    audio: Audio;

    @ManyToOne(() => PastorBlog, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "blogAudioId" })
    blogAudio: BlogAudio;

    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;
}