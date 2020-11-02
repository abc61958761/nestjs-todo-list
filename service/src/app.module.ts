import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { GqlAuthGuard } from './users/gql.auth.guard';
// 引入 GraphQLModule
import { GraphQLModule } from '@nestjs/graphql';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:test@localhost:27017/admin'),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true
    }),
    TasksModule,
    UsersModule
  ],
  // providers: [{
  //   provide: APP_GUARD,
  //   useClass: GqlAuthGuard,
  // }],
})
export class AppModule {}