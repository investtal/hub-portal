import { execSync } from "node:child_process"

// @__NO_SIDE_EFFECTS__
export async function getCurrentGitBranch(): Promise<string> {
  return execSync("git rev-parse --abbrev-ref HEAD").toString()
}
