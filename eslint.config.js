import kontentAiConfig from "@kontent-ai/eslint-config";
import angular from "angular-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["**/*.spec.ts", "**/*.generated.ts"]),
  {
    files: ["src/**/*.ts"],
    extends: [kontentAiConfig, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/strict-boolean-expressions": "off",
    },
  },
  {
    files: ["src/**/*.html"],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
]);
