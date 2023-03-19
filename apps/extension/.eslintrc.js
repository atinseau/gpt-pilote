module.exports = {
  extends: [
    '@gpt-pilote/eslint-config-custom',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
