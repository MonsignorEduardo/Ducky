module.exports = {
    root: true,
    extends: '@ducky/eslint-config-custom',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
};
