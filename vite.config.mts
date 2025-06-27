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
      outDir: "dist",
    }),
  ],
  resolve: {},
  test: {
    globals: true,
  },
  build: {
    outDir: "dist",
    lib: {
      entry: {
        index: resolve(entryRoot, "index.ts"),
        "typed-json-pointer": resolve(entryRoot, "typed-json-pointer.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        if (format === "es") {
          return `${entryName}.js`;
        }
        if (format === "cjs") {
          return `${entryName}.cjs`;
        }
        return `${entryName}.js`;
      },
    },
    rollupOptions: {},
  },
});
