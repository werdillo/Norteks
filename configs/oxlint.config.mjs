import { defineConfig } from "oxlint";
import solid from "eslint-plugin-solid/configs/recommended";

export default defineConfig({
  jsPlugins: ["eslint-plugin-solid"],
  ignorePatterns: ["dist", ".vercel"],
  rules: {
    ...solid.rules,
  },
});
