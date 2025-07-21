// クライアント側環境変数の定義

const cognitoEndpoint = process.env.NEXT_PUBLIC_COGNITO_ENDPOINT ?? '';
const cognitoClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '';
const cognitoPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '';

Object.entries({
  cognitoEndpoint,
  cognitoClientId,
  cognitoPoolId,
}).forEach(([key, val]) => {
  if (val === '') {
    throw new Error(`not set ${key} of env`);
  }
});

export { cognitoClientId, cognitoEndpoint, cognitoPoolId };
