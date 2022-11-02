module.exports = {
    env: {
        node: true,
    },
    parser: '@typescript-eslint/parser',
    // Add in each shit
    // parserOptions: {
    //     tsconfigRootDir: __dirname,
    //     project: ['./tsconfig.json'],
    // },
    plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'turbo'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
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
