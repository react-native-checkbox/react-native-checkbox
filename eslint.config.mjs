import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', 'example/**', '**/*.bundle.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['src/js/**/*.{ts,tsx}'],
    plugins: {prettier},
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {jsx: true},
      },
    },
    rules: {
      'prettier/prettier': 'error',
      // The codebase intentionally uses @ts-ignore in a few native-interop spots.
      '@typescript-eslint/ban-ts-comment': 'off',
      // Native component prop types use `any` deliberately (e.g. tintColors).
      '@typescript-eslint/no-explicit-any': 'off',
      // Platform-conditional native modules are loaded via require() at runtime.
      '@typescript-eslint/no-require-imports': 'off',
      // TurboModule specs are declared as empty interfaces extending TurboModule.
      '@typescript-eslint/no-empty-object-type': 'off',
      // Pre-existing RN prop type; kept as-is by the native-arch migration.
      '@typescript-eslint/no-unsafe-function-type': 'off',
      // The codebase uses `cond && fn()` short-circuit calls (RN core style).
      '@typescript-eslint/no-unused-expressions': 'off',
      // Some prop/native types are declared for documentation but not referenced.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^(NativeProps|Props)$'},
      ],
    },
  },
  {
    files: ['src/js/**/__test__/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
  },
);
