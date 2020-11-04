import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent, Context } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { TaskInput } from './input/task.input';
import { UpdateTaskArgs } from './args/task.update.args';
import { TaskArgs } from './args/task.args';
import { TasksService } from './tasks.service';
import { TaskStatus } from './enums/task.status.enum';
import { TaskConnection } from './models/taskConnection.model';
import { User } from './models/user.model';
 @Resolver(() => Task)
export class TasksResolver {
    constructor(
        private taskService: TasksService,
    ) {}
    
    @Query(() => TaskConnection)
    async todoTasks(
        @Args() taskArgs: TaskArgs,
        @Context() context: any
    ) {
        const user = context.req.headers['user'];
        console.log(user)
        const tasks = await this.taskService.queryTasks(taskArgs, TaskStatus.WAITING);
        const taskCount = await this.taskService.taskCount(taskArgs, TaskStatus.WAITING);
        
        return { tasks, taskCount }
    }

    @Query(() => TaskConnection)
    async doneTasks(
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

    @ResolveField(() => User)
    user(@Parent() task: Task) {
      return { __typename: 'User', _id: task.userId };
    }
 }
