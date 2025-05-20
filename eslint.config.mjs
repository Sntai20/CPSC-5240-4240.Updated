import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['**/out/**', '**/References/**','**/dist/**', 'expressServer/src/createDB/createAdminUser.js'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tsEslintPlugin,
        },
        rules: {
            ...tsEslintPlugin.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': ['warn'],
            'no-console': ['warn', { 'allow': ['warn', 'error'] }],
            'no-var': ['warn'],
        },
    },
];
