import cors from '@fastify/cors';
import etag from '@fastify/etag';
import fastifyFormbody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import type { TokenOrHeader } from '@fastify/jwt';
import fastifyJwt from '@fastify/jwt';
import type { FastifyInstance, FastifyRequest, FastifyServerFactory } from 'fastify';
import Fastify from 'fastify';
import buildGetJwks from 'get-jwks';
import server from '../$server';
import {
  API_BASE_PATH,
  COGNITO_CLIENT_ID,
  COGNITO_POOL_ENDPOINT,
  COGNITO_POOL_ID,
  CORS_ORIGIN,
} from './envValues';
import { customAssert } from './returnStatus';

export const init = (serverFactory?: FastifyServerFactory): FastifyInstance => {
  const app = serverFactory ? Fastify({ serverFactory, logger: true }) : Fastify({ logger: true });
  const getJwks = buildGetJwks();

  void app.register(helmet);
  void app.register(etag, { weak: true });
  void app.register(cors, { origin: CORS_ORIGIN });
  void app.register(fastifyFormbody);
  void app.register(fastifyJwt, {
    decode: { complete: true },
    secret: (_: FastifyRequest, token: TokenOrHeader) => {
      customAssert('header' in token, '不正リクエストがありました');
      customAssert(token.payload.aud === COGNITO_CLIENT_ID, '不正リクエストがありました');

      const domain = `${COGNITO_POOL_ENDPOINT}/${COGNITO_POOL_ID}`;

      return getJwks.getPublicKey({ kid: token.header.kid, domain, alg: token.header.alg });
    },
  });
  server(app, { basePath: API_BASE_PATH });

  return app;
};
