import gtLint from '@generaltranslation/react-core-linter';

export default [
  {
    files: ['src/**/*.jsx'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  gtLint.configs.recommended,
];
