module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: { version: 'detect' },
  },
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: { jsx: true },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    eqeqeq: 'error',
    complexity: ['error', 5],
    'max-depth': ['error', 2],
    'max-nested-callbacks': ['error', 3],
    'max-lines': ['error', 200],
    'no-param-reassign': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-template': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
  },
  ignorePatterns: ['client/**/controller.ts', 'client/**/hooks.ts'],
  overrides: [
    {
      files: ['*.js'],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/no-var-requires': ['off'],
        '@typescript-eslint/no-require-imports': ['off'],
        '@typescript-eslint/consistent-type-imports': ['off'],
        '@typescript-eslint/strict-boolean-expressions': ['off'],
        '@typescript-eslint/no-floating-promises': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
      },
    },
    {
      files: ['server/**/*.ts'],
      rules: { '@typescript-eslint/explicit-function-return-type': ['error'] },
    },
    {
      files: ['server/api/**/controller.ts', 'server/api/**/hooks.ts', 'server/tests/**/*.ts'],
      rules: { '@typescript-eslint/explicit-function-return-type': ['off'] },
    },
    {
      files: ['client/src/utils/$path.ts', 'server/tests/**/*.ts'],
      rules: { 'max-lines': 'off' },
    },
    { files: ['*.test.ts'], rules: { 'max-nested-callbacks': 'off' } },
  ],
};
