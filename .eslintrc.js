// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'comma-style': 'off',
    'quotes': 'off',
    'camelcase': 'off',
    // 'no-multi-spaces': 'off',
    // 'comma-dangle': ['error', 'always'],
    'comma-dangle': 'off',      // { a: 1, } を許容
    'curly': 'off',
    // 'object-curly-spacing': 'off',
    // 'object-curly-even-spacing': 'off',
    // 'no-throw-literal': 'off',
    'space-before-function-paren': ["error", {named: "never"}],
    'no-constant-condition': 'off',

    'no-alert': 'error',
    'no-eq-null': 'error',
    'eqeqeq': 'error',
    'no-extend-native': 'error',
    'no-invalid-this': 'error',
  }
}
