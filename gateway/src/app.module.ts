import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {
          serviceList: [
            { name: 'task', url: 'http://localhost:4002/graphql',
          }
          ],
        }
      })
    }),
  ]
})
export class AppModule {}
