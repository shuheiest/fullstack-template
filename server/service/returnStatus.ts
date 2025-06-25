// API レスポンス統一用ヘルパー関数（シンプル版）

export const returnSuccess = <T>(val: T): { status: 200; body: T } => ({
  status: 200,
  body: val,
});

export const returnGetError = (e: unknown): { status: 404 } => {
  console.error('GET Error:', e);
  return { status: 404 };
};

export const returnPostError = (e: unknown): { status: 403 } => {
  console.error('POST Error:', e);
  return { status: 403 };
};

export function customAssert(condition: unknown, message: string): asserts condition {
  if (Boolean(condition) === false) {
    throw new Error(message);
  }
}
