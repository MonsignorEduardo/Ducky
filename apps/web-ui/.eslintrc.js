module.exports = {
    root: true,
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    extends: ['next/core-web-vitals', '@ducky/eslint-config-custom'],
};
