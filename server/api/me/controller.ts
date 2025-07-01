import { userQuery } from 'domain/user/query/userQuery';
import { toUserDto } from 'domain/user/dto/toUserDto';
import { returnGetError, returnSuccess } from 'service/returnStatus';
import { defineController } from './$relay';

export default defineController(() => ({
  get: ({ user }) =>
    userQuery
      .whoAmI({ userId: user['cognito:username'], email: user.email })
      .then(toUserDto)
      .then(returnSuccess)
      .catch(returnGetError),
}));
