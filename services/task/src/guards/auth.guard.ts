import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    CanActivate
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard implements CanActivate {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);

        return ctx.getContext().req;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = this.getRequest(context);
        const isValid = req.headers['is-valid'];

        if (isValid === "true") {
            const userId = req.headers['user-id'];
            const role = req.headers['user-role'];
            const user = {
                _id: userId,
                role
            }
            console.log("auth =======")
            console.log(user)
            req.user = user;
            return true;
        }

        throw new UnauthorizedException('Token not valid');
    }
}