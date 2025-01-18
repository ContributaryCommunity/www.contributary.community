import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    // https://github.com/eslint/eslint/discussions/18304#discussioncomment-9069706
    ignores: [
      '.greenwood/*',
      'node_modules/*',
      'public/*',
      'reports/*'
    ]
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      // turn this off for Prettier
      'no-irregular-whitespace': 'off'
    }
  }
];