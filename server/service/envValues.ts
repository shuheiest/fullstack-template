import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

export const PORT = +z.string().regex(/^\d+$/).parse(process.env.PORT);
export const API_ORIGIN = z.string().url().parse(process.env.API_BASE_URL);
export const API_BASE_PATH = z.string().startsWith('/').parse(process.env.API_BASE_PATH);
export const CORS_ORIGIN = z.string().url().parse(process.env.CORS_ORIGIN);
export const COGNITO_POOL_ID = z.string().parse(process.env.COGNITO_POOL_ID);
export const COGNITO_CLIENT_ID = z.string().parse(process.env.COGNITO_CLIENT_ID);
export const COGNITO_POOL_ENDPOINT = z.string().url().parse(process.env.COGNITO_POOL_ENDPOINT);
