import { Controller, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req) {
    return this.taskService.updateTask(+id, updateTaskDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeTask(@Param('id') id: string, @Request() req) {
    return this.taskService.deleteTask(+id,req.user.id);
  }
}
