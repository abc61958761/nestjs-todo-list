import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class ValidateUser{
    @Field()
    isValid: Boolean

    @Field({ nullable: true })
    user?: User;
}
