import core from "@actions/core"
import { notifyLarkSuite } from "./main"

async function run() {
  await notifyLarkSuite()
  core.info("Notify succeeded.")
}

run()
