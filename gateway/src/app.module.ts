import { Module } from '@nestjs/common';
import { GraphQLGatewayModule, GATEWAY_BUILD_SERVICE} from '@nestjs/graphql';
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { decode } from 'jsonwebtoken';
import fetch from 'node-fetch';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    if (context.jwt) {
      const { userId } = await decode(context.jwt);

      const GET_USER = `
        query user ($_id: String!) {
          user(_id: $_id) {
            _id
            username
          }
        }
      `
      await fetch('http://localhost:4001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: GET_USER,
          variables: { _id: userId },
        })
      })
      .then(r => r.json())
      .then(({ data }) => {
        request.http.headers.set('user', data.user);
      })
      .catch(e => {
        console.log(e)
      });
    }
  }
}

@Module({
  providers: [
    {
      provide: AuthenticatedDataSource,
      useValue: AuthenticatedDataSource,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: AuthenticatedDataSource => {
        return ({ name, url }) => new AuthenticatedDataSource({ url });
      },
      inject: [AuthenticatedDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
class BuildServiceModule {}

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {
          serviceList: [
            { name: 'task', url: 'http://localhost:4002/graphql' },
            { name: 'user', url: 'http://localhost:4001/graphql' }
          ],
        },
        server: {
          context: ({ req }) => ({
            jwt: req.headers.authorization,
          }),
        }
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ]
})
export class AppModule {}
