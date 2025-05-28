import { globProcess } from "../../object/process"

/** Detect if process.platform is macOS (darwin kernel) */
// @__NO_SIDE_EFFECTS__
export function isMacOsPlatform(): boolean {
  return /^darwin/i.test(globProcess.platform || "")
}
