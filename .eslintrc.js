module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ['standard', 'prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    plugins: ['svelte3'],
    overrides: [
        {
            files: ['**/*.svelte'],
            processor: 'svelte3/svelte3',
            rules: {
                // https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/OTHER_PLUGINS.md#eslint-plugin-import
                'import/first': 0,
                'import/no-duplicates': 0,
                'import/no-mutable-exports': 0,
            },
        },
    ],
}
