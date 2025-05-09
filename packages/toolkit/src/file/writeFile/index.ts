import fs from "node:fs"
import path from "node:path"

// @__NO_SIDE_EFFECTS__
export function writeFile(filename: string, content: string | Uint8Array): void {
  const dir = path.dirname(filename)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filename, content)
}
