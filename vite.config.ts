/// <reference types="vitest" />
import path from "node:path";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
const entryRoot = path.resolve(__dirname, "src");
export default defineConfig({
  plugins: [
    dts({
      entryRoot,
      include: ["src/**/*"],
      outDir: "types",
    }),
  ],
  resolve: {},
  test: {
    globals: true,
  },
  build: {
    outDir: "lib",
    lib: {
      entry: path.resolve(entryRoot, "index.ts"),
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
