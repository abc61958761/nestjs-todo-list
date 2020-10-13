import { Field, InputType, ID } from '@nestjs/graphql';

@InputType() 
export class TaskInput {
    @Field(() => String)
    title: String

    @Field(() => String)
    content: String

    @Field(() => ID)
    userId: String
}