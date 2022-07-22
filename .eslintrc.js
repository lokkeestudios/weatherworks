module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'next',
    'plugin:react/recommended',
    'airbnb',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript'
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'no-control-regex': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': ['error', { functions: 'defaultArguments' }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }]
  },
}
