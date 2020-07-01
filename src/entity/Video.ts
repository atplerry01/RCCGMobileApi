import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("video")
export class Video extends BaseEntity {
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

    @Column()
    thumbImagePath: string;

    @Column()
    source: string;

    @Column({ default: 0 })
    viewCount: number;

    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;

}