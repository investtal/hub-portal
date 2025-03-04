import { cyan, dim, red } from "picocolors"

export type RuntimeEnvPluginOptions = {
  /**
   * Path to the .env file
   * @default '.env'
   */
  envPath?: string;
  /**
   * Name of the variable to inject on to windown
   * @default '__RUNTIME_ENV__'
   */
  injectName?: string;
  /**
   * Path to the config file will be mounted on window through js file
   * @default 'env/config.js'
   */
  configPath?: string;
}
