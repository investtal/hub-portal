import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import type { DotenvParseOutput } from "dotenv"
import dotenv from "dotenv"
import type { Plugin } from "vite"

export type BuildMetadata = ReturnType<typeof getDefaultMetadataConfig>
export type RuntimeEnvPluginOptions = {
  /**
   * Path to the .env file
   * @default '.env'
   */
  envPath?: string
  /**
   * Name of the variable to inject on to windown
   * @default '__CLIENT_RUNTIME_ENV__'
   */
  runtimeVariableName?: string
  /**
   * Path to the config file will be mounted on window through js file
   * @default 'env/config.js'
   */
  configPath?: string
  /**
   * Name of the variable to inject on to windown
   * @default '__APP_METADATA__'
   */
  metadataVariableName?: string
  /**
   * Enforce the plugin to run before other plugins
   * @default 'pre'
   */
  enforce?: "pre" | "post"
}

const defaultOptions = {
  envPath: ".env",
  runtimeVariableName: "__CLIENT_RUNTIME_ENV__",
  metadataVariableName: "__APP_METADATA__",
  configPath: "env/config.js",
  enforce: "pre",
} satisfies RuntimeEnvPluginOptions

const viteRuntimeEnv = (options?: RuntimeEnvPluginOptions): Plugin => {
  let isDev: boolean
  let configStringJs: string
  let configStringEnv = ""
  const metadataConfig = getDefaultMetadataConfig()
  const envPath = options?.envPath ?? defaultOptions.envPath
  const configPath = options?.configPath ?? defaultOptions.configPath
  const runtimeVariableName = options?.runtimeVariableName ?? defaultOptions.runtimeVariableName
  const metadataVariableName = options?.metadataVariableName ?? defaultOptions.metadataVariableName
  const metadataConfigJs = injectConfigString(metadataConfig, metadataVariableName)

  return {
    name: "@investtal/vite-runtime-env",
    enforce: options?.enforce ?? defaultOptions.enforce,
    async configResolved({ mode, command }) {
      const envWithMode = fs.readFileSync(path.resolve(process.cwd(), `.env.${mode}`), "utf8")

      isDev = command === "serve"

      configStringJs = genConfigString(mode, isDev, runtimeVariableName)
      configStringEnv += envWithMode
    },
    transformIndexHtml() {
      return isDev
        ? [
            { tag: "script", children: configStringJs, injectTo: "head" },
            { tag: "script", children: metadataConfigJs, injectTo: "head" },
          ]
        : [
            { tag: "script", children: configPath, injectTo: "head" },
            {
              tag: "script",
              attrs: { src: `/${configPath}`, id: "app-runtime-env" },
              injectTo: "head",
            },
          ]
    },
    generateBundle() {
      // Emit this js file to make working in dev mode
      this.emitFile({
        type: "asset",
        fileName: configPath,
        source: configStringJs,
      })
      // This env file serve for in CI/CD mode --> Generate a .env file to Docker container use
      this.emitFile({
        type: "asset",
        fileName: envPath,
        source: configStringEnv,
      })
    },
  }
}

export function getDefaultMetadataConfig(): Record<string, string> {
  const pkgJson = JSON.parse(fs.readFileSync("package.json", "utf8"))
  const { version: appVersion } = pkgJson
  const gitBranchName = execSync("git rev-parse --abbrev-ref HEAD").toString().trim()
  const gitHash = execSync("git rev-parse --short HEAD").toString().trim()
  if (!gitBranchName || !gitHash) {
    throw new Error("Git branch name or hash not found. Build metadata will not be injected.")
  }

  const buildTime = new Date().toISOString()

  return {
    APP_VERSION: appVersion as string,
    GIT_BRANCH_NAME: gitBranchName,
    GIT_HASH: gitHash,
    BUILD_TIME: buildTime,
  }
}

function genConfigString(mode: string, isDev: boolean, injectVariable: string): string {
  /*
   * @link https://vite.dev/guide/env-and-mode.html#env-files
   * Do not modify 4 line of getting the envs! It's standard of Vite ENV
   */
  const allModEnv = dotenv.config().parsed || {}
  const localEnv = getEnvWithPath(".env.local")
  const remoteModEnv = getEnvWithPath(`.env.${mode}`)
  const localModEnv = getEnvWithPath(`.env.${mode}.local`)

  const envObj = isDev
    ? { ...allModEnv, ...remoteModEnv, ...localEnv, ...localModEnv }
    : { ...allModEnv, ...remoteModEnv }

  return injectConfigString(envObj, injectVariable)
}

function getEnvWithPath(file: string): DotenvParseOutput {
  return dotenv.config({ path: path.resolve(process.cwd(), file) }).parsed || {}
}

function injectConfigString(config: DotenvParseOutput, injectVariable: string): string {
  return `window.${injectVariable} = ${JSON.stringify(config)}`
}

export default viteRuntimeEnv
