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
    'max-len': [
      'error',
      {
        code: 150
      }
    ],
    'prefer-template': 'error',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'no-case-declarations': 'warn',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'prefer-destructuring': 'error',
    'react/boolean-prop-naming': 'error',
    'react/no-danger': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-this-in-sfc': 'error',
    'react/sort-prop-types': [
      'error',
      {
        ignoreCase: true,
        callbacksLast: true,
        requiredFirst: true,
        sortShapeProp: true
      }
    ],
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'always',
        spacing: {
          objectLiterals: 'never'
        }
      }
    ],
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-handler-names': 'error',
    'react/jsx-key': 'error',
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: 1,
        when: 'always'
      }
    ],
    'react/jsx-curly-brace-presence': 0,
    'react/jsx-sort-default-props': [
      'error',
      {
        ignoreCase: true
      }
    ],
    'react/jsx-sort-props': 0,
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never'
      }
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'parens-new-line'
      }
    ]
  }
}
