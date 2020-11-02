import { Resolver, Query, Mutation, Args, ID,  } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UseGuards, SetMetadata } from '@nestjs/common';

import { UsersService } from './users.service'
import { UserInput } from './input/user.input';
import { UserArgs } from './args/user.args';
import { User } from './models/user.model';
import { RolesGuard } from '../guards/roles.guard';
// import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './gql.auth.guard';
import { CurrentUser } from '../decorators/currentUser';

@Resolver()
export class UsersResolver {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    @Mutation(() => User)
    async register(
        @Args('userData') userData: UserInput
    ) {
        const user = await this.userService.createUser(userData);

        return user;
    }

    // @UseGuards(GqlAuthGuard, RolesGuard)
    // @SetMetadata('roles', ['admin'])
    @Mutation(() => String)
    async login (
        @CurrentUser() test: User,
        @Args() userArgs: UserArgs
    ) {
        const user = await this.userService.findUser(userArgs);
        const accessToken = this.jwtService.sign({
            role: user.role,
            username: user.username
        });    

        return accessToken;
    }
}
