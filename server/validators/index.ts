import type { z } from 'zod';

// Frourio用バリデーター定義

export const definePostValidators = (schema: z.ZodSchema): { body: z.ZodSchema } => ({
  body: schema,
});
