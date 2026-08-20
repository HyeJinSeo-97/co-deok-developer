import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/", "node_modules/", ".next/", "*.config.js", "*.config.ts"],
  },
  js.configs.recommended, // JS 기본 규칙
  ...tseslint.configs.recommended, // TS 기본 규칙들
  prettierConfig, // Prettier와 충돌하는 룰 OFF
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@next/next": nextPlugin,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest", // 최신 JS 문법 허용.
        sourceType: "module", //  ES Module 사용
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // 전역 객체를 readonly로 지정해서,ESLint가 “정의 안 된 변수”로 오인하지 않도록 해줌
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TS
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",

      // A11y
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",

      // 일반 JS 규칙
      "no-console": "warn",
      "no-debugger": "warn",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-var": "error",

      // import 정렬
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^next"], // 1. react, next 최우선
            ["^@?\\w"], // 2. node_modules
            ["^(@|#)(/.*|$)"], // 3. @, # 로 시작하는 alias import
            ["^\\.\\.?(/.*|$)"], // 4. 상대 경로 import ("./", "../")
            ["^.+\\.s?css$"], // 5. css/scss
            ["^\\u0000"], // 6. side-effect import (예: polyfill)
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "./../*"],
              message: "@/...' 절대 경로를 사용하세요.",
            },
          ],
        },
      ],
    },
  },
);
