import { Field, InputType } from '@nestjs/graphql';

@InputType() 
export class TaskInput {
    @Field(() => String)
    title: String

    @Field(() => String)
    content: String
}