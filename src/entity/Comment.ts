import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rm_comment")
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    thumbImagePath: string;

    @Column()
    fullName: string;

    @Column({ default: 0 })
    details: string;

    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;

}