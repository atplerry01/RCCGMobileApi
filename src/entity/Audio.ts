import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rm_audio")
export class Audio extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    subject: string;

    @Column()
    summary: string;

    @Column()
    details: string;

    @Column()
    source: string;

    @Column()
    filePath: string;

    @Column()
    thumbImagePath: string;

    @Column({ default: 0 })
    viewCount: number;

    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;
}