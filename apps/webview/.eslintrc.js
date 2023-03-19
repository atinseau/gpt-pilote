module.exports = {
  extends: [
    '@gpt-pilote/eslint-config-custom',
    '@gpt-pilote/eslint-config-custom/react',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
