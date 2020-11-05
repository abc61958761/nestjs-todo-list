import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    CanActivate
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard implements CanActivate {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);

        return ctx.getContext().req;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = this.getRequest(context);
        const isValid = req.headers['is-valid'];

        if (isValid === true) {
            const userId = req.headers['user-id'];
            const user = {
                _id: userId
            }
            req.user = user;
            return true;
        }

        throw new UnauthorizedException('Token not valid');
    }
}