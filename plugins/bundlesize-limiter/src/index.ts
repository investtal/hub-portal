import type { Plugin } from "esbuild"
import { cyan, dim, red } from "picocolors"

export type BundlesizeLimiterPluginOptions = {
  /**
   * Limit in KBs
   * @default 20
   */
  limitKbs: number
}

export const bundlesizeLimiterPlugin = (limit = 20): Plugin => {
  return {
    name: "esbuild-limit-size-plugin",
    setup(build) {
      // Ensure metafile is enabled to get the information about bundle size
      if (!build.initialOptions.metafile) {
        build.initialOptions.metafile = true
      }

      build.onEnd(result => {
        let exceeded = false
        const outputs = result.metafile?.outputs

        if (!outputs) {
          throw new Error('"metafile" option must be turned on')
        }

        const sizes = Object.keys(outputs).map(k => ({
          file: k,
          bytes: Number((outputs[k].bytes / 1024).toFixed(2)),
        }))

        const fileMax = Math.max(...sizes.map(({ file }) => file.length))
        const sizeMax = Math.max(...sizes.map(({ bytes }) => `${bytes}`.length))

        for (const size of sizes) {
          // Check if the file is a JavaScript file and not the root index file (dist/index.(js|mjs))
          const isJs = /\.m?js$/.test(size.file) && !/^dist\/index\.(m?js)$/.test(size.file)
          exceeded = exceeded ? true : isJs ? size.bytes > limit : false
          const color = !isJs ? dim : size.bytes > limit ? red : cyan
          console.log(
            color(`${size.file.padEnd(fileMax + 2)}${`${size.bytes}`.padStart(sizeMax)}kb`),
          )
        }

        if (exceeded) {
          throw new Error(`\nLimit of ${limit}kb exceeded`)
        }

        console.log(cyan(`\n✓ Bundle size is under ${limit}kbs limit\n`))
      })
    },
  }
}
