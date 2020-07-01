import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comment")
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    thumbImagePath: string;

    @Column()
    fullName: string;

    @Column({ default: 0 })
    details: string;

    @CreateDateColumn({ type: "timestamp" })
    createdDate: Date;

}