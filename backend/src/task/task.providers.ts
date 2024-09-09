import { DataSource } from "typeorm";
import { DATA_SOURCE, TASK_REPOSITORY, } from "../constants";
import { Task } from "./entities/task.entity";

export const taskProviders = [
    {
        provide: TASK_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
        inject: [DATA_SOURCE],
      },
]