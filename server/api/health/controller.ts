import { prisma } from '@/infrastructure/database/prisma';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: {
      server: 'ok',
      db: await prisma.user
        .count()
        .then(() => 'ok' as const)
        .catch(() => 'ng' as const),
    },
  }),
}));
