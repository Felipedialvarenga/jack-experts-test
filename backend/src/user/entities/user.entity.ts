import { Task } from "../../task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password:string;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    constructor(user: Partial<User>){
        Object.assign(this,user)
    }
}
