import { Controller, Post, Body, Get, Request, UseGuards, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  //Retorna apenas as tasks do user
  @UseGuards(JwtAuthGuard)
  @Get('/tasks')
  async getUserTasks(@Request() req) {
    return this.userService.getUserTasks(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  removeTask(@Request() req) {
    return this.userService.deleteUser(req.user.id);
  }

}