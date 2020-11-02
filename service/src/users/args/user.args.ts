import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserArgs {
    @Field()
    username: string

    @Field()
    password: string
}