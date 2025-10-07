import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  {
    plugins: {
      prettier,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true,
          trailingComma: "all",
          printWidth: 100,
          tabWidth: 2,
          bracketSpacing: true,
          arrowParens: "always",
          singleQuote: false,
        },
      ],
      "no-unused-vars": "off",
      "import/no-anonymous-default-export": "off",
      "react-hooks/exhaustive-deps": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^react", "^next"], ["^[^.]"], ["^@/"], ["^\\./", "^\\.\\./"], ["\\.s?css$"]],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
