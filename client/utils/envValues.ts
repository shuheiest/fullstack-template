// クライアント側環境変数の定義

const cognitoEndpoint = process.env.NEXT_PUBLIC_COGNITO_ENDPOINT ?? '';
const awsRegion = process.env.NEXT_PUBLIC_AWS_REGION ?? '';
const cognitoClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '';

Object.entries({
  cognitoEndpoint,
  awsRegion,
}).forEach(([key, val]) => {
  if (val === '') {
    throw new Error(`not set ${key} of env`);
  }
});

export { awsRegion, cognitoClientId, cognitoEndpoint };
