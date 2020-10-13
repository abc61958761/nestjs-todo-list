import { Task } from "./task.model"

import { Directive, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TaskConnection {
    @Field()
    taskCount: Number

    @Field(type => [Task])
    tasks: Task[];
}