import { ArgsType, Field, Int } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task.status.enum';

@ArgsType()
export class TaskArgs {
    @Field(() => TaskStatus, { nullable: true })
    status?: TaskStatus

    @Field((type) => Int)
    start: number = 0;

    @Field((type) => Int)
    pageSize: number = 10;
}