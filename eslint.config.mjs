import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


const eslintConfig = [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.jest } }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];

export default eslintConfig;