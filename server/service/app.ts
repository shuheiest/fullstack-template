import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import server from '../$server';

export const init = (): FastifyInstance => {
  const app = Fastify({ logger: true });

  void app.register(helmet);
  void app.register(cors, {
    origin:
      process.env.CORS_ORIGIN !== undefined && process.env.CORS_ORIGIN !== ''
        ? process.env.CORS_ORIGIN.split(',')
        : true,
    credentials: true,
  });

  server(app, {
    basePath:
      process.env.API_BASE_PATH !== undefined && process.env.API_BASE_PATH !== ''
        ? process.env.API_BASE_PATH
        : '/api',
  });

  return app;
};
