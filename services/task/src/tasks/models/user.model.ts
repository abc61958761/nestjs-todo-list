import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@Directive('@extends')
@Directive(`@key(fields: "_id")`)
@ObjectType()
export class User {
  @Directive('@external')
  @Field(() => ID)
  _id: string;
}
