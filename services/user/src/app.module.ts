import { Module } from '@nestjs/common';
// 引入 GraphQLModule
import { GraphQLFederationModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:test@localhost:27011/admin'),
    GraphQLFederationModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: join(__dirname, 'src/schema.gql')
    }),
    UsersModule,
  ]
})
export class AppModule {}