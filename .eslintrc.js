module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'next',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: true,
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/indent': 'off',
        'no-unused-vars': 'warn',
        'no-control-regex': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': ['error', { functions: 'defaultArguments' }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        '@typescript-eslint/no-misused-promises': 'off',
        'jsx-a11y/label-has-associated-control': [2, {
          'controlComponents': ['Combobox.Input'], 'assert': 'either'
        }],
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
  rules: {
    'global-require': 'off',
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'prettier'],
};
