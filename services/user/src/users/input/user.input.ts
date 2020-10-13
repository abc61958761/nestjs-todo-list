import { Field, InputType } from '@nestjs/graphql';

@InputType() 
export class UserInput {
    @Field(() => String)
    name: String
}