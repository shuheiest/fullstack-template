// Branded型の定義（ID系のみ）
import type { z } from 'zod';

// 基本のBranded型
export type Branded<T extends string> = string & z.BRAND<T>;

// ID系のBranded型
export type ClientId = Branded<'ClientId'>;
export type CognitoPoolId = Branded<'CognitoPoolId'>;
export type UserId = Branded<'UserId'>;
export type StaffId = Branded<'StaffId'>;
