require('dotenv').config();
module.exports = {
  input: 'api',
  outputMode: 'aliasOnly',
  baseURL: `${process.env.API_ORIGIN ?? ''}${process.env.API_BASE_PATH ?? ''}`,
};
