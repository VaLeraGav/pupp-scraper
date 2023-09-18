import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Catalog {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    text: string
}
