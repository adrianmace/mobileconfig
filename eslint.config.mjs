import nextPlugin from "eslint-plugin-next";

const eslintConfig = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...nextPlugin.configs.recommended,
    ...nextPlugin.configs["core-web-vitals"],
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
