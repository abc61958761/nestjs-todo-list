import { Module } from '@nestjs/common';
import { GraphQLGatewayModule, GATEWAY_BUILD_SERVICE } from '@nestjs/graphql';
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { decode } from 'jsonwebtoken';
import fetch from 'node-fetch';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    if (context.jwt) {
      const VALIDATE_TOKEN = `
        mutation validateToken ($token: String!) {
          validateToken(token: $token) {
            isValid
            user {
              _id
              username
              role
            }
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
          query: VALIDATE_TOKEN,
          variables: { token: context.jwt },
        })
      })
      .then(r => r.json())
      .then(({ data }) => {
        request.http.headers.set('is-valid', data.validateToken.isValid);
        if (data.validateToken.isValid && data.validateToken.user) {
          request.http.headers.set('user-id', data.validateToken.user['_id']);
          request.http.headers.set('user-role', data.validateToken.user['role']);
        }
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
