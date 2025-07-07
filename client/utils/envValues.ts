// クライアント側環境変数の定義

const cognitoEndpoint = process.env.NEXT_PUBLIC_COGNITO_ENDPOINT ?? '';
const awsRegion = process.env.NEXT_PUBLIC_AWS_REGION ?? '';

Object.entries({
  cognitoEndpoint,
  awsRegion,
}).forEach(([key, val]) => {
  if (val === '') {
    throw new Error(`not set ${key} of env`);
  }
});

export { awsRegion, cognitoEndpoint };
