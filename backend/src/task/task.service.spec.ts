import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { TaskController } from './task.controller';
import { taskProviders } from './task.providers';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UserModule],
      controllers: [TaskController],
      providers: [...taskProviders,TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  describe('Create Task', () => {
    it('should create a task', async() => {
      const taskInfo: CreateTaskDto = {
        title: 'This is the task title',
        description: 'this is the description of this task',
        completed: false
      }
      const result = await service.createTask(taskInfo, 5)
      const taskRetrieved = await service.getTaskById(result.taskCreated.id)
      expect(taskRetrieved.title).toBe(result.taskCreated.title)
      expect(taskRetrieved.description).toBe(result.taskCreated.description)
      await service.deleteTask(result.taskCreated.id,result.taskCreated.userId)
    });
  })

  describe('Update Task', () => {
    it('should update a task', async() => {
      const taskInfo: CreateTaskDto = {
        title: 'This is the task title',
        description: 'this is the description of this task',
        completed: false
      }
      const taskNewData: UpdateTaskDto = {
        title: 'The new title for this updated task',
        description: 'a new description to better fit this updated task',
        completed: true
      }
      const {taskCreated} = await service.createTask(taskInfo, 5)
      const {taskUpdated} = await service.updateTask(taskCreated.id,taskNewData,taskCreated.userId)
      const taskRetrieved = await service.getTaskById(taskCreated.id)
      expect(taskRetrieved.title).toBe(taskUpdated.title)
      expect(taskRetrieved.description).toBe(taskUpdated.description)
      expect(taskRetrieved.completed).toBe(taskUpdated.completed)
      await service.deleteTask(taskCreated.id,taskCreated.userId)
    });
  })

  describe('Delete Task', () => {
    it('should delete a task', async() => {
      const taskInfo: CreateTaskDto = {
        title: 'This is the task title',
        description: 'this is the description of this task',
        completed: false
      }
      const {taskCreated} = await service.createTask(taskInfo, 5)
      await service.deleteTask(taskCreated.id, taskCreated.userId)
      expect(await service.getTaskById(taskCreated.id)).toBeNull()
    });
  })
});
