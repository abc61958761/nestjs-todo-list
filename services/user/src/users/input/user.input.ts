import { Field, InputType } from '@nestjs/graphql';

@InputType() 
export class UserInput {
    @Field(() => String)
    username: String

    @Field(() => String)
    password: String
}