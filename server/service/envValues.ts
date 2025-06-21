import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

export const PORT = +z.string().regex(/^\d+$/).parse(process.env.PORT);
export const API_ORIGIN = z.string().url().parse(process.env.API_ORIGIN);
export const API_BASE_PATH = z.string().startsWith('/').parse(process.env.API_BASE_PATH);
export const CORS_ORIGIN = z.string().url().parse(process.env.CORS_ORIGIN);