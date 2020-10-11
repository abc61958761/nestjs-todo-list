import { Module } from '@nestjs/common';
// 引入 GraphQLModule
import { GraphQLModule, GraphQLFederationModule } from '@nestjs/graphql';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksResolver } from './tasks/tasks.resolver';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:test@localhost:27012/admin'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true
    }),
    // GraphQLFederationModule.forRoot({
    //   typePaths: ['*.gql'],
    // }),
    TasksModule
  ],
  // providers: [TasksResolver],
})
export class AppModule {}