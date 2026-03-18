export default [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
      }
    },
    rules: {
      // Add your custom rules here if needed
    }
  }
];
