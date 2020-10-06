import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { TaskInput } from './input/task.input';
import { UpdateTaskArgs } from './args/task.update.args';
import { TaskArgs } from './args/task.args';
import { TasksService } from './tasks.service';

@Resolver()
export class TasksResolver {
    constructor(
        private taskService: TasksService,
    ) {}
    
    @Query(() => [Task])
    async tasks(
        @Args() taskArgs: TaskArgs
    ) {
        const tasks = await this.taskService.queryTasks(taskArgs);

        return tasks;
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
