import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PastorBlog } from "./PastorBlog";
import { Video } from "./Video";

@Entity("rm_blogvideo")
export class BlogVideo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { nullable: true })
    pastorBlogId: string;

    @Column("varchar", { nullable: true })
    videoId: string;
    
    @ManyToOne(() => PastorBlog, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "pastorBlogId" })
    pastorBlog: PastorBlog;

    @ManyToOne(() => Video, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "videoId" })
    video: Video;
    
    @ManyToOne(() => PastorBlog, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "blogVideoId" })
    blogVideo: BlogVideo;

    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;

}