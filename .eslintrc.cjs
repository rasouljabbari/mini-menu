module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
    settings: {react: {version: '18.2'}},
    plugins: ['react', 'react-refresh'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
}
