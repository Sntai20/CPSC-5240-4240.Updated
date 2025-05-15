import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['**/out/**', '**/dist/**', 'createDB/createAdminUser.js'],
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': ['warn'],
            'prefer-const': ['warn'],
            'no-console': ['warn'],
            'no-undef': ['warn'],
            'no-var': ['warn'],
        },
    }
);