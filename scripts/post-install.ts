import { execSync } from "node:child_process"

console.log("Setting up prepare scripts...")

execSync("chmod -R 777 .moon/githooks")
execSync("chmod -R 777 .moon/hooks")

execSync("git config core.hooksPath .moon/githooks")

console.log("Post install scripts set up successfully")
