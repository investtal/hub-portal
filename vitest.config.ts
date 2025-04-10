import path from "node:path"
import { fileURLToPath } from "node:url"
import type { AliasOptions } from "vite"
import { defineConfig } from "vitest/config"

const r = (p: string) => path.resolve(path.dirname(fileURLToPath(import.meta.url)), p)

export const alias: AliasOptions = {
  "@investtal/bundlesize-limiter": r("plugins/bundlesize-limiter/src/index.ts"),
}

export default defineConfig({
  define: {
    __DEV__: process.env.NODE_ENV === "development",
    __TEST__: process.env.VITE_TEST === "true",
  },
  resolve: {
    alias,
  },
  test: {
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    environment: "happy-dom",
    coverage: {
      reporter: ["lcovonly"],
    },
    include: ["packages/**/**/**/*.test.?(m)ts?(x)"],
    exclude: ["node_modules", "packages/**/node_modules", "packages/**/dist"],
  },
})
