import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { TaskInput } from './input/task.input';
import { UpdateTaskArgs } from './args/task.update.args';
import { TaskArgs } from './args/task.args';

@Resolver()
export class TasksResolver {
    
    @Query(() => [Task])
    async tasks(
        @Args() taskArgs: TaskArgs
    ) {}

    @Mutation(() => Task)
    async createTask(@Args('taskData') taskData: TaskInput) {}

    @Mutation(() => Task) 
    async updateTask(
        @Args('id', { type: () => ID }) id: String,
        @Args() updateTaskArgs: UpdateTaskArgs
    ) {}
 }
