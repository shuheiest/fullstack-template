// ユーザーDTO変換関数
import type { JwtUser } from 'api/@types/jwt';
import type { UserDto } from 'api/@types/user';
import { userIdParser } from '../../../validators/parser';

export const toUserDto = (jwtUser: JwtUser): UserDto => ({
  userId: userIdParser.parse(jwtUser['cognito:username']),
  email: jwtUser.email,
});