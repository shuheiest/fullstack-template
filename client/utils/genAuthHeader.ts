import type { JWT } from 'aws-amplify/auth';

export const genAuthHeader = (idToken: JWT) => ({
  authorization: `Bearer ${idToken}`,
});
