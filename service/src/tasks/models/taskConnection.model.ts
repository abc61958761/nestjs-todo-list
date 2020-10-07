import { Task } from "./task.model"

import { Directive, ObjectType, Field } from '@nestjs/graphql';

@Directive(`@key(fields: "id")`)
@ObjectType()
export class TaskConnection {
    @Field()
    taskCount: Number

    @Field(type => [Task])
    tasks: Task[];
}