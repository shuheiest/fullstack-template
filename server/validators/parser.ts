// IDパーサーの定義
import type { ClientId, CognitoPoolId, StaffId, UserId } from 'api/@types/brandedId';
import { z } from 'zod';

// IDパーサー作成関数
const createIdParser = <T extends string>(): z.ZodType<T> => z.string() as unknown as z.ZodType<T>;

// ID系のZodパーサー
export const clientIdParser = createIdParser<ClientId>();
export const cognitoPoolIdParser = createIdParser<CognitoPoolId>();
export const userIdParser = createIdParser<UserId>();
export const staffIdParser = createIdParser<StaffId>();
