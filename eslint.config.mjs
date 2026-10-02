import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["**/dist/", "**/build/", "**/coverage/"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // React 17+ : plus besoin d'importer React dans chaque fichier JSX
  pluginReact.configs.flat["jsx-runtime"],
  // Version explicite tant que React n'est pas installé (passer à "detect" ensuite)
  { settings: { react: { version: "19" } } },
]);
