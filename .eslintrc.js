module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      classes: true
    },
    ecmaVersion: 2015,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars' : 'warn',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
}
