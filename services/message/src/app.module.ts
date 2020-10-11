import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 引入 GraphQLModule
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { MessagesResolver } from './messages/messages.resolver';
import { MessagesService } from './messages/messages.service';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:test@localhost:27013/admin'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true
    }),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessagesResolver, MessagesService],
})
export class AppModule {}