import Fastify, { FastifyInstance } from 'fastify'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import server  from '../$server'

export const init = (): FastifyInstance => {
  const app = Fastify({ logger: true })

  app.register(helmet)
  app.register(cors, {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
    credentials: true,
  })

  server(app, { basePath: process.env.API_BASE_PATH || '/api' })
  
  return app
}