module.exports = {
  extends: '@gpt-pilote/eslint-config-custom',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
};
