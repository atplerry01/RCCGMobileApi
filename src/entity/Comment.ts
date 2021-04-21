import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rm_comment")
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true })
    thumbImagePath: string;

    @Column("varchar", { nullable: true })
    fullName: string;

    @Column("varchar", { nullable: true })
    details: string;

    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;

}