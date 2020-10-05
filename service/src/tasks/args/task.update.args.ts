import { ArgsType, Field } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task.status.enum';

@ArgsType()
export class UpdateTaskArgs {
    @Field({ nullable: true })
    title?: string

    @Field({ nullable: true })
    content?: string

    @Field({ nullable: true })
    active?: Boolean

    @Field(() => TaskStatus, { nullable: true })
    status?: TaskStatus
}