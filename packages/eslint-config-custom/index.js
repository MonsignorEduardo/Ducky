module.exports = {
    plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
    env: {
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'turbo',
        'prettier',
    ],
    rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'turbo/no-undeclared-env-vars': 'off',
    },

    ignorePatterns: ['.eslintrc.js'],
};
