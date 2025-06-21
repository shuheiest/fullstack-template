const { context } = require('esbuild');
const config = require('./config.common');

void context({ ...config, define: { 'process.env.NODE_ENV': `"development"` } }).then((ctx) =>
  ctx.watch(),
);
