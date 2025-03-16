import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  format: ["esm"],
  entry: ["src/index.ts"],
  target: "es2022",
})
