import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import { dirname } from "node:path";

const __dirname = dirname(__filename);

export default tseslint.config(
  js.configs.recommended,
  {
    ignores: ["*/**/dist/"],
  },
  {
    files: ["packages/extension/**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser },
      sourceType: "module",
      parserOptions: {
        projectService: true,
        project: ["./packages/extension/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },

  {
    files: ["packages/server/**/*.ts"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: "module",
      parserOptions: {
        project: ["./packages/server/tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
    },
  },

  {
    ignores: ["dist", "node_modules"],
  },
);
