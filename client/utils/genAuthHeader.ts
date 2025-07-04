import type { IdToken } from 'types/brandedId';

export const genAuthHeader = (idToken: IdToken) => ({
  authorization: `Bearer ${idToken}`,
});
