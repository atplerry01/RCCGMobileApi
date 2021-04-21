import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rm_audio")
export class Audio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true })
    subject: string;

    @Column("varchar", { nullable: true })
    summary: string;

    @Column("varchar", { nullable: true })
    details: string;

    @Column("varchar", { nullable: true })
    source: string;

    @Column("varchar", { nullable: true })
    filePath: string;

    @Column("varchar", { nullable: true })
    thumbImagePath: string;

    @Column({ default: 0 })
    viewCount: number;

    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;
}