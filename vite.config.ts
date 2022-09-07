/// <reference types="vitest" />
import path from "node:path";
import { defineConfig } from "vitest/config";
export default defineConfig({
  plugins: [],
  resolve: {},
  test: {
    globals: true,
  },
  build: {
    outDir: "lib",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "immutable-json-pointer",
      formats: ["es", "cjs"],
      fileName: (format) => {
        if (format === "es") {
          return "index.js";
        }
        if (format === "cjs") {
          return "index.cjs";
        }
        return "index.js";
      },
    },
    rollupOptions: {},
  },
});
