import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['**/out/**', '**/dist/**', 'createDB/createAdminUser.js'],
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
            'prefer-const': ['warn'],
            'no-console': ['warn'],
            'no-var': ['warn'],
        },
    },
];