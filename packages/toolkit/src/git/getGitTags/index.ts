import { execSync } from "node:child_process"

// @__NO_SIDE_EFFECTS__
export async function getGitTags(): Promise<string[]> {
  const tags = execSync("git --no-pager tag -l --sort=creatordate").toString()
  return tags.split("\n")
}
