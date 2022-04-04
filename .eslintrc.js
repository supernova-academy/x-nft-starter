const { resolve } = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base-typescript", "prettier", "plugin:import/typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: resolve(__dirname, "./tsconfig.json"),
    sourceType: "module",
  },
  plugins: ["prettier", "@typescript-eslint", "import"],
  rules: {
    "prettier/prettier": ["error"],
    "import/no-named-default": "off",
  },
};
