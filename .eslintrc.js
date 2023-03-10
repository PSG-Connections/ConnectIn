module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    jsx: true
  },
  plugins: [
    'react',
    'react-native'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    semi: ['error', 'always'],
    '@typescript-eslint/semi': 'off',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
};
