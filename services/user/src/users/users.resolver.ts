import { Resolver, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { UserInput } from './input/user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';
@Resolver(() => User)
export class UsersResolver {
    constructor(
        private usersService: UsersService
    ) {}
    @Mutation(() => User)
    async createUser(@Args('userData') userData: UserInput) {
        const user = await this.usersService.createUser(userData);

        return user;
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; _id: string }) {
        return this.usersService.findById(reference._id);
    }
}
