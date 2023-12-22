module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:node/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    'no-process-exit': 'off',
    'class-methods-use-this': 'off',
    'no-constructor-return': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'node/no-unpublished-require': 'off',
    // 'no-undef': 'off',
  },
};
