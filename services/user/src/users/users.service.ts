import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './models/user.model';
import { UserInput } from './input/user.input';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {}

    createUser(userData: UserInput) {
        const newUser = new this.userModel(userData);
        
        return newUser.save();
    }

    findById(_id: string) {
        return this.userModel.findById(_id).exec();
    }
}
