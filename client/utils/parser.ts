// IDパーサーの定義
import type { IdToken, UserId } from 'types/brandedId';
import { z } from 'zod';

// IDパーサー作成関数
const createIdParser = <T extends string>(): z.ZodType<T> => z.string() as unknown as z.ZodType<T>;

// ID系のZodパーサー
export const userIdParser = createIdParser<UserId>();
export const idTokenParser = createIdParser<IdToken>();
