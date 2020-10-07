import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class TaskArgs {
    @Field((type) => Int)
    start: number = 0;

    @Field((type) => Int)
    pageSize: number = 10;
}