module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: ['prettier', 'plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/display-name': 'off',
    'react/prop-types': 'off'
  }
}
