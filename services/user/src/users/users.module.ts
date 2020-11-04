import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User, UserSchema } from './models/user.model';
@Module({
  imports: [
    MongooseModule.forFeature([
    { name: User.name, schema: UserSchema }
    ]),
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UsersService, UsersResolver]
})
export class UsersModule {}
