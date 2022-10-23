/** @type {import("prettier").Config} */
module.exports = {
    bracketSpacing: true,
    singleQuote: true,
    bracketSameLine: true,
    trailingComma: 'es5',
    printWidth: 100,
    plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
