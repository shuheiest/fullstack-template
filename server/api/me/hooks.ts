import type { JwtUser } from '../@types/jwt';
import { defineHooks } from './$relay';

export type AdditionalRequest = {
  user: JwtUser;
};

export default defineHooks(() => ({
  onRequest: (req, reply) => req.jwtVerify().catch((err) => reply.send(err)),
}));
