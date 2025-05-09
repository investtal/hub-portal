import { execSync } from "node:child_process"

// @__NO_SIDE_EFFECTS__
export async function getLastGitCommitHash(): Promise<string> {
  const commitHash = execSync("git rev-parse --short HEAD").toString()
  return commitHash
}
