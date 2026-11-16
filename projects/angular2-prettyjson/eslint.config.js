// @ts-check
const { defineConfig } = require("eslint/config");
const rootConfig = require("../../eslint.config.js");

module.exports = defineConfig(
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/prefer-standalone": "off",
      "no-useless-escape": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",      
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "lib",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "off",
        {
          type: "element",
          prefix: "lib",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    rules: {},
  }
);
