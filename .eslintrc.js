module.exports = {
    root: true,
    extends: ['standard', 'plugin:prettier/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        'prettier/prettier': ['warn'],
    },
}
