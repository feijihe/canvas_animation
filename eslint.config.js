import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'no-console': 'off',
      'unused-imports/no-unused-vars': 'off',
      'prefer-const': 'warn',
    },
  },
)
