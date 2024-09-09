import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseModule } from 'src/database/database.module';
import { taskProviders } from './task.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [TaskController],
  providers: [...taskProviders,TaskService],
})
export class TaskModule {}
