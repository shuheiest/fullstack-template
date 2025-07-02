import { toUserOrAnonymousDto } from 'domain/user/dto/toUserDto';
import { userQuery } from 'domain/user/query/userQuery';
import { returnGetError, returnSuccess } from 'service/returnStatus';
import { defineController } from './$relay';

export default defineController(() => ({
  get: ({ user }) =>
    userQuery
      .whoAmI({ userId: user['cognito:username'], email: user.email })
      .then(toUserOrAnonymousDto)
      .then(returnSuccess)
      .catch(returnGetError),
}));
