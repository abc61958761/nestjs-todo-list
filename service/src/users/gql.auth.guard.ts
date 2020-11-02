import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    BadRequestException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Injectable()
// export class GqlAuthGuard implements CanActivate {
export class GqlAuthGuard extends AuthGuard('jwt') {

    constructor(private readonly usersService: UsersService) { 
        super() // 實作 CanActivate 不需要
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);

        return ctx.getContext().req;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = this.getRequest(context);
        const authHeader = req.headers.authorization as string;
        console.log(authHeader)
        if (!authHeader) {
            throw new BadRequestException('Authorization header not found.');
        }

        // this.jwtService.verify(authHeader);
        const { isValid, user } = await this.usersService.validateToken(authHeader)
        console.log(user)
        if (isValid) {
            req.user = user;
            return true;
        }
        throw new UnauthorizedException('Token not valid');
    }
}