import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards, SetMetadata } from '@nestjs/common';

import { Task } from './models/task.model';
import { TaskInput } from './input/task.input';
import { UpdateTaskArgs } from './args/task.update.args';
import { TaskArgs } from './args/task.args';
import { TasksService } from './tasks.service';
import { TaskStatus } from './enums/task.status.enum';
import { TaskConnection } from './models/taskConnection.model';
import { RolesGuard } from '../guards/roles.guard';
// import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from '../users/gql.auth.guard';
import { CurrentUser } from '../decorators/currentUser';
import { User } from '../users/models/user.model';
import { SuperRoles } from '../decorators/super.role';

 @Resolver()
export class TasksResolver {
    constructor(
        private taskService: TasksService,
    ) {}
    
    @UseGuards(GqlAuthGuard, RolesGuard)
    @SuperRoles('vip', 'admin')
    @Query(() => TaskConnection)
    async todoTasks(
        @Args() taskArgs: TaskArgs
    ) {
        const tasks = await this.taskService.queryTasks(taskArgs, TaskStatus.WAITING);
        const taskCount = await this.taskService.taskCount(taskArgs, TaskStatus.WAITING);
        
        return { tasks, taskCount }
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @SuperRoles('vip')
    @Query(() => TaskConnection)
    async doneTasks(
        @CurrentUser() user: User,
        @Args() taskArgs: TaskArgs
    ) {
        const tasks = await this.taskService.queryTasks(taskArgs, TaskStatus.DONE );
        const taskCount = await this.taskService.taskCount(taskArgs, TaskStatus.DONE);

        return { tasks, taskCount};
    }

    @Mutation(() => Task)
    async createTask(@Args('taskData') taskData: TaskInput) {
        const task = await this.taskService.createTask(taskData);

        return task;
    }

    @Mutation(() => Task) 
    async updateTask(
        @Args('_id', { type: () => ID }) _id: String,
        @Args() updateTaskArgs: UpdateTaskArgs
    ) {
        const task = await this.taskService.updateTask(_id, updateTaskArgs);

        return task;
    }
 }
