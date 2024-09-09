import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TASK_REPOSITORY,} from '../constants';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private taskRepository: Repository<Task>,
    private userService: UserService
  ){}

  async createTask(taskInfo: CreateTaskDto, userId: any) {
    const newTask = new Task({...taskInfo,user: userId});
    const newTaskData = await this.taskRepository.save(newTask);
    const userTasks = await this.userService.getUserTasks(userId);
    return {taskCreated: newTaskData, userTasks};
  }

  async getAllTasks() {
    const tasks = await this.taskRepository.find()
    return tasks;
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOneBy({id});
    return task;
  }

  async updateTask(id: number, taskNewData: UpdateTaskDto, userId:number) {
    const taskToUpdate = await this.getTaskById(id);
    const updatedTask = await this.taskRepository.save(Object.assign(taskToUpdate, taskNewData))
    const userTasks = await this.userService.getUserTasks(userId);
    return {taskUpdated: updatedTask, userTasks};
  }

  async deleteTask(id: number, userId: number) {
    const taskToDelete = await this.getTaskById(id);
    await this.taskRepository.delete({id});
    const userTasks = await this.userService.getUserTasks(userId);
    return {taskDeleted: taskToDelete, userTasks};
  }
}
