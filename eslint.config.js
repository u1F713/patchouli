import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'
import solid from 'eslint-plugin-solid/configs/typescript.js'
import * as tsParser from '@typescript-eslint/parser'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    files: ['**/*.tsx'],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json'
      }
    }
  },
  { ignores: ['node_modules', 'dist', '.astro'] }
)
