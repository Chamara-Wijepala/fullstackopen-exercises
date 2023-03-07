module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'import/order': 0,
    'consistent-return': 0,
  },
};
