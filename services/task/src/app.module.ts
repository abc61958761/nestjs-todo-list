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
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(__dirname, 'src/schema.gql'),
      // installSubscriptionHandlers: true
    }),
    TasksModule
  ],
  // providers: [TasksResolver],
})
export class AppModule {}