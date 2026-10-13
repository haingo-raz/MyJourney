import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const eslintConfig = [
  { files: ["**/*.{js,mjs,cjs,jsx,tsx,ts}"] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  jsxA11yPlugin.flatConfigs.strict,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;
