// クライアント側環境変数の定義

const cognitoEndpoint = process.env.NEXT_PUBLIC_COGNITO_ENDPOINT ?? '';
const cognitoUserPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '';
const cognitoUserPoolClientId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID ?? '';
const awsRegion = process.env.NEXT_PUBLIC_AWS_REGION ?? '';

Object.entries({
  cognitoEndpoint,
  cognitoUserPoolId,
  cognitoUserPoolClientId,
  awsRegion,
}).forEach(([key, val]) => {
  if (val === '') {
    throw new Error(`not set ${key} of env`);
  }
});

export { awsRegion, cognitoEndpoint, cognitoUserPoolClientId, cognitoUserPoolId };
