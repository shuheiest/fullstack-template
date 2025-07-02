// ユーザーまたは匿名ユーザーDTO変換関数
import type { UserOrAnonymousDto } from 'api/@types/user';
import type { UserOrAnonymous } from 'domain/entities/User';

export const toUserOrAnonymousDto = (userEntity: UserOrAnonymous): UserOrAnonymousDto => ({
  userId: userEntity.id,
  email: userEntity.email,
  role: userEntity.role,
});
