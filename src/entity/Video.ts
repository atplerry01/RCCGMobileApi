import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rm_video")
export class Video extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column()
    summary: string;

    @Column()
    details: string;

    @Column()
    filePath: string;

    @Column()
    thumbImagePath: string;

    @Column()
    source: string;

    @Column({ default: 0 })
    viewCount: number;

    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;

}