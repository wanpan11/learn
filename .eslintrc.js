module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  globals: {},
  extends: ['eslint:recommended'],
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 13,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': ['error', { arrowParens: 'avoid', singleQuote: true }],
  },
};
