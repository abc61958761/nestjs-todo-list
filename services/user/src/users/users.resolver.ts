import { Resolver, Mutation, Args, ResolveReference, Query } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { UserInput } from './input/user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UserArgs } from './args/user.args';
import { ValidateUser } from './models/validate.user.model';

@Resolver(() => User)
export class UsersResolver {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    @Mutation(() => User)
    async register(@Args('userData') userData: UserInput) {
        const user = await this.usersService.createUser(userData);

        return user;
    }

    @Query(() => User)
    async user(@Args('_id') _id: string) {
        const user = await this.usersService.findById(_id);

        return user;
    }

    @Mutation(() => ValidateUser)
    async validateToken(@Args('token') token: string) {
        try {
            const { userId } = this.jwtService.verify(token);
            const user = await this.usersService.findById(userId);
            
            return { isValid: true, user };
        } catch (e) {
            return { isValid: false };
        }
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string; _id: string }) {
        return this.usersService.findById(reference._id);
    }

    @Mutation(() => String)
    async login (
        @Args() userArgs: UserArgs
    ) {
        const user = await this.usersService.findUser(userArgs);
        const accessToken = this.jwtService.sign({
            userId: user._id
        });    

        return accessToken;
    }

    
}
