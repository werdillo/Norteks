import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Rooted at the project, not at `configs/`.
    root: fileURLToPath(new URL("..", import.meta.url)),
    include: ["src/**/tests/*.test.ts"],
  },
});
