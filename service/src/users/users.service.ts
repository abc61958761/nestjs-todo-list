import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { User } from './models/user.model';
import { UserInput } from './input/user.input';
import { UserArgs } from './args/user.args';

@Injectable()
export class UsersService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {}

    createUser(userData: UserInput) {
        const newUser = new this.userModel(userData);

        return newUser.save();
    }

    findUser(args: UserArgs) {
        const user = this.userModel.findOne(args);

        return user.exec();
    }

    async validateToken(token: string): Promise<{ isValid: boolean; user?: User }> {
        try {
            const user = this.jwtService.verify(token);
            // const user = await this.userModel.findOne(userId);
            return { isValid: true, user };
        } catch (e) {
            return { isValid: false };
        }
    }
}
