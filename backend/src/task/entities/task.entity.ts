import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    completed: boolean;

    @ManyToOne(() => User, user => user.tasks)
    user: User;

    @RelationId((task: Task) => task.user)
    userId: number;

    constructor(user: Partial<Task>){
        Object.assign(this,{...user,completed: false})
    }
}
