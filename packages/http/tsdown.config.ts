import { defineConfig } from "tsdown"
import pkg from "./package.json"

const external = [...Object.keys(pkg.devDependencies)]

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "es2022",
  dts: { transformer: "oxc" },
  external,
  sourcemap: true,
  clean: true,
})
