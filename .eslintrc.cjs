/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

const importOrderRuleConfig = {
  'newlines-between': 'always',
  alphabetize: { order: 'asc', caseInsensitive: true },
  groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
  pathGroups: [
    {
      pattern: '~/**',
      group: 'external',
      position: 'after',
    },
    {
      pattern: '@/**',
      group: 'internal',
      position: 'after',
    },
  ],
  pathGroupsExcludedImportTypes: ['builtin'],
};

module.exports = {
  root: true,

  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:import/recommended',
  ],

  rules: {
    'vue/no-unused-properties': [
      'error',
      {
        groups: ['props', 'computed', 'methods', 'data'],
        deepData: true,
        ignorePublicMembers: false,
      },
    ],
    'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
    'vue/html-self-closing': ['error', { html: { void: 'any' } }],
    'vue/padding-line-between-blocks': 'warn',
    'vue/require-name-property': 'error',
    'vue/static-class-names-order': 'warn',
    'vue/v-on-event-hyphenation': 'warn',
    'vue/v-on-function-call': ['error', 'never', { ignoreIncludesComment: true }],
    'import/order': ['warn', importOrderRuleConfig],
    'import/newline-after-import': 'warn',
    'import/no-unresolved': 'off', // Turn off for now because the plugin is confused about paths
  },

  parserOptions: {
    ecmaVersion: 'latest',
  },
};
