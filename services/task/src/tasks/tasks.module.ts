import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { Task, TaskSchema } from './models/task.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Task.name, schema: TaskSchema }
  ])],
  providers: [TasksService, TasksResolver]
})
export class TasksModule {}
