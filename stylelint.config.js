module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'value-keyword-case': null,
    'unit-no-unknown': null,
    'function-name-case': null,
    'function-no-unknown': null,
    'media-query-no-invalid': null,
  },
  customSyntax: 'postcss-styled-syntax',
};
