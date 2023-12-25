/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));
function resolve(...paths: string[]) {
  return new URL(paths.join("/"), `file://${__dirname}/`).pathname;
}
const entryRoot = resolve(__dirname, "src");
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
      entry: resolve(entryRoot, "index.ts"),
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
